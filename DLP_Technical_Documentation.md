# Documentation Technique du Système DLP

Ce laboratoire de prévention de fuite de données (DLP) utilise une architecture distribuée : des agents Windows détectent les événements sensibles sur plusieurs vecteurs (fichier, presse-papiers, email, réseau/cloud, USB), puis envoient des alertes structurées au manager SOC Linux via HTTP. Le manager normalise et stocke les alertes dans des logs JSON, expose des API de supervision, et maintient un registre des fichiers sensibles étiquetés. L'implémentation est fonctionnelle pour un usage de laboratoire, avec des opportunités d'amélioration sur la cohérence des politiques, la validation de schéma et la sécurité des transports.

## Version du document

- **Version** : 2.0 (mise à jour)
- **Date** : 2026-04-29
- **Auteur** : Équipe DLP LAB
- **Changements clés** :
  - Clarification explicite des cibles de déploiement par dossier (`manager/` sur Ubuntu SOC, `agent/` sur Windows AXA-AMS).
  - Consolidation de la cartographie des composants et de leur environnement d'exécution.
  - Ajout d'une section de référence de déploiement opérationnel.

## 0. Cible de déploiement (Mise à jour)

Cette règle de déploiement est la référence pour cette version :

- **Tous les fichiers du dossier `manager/` sont déployés sur le serveur Ubuntu DLP/SOC**.
- **Tous les fichiers du dossier `agent/` sont déployés sur le poste Windows AXA-AMS (endpoint agent)**.

### Matrice de déploiement

| Dossier | Hôte cible | OS cible | Rôle |
|---|---|---|---|
| `manager/` | Serveur DLP/SOC | Ubuntu Linux | API Flask manager, centralisation, journalisation, règles |
| `agent/` | Endpoint utilisateur AXA-AMS | Windows | Détection locale (FILE/USB/CLIPBOARD/EMAIL/CLOUD) et envoi d'alertes |
| `logs/` | Serveur DLP/SOC (principal) | Ubuntu Linux | Stockage des traces et historiques DLP |

## 1. Vue d'ensemble du système

### Diagramme d'architecture globale (ASCII)

```text
+-------------------------------------------------------------+
|                    Endpoint Windows (AXA AMS)               |
|                                                             |
|  [file_scanner]  [clipboard_monitor]  [usb_monitor]         |
|        |                 |                 |                |
|        +-----------------+-----------------+                |
|                          |                                  |
|                     [alert_sender]                          |
|                 HTTP POST /alert (5000)                     |
+--------------------------|----------------------------------+
                           |
                           v
+-------------------------------------------------------------+
|                    Serveur SOC (Ubuntu)                     |
|                                                             |
|  [manager.py Flask API]  <-- HTTP POST /alert              |
|      |          |                                           |
|      |          +--> compteurs en mémoire (/stats)          |
|      +--> écrit en JSON lignes dans /var/log/dlp/dlp.json   |
|      +--> met à jour /var/log/dlp/labeled_files.json        |
|                                                             |
|  [dlp_addon.py via mitmproxy]                               |
|      intercepte les uploads HTTPS cloud, envoie /alert      |
+-------------------------------------------------------------+
                           |
                           v
                  /var/log/dlp/*.json + alerts.log
```

### Flux de données : agent -> manager -> logs

1. Un moniteur détecte un événement et construit une charge utile d'alerte.
2. La charge utile est envoyée à `POST /alert` sur le manager.
3. Le manager valide les champs minimums et normalise le format.
4. Le manager ajoute une ligne JSON dans `/var/log/dlp/dlp.json`.
5. Pour les labels FILE/CLOUD sensibles, le manager met à jour `/var/log/dlp/labeled_files.json`.
6. Le manager met à jour les compteurs en mémoire et renvoie action/sévérité.

### Communication entre composants

- **HTTP**
  - Agents -> Manager : `POST http://192.168.100.10:5000/alert`
  - Addon mitmproxy -> Manager : `POST http://127.0.0.1:5000/alert`
- **API Flask (manager)**
  - `GET /health`, `POST /reload`, `GET /stats`, `GET /alerts`, `GET /labeled`, `GET /rules`, `GET /dashboard`, `POST /alert`
  - Écoute : `0.0.0.0:5000`
- **SMTP (monitor email)**
  - Serveur SMTP simulé : `0.0.0.0:1025`
- **Interception HTTPS**
  - Hook de requête mitmproxy dans `dlp_addon.py` pour l'inspection cloud

---

## 2. Documentation par fichier

**Note de déploiement (rappel)**

- Les fichiers listés sous `manager/*` s'exécutent sur **Ubuntu (serveur DLP/SOC)**.
- Les fichiers listés sous `agent/*` s'exécutent sur **Windows AXA-AMS (endpoint)**.

### manager/alert_logger.py

- **Objectif** : utilitaire de logging partagé pour normaliser et persister les alertes en JSONL et logs texte.
- **Fonctions/classes clés** :
  - `_normalize_alert(data)` : normalise la charge utile entrante.
  - `_append_dlp_json(clean_data)` : ajoute une ligne JSON à `dlp.json`.
  - `_load_labeled_files()` : lit la liste des fichiers étiquetés.
  - `_save_labeled_files(entries)` : écrit la liste des fichiers étiquetés.
  - `_maybe_append_labeled_file(data, clean_data)` : enregistre les entrées FILE sensibles.
  - `write(data)` : writer unifié et thread-safe.
  - `log_alert(...)` : helper rétrocompatible qui délègue à `write`.
- **Bibliothèques utilisées** :
  - Standard : `os`, `platform`, `json`, `logging`, `threading`, `datetime`
- **Méthode de communication** : IO fichier local + framework de logging Python.
- **Entrée** : dictionnaires d'alertes.
- **Sortie** : `dlp.json`, `alerts.log`, mise à jour optionnelle de `labeled_files.json`.

### manager/dlp_addon.py

- **Objectif** : addon mitmproxy qui inspecte des requêtes d'upload cloud (orienté Dropbox) et envoie des alertes CLOUD.
- **Fonctions/classes clés** :
  - `classify_content(content)` : classification texte + mots-clés + occurrences.
  - `get_cloud_service(host)` : mapping hôte destination -> service cloud.
  - `send_alert(...)` : construit et envoie une payload CLOUD.
  - `DLPAddon.request(flow)` : inspecte les `HTTPFlow`, corrèle les sessions upload.
  - `addons = [DLPAddon()]` : enregistrement mitmproxy.
- **Bibliothèques utilisées** :
  - `mitmproxy.http` (interception SSL/HTTP)
  - `requests` (HTTP POST vers manager)
  - `json`, `datetime` (standard)
- **Méthode de communication** : interception mitmproxy + HTTP POST.
- **Entrée** : headers/body de requêtes cloud (API Dropbox).
- **Sortie** : payload d'alerte CLOUD vers manager.

### manager/manager.py

- **Objectif** : API Flask centrale qui reçoit les alertes DLP, expose des endpoints de supervision et écrit des logs normalisés.
- **Fonctions/classes clés** :
  - `build_clean_log(data)` : normalise la payload pour stockage.
  - `save_labeled_file(data)` : maintient l'index des fichiers sensibles.
  - `load_rules()` : charge les politiques depuis `rules.json`.
  - `health_check()` : état API + règles chargées.
  - `reload_rules()` : rechargement à chaud des règles.
  - `get_stats()` : compteurs d'alertes en mémoire.
  - `get_alerts()` : 50 dernières entrées de log.
  - `get_labeled_files()` : registre de fichiers étiquetés.
  - `get_rules()` : expose les règles chargées depuis rules.json.
  - `dashboard_index()` : rendu du dashboard web SOC.
  - `handle_alert()` : endpoint principal d'ingestion.
- **Bibliothèques utilisées** :
  - `flask` (`Flask`, `request`, `jsonify`)
  - `os`, `json`, `logging`, `datetime`, `collections.defaultdict`
  - module local : `alert_logger`
- **Méthode de communication** : API REST HTTP.
- **Entrée** : payload JSON des agents/addons.
- **Sortie** : réponse JSON API + écritures de logs.

### manager/rules.json

- **Objectif** : catalogue de configuration des règles DLP.
- **Structure clé** :
  - Niveau racine : tableau `rules`
  - Par règle : `id`, `name`, `classifications`, `vectors` (ex: FILE, EMAIL, CLOUD, USB, CLIPBOARD, SCP), `conditions`, `action`, `severity`, `description`
  - `conditions` peut inclure : `content_patterns`, `match_threshold`, `destination_whitelist`, `file_extensions`, `min_file_size_kb`
- **Bibliothèques utilisées** : N/A (fichier de données).
- **Méthode de communication** : fichier lu au démarrage/reload manager.
- **Entrée** : aucune.
- **Sortie** : liste de règles en mémoire.

### agent/alert_sender.py

- **Objectif** : transport fiable des alertes avec retries + file d'attente locale.
- **Fonctions/classes clés** :
  - `_try_post(payload)` : tentative POST unique.
  - `send_alert(payload)` : retries, puis mise en file en cas d'échec.
  - `_save_to_queue(payload)` : ajoute dans le fichier de queue.
  - `_flush_queue()` : rejoue les alertes en attente.
  - `start_retry_worker()` : worker daemon périodique (auto-start à l'import).
- **Bibliothèques utilisées** :
  - `requests` (HTTP)
  - `json`, `threading`, `time`, `pathlib.Path`
- **Méthode de communication** : HTTP POST + fichier JSONL local.
- **Entrée** : dict d'alerte provenant des moniteurs.
- **Sortie** : alerte envoyée ou stockée dans `C:/DLP/agent/alerts_queue.json`.

### agent/clipboard_monitor.py

- **Objectif** : sonde le presse-papiers, classifie le texte copié, déduplique les répétitions, émet des alertes CLIPBOARD.
- **Fonctions/classes clés** :
  - `classify_content(text)` : détection de niveau par mots-clés.
  - `is_valid_content(text)` : filtres qualité/taille.
  - `build_alert(...)` : construit la payload clipboard.
  - `scan_clipboard()` : lecture, déduplication, classification, envoi.
  - `main()` : boucle de polling.
- **Bibliothèques utilisées** :
  - `pyperclip` (accès presse-papiers)
  - `hashlib`, `re`, `time`, `datetime`, `typing`
  - local : `alert_sender.send_alert`
- **Méthode de communication** : polling presse-papiers + HTTP via sender.
- **Entrée** : texte presse-papiers.
- **Sortie** : payload CLIPBOARD.

### agent/email_monitor.py

- **Objectif** : monitor SMTP des emails sortants et pièces jointes avec prise en compte destinataires externes.
- **Fonctions/classes clés** :
  - `is_external(address)` : détection interne/externe.
  - `classify_content(text)` : classification par mots-clés.
  - `extract_body_text(msg)`, `extract_attachments(msg)` : extraction MIME.
  - `build_alert(...)` : payload EMAIL compatible manager.
  - `send_alert(payload)` : POST direct vers manager.
  - `DLPEmailHandler.handle_DATA(...)` : pipeline de traitement SMTP.
  - `main()` : cycle de vie listener SMTP.
- **Bibliothèques utilisées** :
  - `aiosmtpd.controller.Controller` (serveur SMTP)
  - `requests` (HTTP)
  - `email`, `re`, `time`, `datetime`, `typing`
- **Méthode de communication** : interception SMTP + HTTP POST.
- **Entrée** : envelope SMTP + corps/attachements.
- **Sortie** : alertes EMAIL, simulation relay/block.

### agent/file_scanner.py

- **Objectif** : surveille des dossiers endpoint, scanne le contenu fichier, classifie, puis envoie des alertes FILE avec interaction utilisateur popup.
- **Fonctions/classes clés** :
  - `load_config()` : lecture config agent.
  - `load_scan_keywords(config)` : jeu de mots-clés effectif.
  - `count_keyword_occurrences(text, keywords)` : comptage regex.
  - `DLPFileHandler.on_created/on_modified` : hooks événements fichier.
  - `DLPFileHandler.classify_content(...)` : classification par seuils.
  - `DLPFileHandler._build_alert_payload(...)` : constructeur payload.
  - `DLPFileHandler._send_audit_alert_with_warning(...)` : flux CONFIDENTIAL.
  - `DLPFileHandler._send_block_or_audit_alert_with_confirmation(...)` : flux SECRET.
  - `DLPFileHandler.process_file(...)` : pipeline complet.
  - `main()` : boucle observer watchdog.
- **Bibliothèques utilisées** :
  - `watchdog` (événements filesystem)
  - `tkinter` (popups)
  - `os`, `json`, `time`, `re`, `threading`, `datetime`
  - local : `alert_sender.send_alert`
- **Méthode de communication** : surveillance filesystem + GUI + HTTP.
- **Entrée** : événements création/modification et contenu fichier.
- **Sortie** : payloads FILE.

### agent/network_monitor.py

- **Objectif** : détecte des uploads cloud probables en corrélant modifications locales récentes et connexions cloud navigateur actives.
- **Fonctions/classes clés** :
  - `resolve_ip(ip)` : reverse DNS avec cache/timeout.
  - `is_cloud_destination(hostname)`, `is_cloud_ip(ip)` : logique de correspondance cloud.
  - `classify_file(filepath)` : classification de contenu sensible.
  - `build_alert(...)` : payload CLOUD de base.
  - `scan_connections()` : routine principale de corrélation.
  - `monitor_loop(interval)` : boucle périodique.
- **Bibliothèques utilisées** :
  - `psutil` (inspection réseau/process/interfaces)
  - `requests` (HTTP)
  - `socket`, `re`, `time`, `json`, `os`, `datetime`, `concurrent.futures`
- **Méthode de communication** : corrélation hôte/réseau/fichier + HTTP POST.
- **Entrée** : connexions, DNS, fichiers récents, métadonnées processus.
- **Sortie** : payloads CLOUD.

### agent/usb_monitor.py

- **Objectif** : détecte l'activité des supports amovibles et applique des actions DLP USB (ALLOW/ALERT/BLOCK).
- **Fonctions/classes clés** :
  - `load_config()` : chargement/fallback de configuration.
  - `UsbMonitorHandler.on_created(...)` : traitement événements de copie.
  - `UsbMonitorHandler.apply_dlp_action(...)` : logique suppression/popup/alerte.
  - `UsbMonitorHandler.post_alert(...)` : construction et envoi payload USB.
  - `main()` : détection des lecteurs + observers par lecteur.
- **Bibliothèques utilisées** :
  - `psutil` (détection lecteurs amovibles)
  - `watchdog` (surveillance filesystem)
  - `ctypes` (popup Windows)
  - `os`, `json`, `time`, `threading`, `datetime`
  - local : `alert_sender.send_alert`
- **Méthode de communication** : monitoring périphérique/fichier + HTTP.
- **Entrée** : nouveaux fichiers copiés sur USB.
- **Sortie** : alertes USB et action locale (suppression/avertissement).

---

## 3. Communication et intégration

### Envoi d'alertes agent -> manager

- Endpoint : `POST /alert`
- URL typique : `http://192.168.100.10:5000/alert`
- Champs communs observés :

```json
{
  "timestamp": "...",
  "classification": "CONFIDENTIAL",
  "label": "CONFIDENTIAL",
  "vector": "FILE",
  "channel": "FILE",
  "filename": "report.txt",
  "filepath": "C:/.../report.txt",
  "hostname": "axa-ams",
  "agent_ip": "192.168.100.20",
  "source_ip": "192.168.100.20",
  "rule_id": "AXA-DLP-FILE-001",
  "severity": "HIGH",
  "action": "AUDIT",
  "user": "john",
  "details": {
    "matched_keywords": ["IBAN"],
    "occurrence_count": 2,
    "scan_source": "file"
  }
}
```

### Interception HTTPS par mitmproxy

- `dlp_addon.py` implémente un addon mitmproxy avec `request(self, flow)`.
- Détection du service cloud via mapping de domaines.
- Traitement orienté requêtes POST.
- Flux Dropbox en deux étapes :
  1. `upload_session/append_v2` : lecture contenu + cache classification par `session_id`.
  2. `finish_batch` : récupération du nom final + envoi alerte.
- Métadonnée de détection : `detection_method: ssl_inspection_mitmproxy`.

### Réception, traitement et journalisation dans manager.py

1. Réception JSON sur `POST /alert`.
2. Validation minimale (`classification`, `filename`).
3. Normalisation (`build_clean_log`). (et EMAIL ajouté récemment).
6. Incrément des compteurs + vérification seuil d'escalade (fixé à 5 occurrences, déclenche un log de niveau CRITICAL)
5. Mise à jour `labeled_files.json` pour FILE/CLOUD sensibles.
6. Incrément des compteurs + vérification seuil d'escalade.
7. Réponse JSON avec `action` et `severity`.

### Interaction de alert_logger.py et alert_sender.py

- `alert_sender.py` est le transport robuste principal côté agent (retry + queue).
- `alert_logger.py` fournit des fonctions structurées de logging côté manager.
- Dans le code actuel, `manager.py` importe `alert_logger` mais écrit directement dans `handle_alert`.

---

## 4. Système de logs

### Emplacement et format

- Emplacement principal (Linux/SOC) :
  - `/var/log/dlp/dlp.json` (JSON lignes)
  - `/var/log/dlp/labeled_files.json` (JSON tableau)
  - `/var/log/dlp/alerts.log` (texte)

- Fallback Windows/dev dans `alert_logger.py` :
  - `manager/logs/dlp.json`
  - `manager/logs/labeled_files.json`
  - `manager/logs/alerts.log`

### Structures d'entrée de log par vecteur

#### Exemple FILE

```json
{
  "timestamp": "2026-04-21T09:10:11.123456",
  "filename": "salary_report.txt",
  "filepath": "C:/Users/john/Documents/salary_report.txt",
  "label": "Confidential",
  "vector": "FILE",
  "rule_id": "AXA-DLP-FIN-001",
  "severity": "HIGH",
  "action": "AUDIT",
  "occurrence_count": 2,
  "matched_keywords": ["iban"],
  "hostname": "axa-ams",
  "agent_ip": "192.168.100.20",
  "user": "john"
}
```

#### Exemple EMAIL

```json
{
  "timestamp": "2026-04-21T09:12:00.000000+00:00",
  "filename": "contract.docx",
  "filepath": "email_attachment:contract.docx",
  "label": "Secret",
  "vector": "EMAIL",
  "rule_id": "AXA-DLP-EMAIL-002",
  "severity": "CRITICAL",
  "action": "BLOCK",
  "occurrence_count": 3,
  "matched_keywords": ["SECRET", "CONTRAT"],
  "hostname": "axa-ams",
  "agent_ip": "192.168.100.20",
  "user": "john@axa.com",
  "to": ["ext@gmail.com"]
}
```

#### Exemple CLOUD

```json
{
  "timestamp": "2026-04-21T09:15:00.000000",
  "filename": "budget.xlsx",
  "filepath": "https://www.dropbox.com",
  "label": "Confidential",
  "vector": "CLOUD",
  "rule_id": "AXA-DLP-CLD-001",
  "severity": "HIGH",
  "action": "AUDIT",
  "occurrence_count": 1,
  "matched_keywords": ["budget"],
  "hostname": "axa-ams",
  "agent_ip": "192.168.100.20",
  "service": "Dropbox"
}
```

#### Exemple USB

```json
{
  "timestamp": "2026-04-21T09:20:00.000000",
  "filename": "patient.csv",
  "filepath": "E:/patient.csv",
  "label": "Secret",
  "vector": "USB",
  "rule_id": "AXA-DLP-USB-001",
  "severity": "critical",
  "action": "BLOCK",
  "occurrence_count": 2,
  "matched_keywords": ["patient", "diagnosis"],
  "hostname": "axa-ams",
  "agent_ip": "192.168.100.20"
}
```

#### Exemple CLIPBOARD

```json
{
  "timestamp": "2026-04-21T09:25:00.000000+00:00",
  "filename": "clipboard",
  "filepath": "",
  "label": "Confidential",
  "vector": "CLIPBOARD",
  "rule_id": "AXA-DLP-CLP-001",
  "severity": "HIGH",
  "action": "AUDIT",
  "occurrence_count": 1,
  "matched_keywords": ["IBAN"],
  "hostname": "AXA-AMS",
  "agent_ip": "192.168.100.20"
}
```

---

## 5. Système de classification

### Niveaux de classification

- Public
- Internal
- Confidential
- Secret

### Mots-clés par niveau (consolidé)

| Niveau | Mots-clés typiques |
|---|---|
| Secret | SECRET, NE PAS DIFFUSER, STRICTLY CONFIDENTIAL, medical, patient, diagnosis, prescription |
| Confidential | IBAN, RIB, CIN, PASSEPORT, CONFIDENTIEL, SALARY, CONTRAT, swift, account number, budget, credit card |
| Internal | INTERNAL, USAGE RESTREINT, INTERNE, restricted |
| Public | Valeur par défaut si aucun match |

### Définition des règles dans rules.json

```json
{
  "id": "AXA-DLP-FIN-001",
  "name": "Block Financial Data Exfiltration to External Entities",
  "classifications": ["Internal", "Confidential", "Secret"],
  "vectors": ["EMAIL", "CLOUD"],
  "conditions": {
    "content_patterns": ["...regex..."],
    "match_threshold": 1,
    "destination_whitelist": ["lab.local", "192.168.100.10"]
  },
  "action": "BLOCK",
  "severity": "critical",
  "description": "..."
}
```

### Déclenchement d'une alerte

- Le module de détection classifie le contenu selon sa propre logique locale.
- Le module fixe `rule_id`, `severity` et `action`.
- Le module envoie l'alerte au manager.
- Le manager journalise et compte; il n'applique pas encore entièrement les `conditions` de `rules.json` côté serveur.

---

## 6. Méthodes de détection par vecteur

| Vecteur | Fichier agent | Méthode de détection |
|---|---|---|
| FILE | `file_scanner.py` | Scan contenu fichier via événements watchdog |
| EMAIL | `email_monitor.py` | Interception SMTP + analyse MIME corps/pièces jointes |
| CLOUD | `dlp_addon.py` et `network_monitor.py` | Inspection HTTPS mitmproxy + corrélation connexion/fichier |
| USB | `usb_monitor.py` | Détection périphérique amovible + événements fichier |
| CLIPBOARD | `clipboard_monitor.py` | Polling presse-papiers + matching mots-clés |

---

## 7. Bibliothèques et dépendances

### Bibliothèques tierces utilisées

| Bibliothèque | Version (connue) | Rôle |
|---|---|---|
| flask | inconnue | Serveur API REST manager |
| requests | inconnue | Transport HTTP des alertes |
| watchdog | inconnue | Surveillance événements filesystem |
| psutil | inconnue | Inspection système réseau/process/USB |
| pywin32 | inconnue | Dépendance Windows déclarée |
| mitmproxy | inconnue | Interception HTTPS vecteur CLOUD |
| pyperclip | inconnue | Accès presse-papiers |
| aiosmtpd | inconnue | Listener SMTP vecteur EMAIL |

### Bibliothèques standard principales

- `os`, `json`, `re`, `time`, `datetime`, `threading`, `pathlib`, `socket`, `email`, `typing`, `logging`, `ctypes`, `tkinter`, `concurrent.futures`, `collections`

### Remarque sur requirements

Le `requirements.txt` actuel contient :

```text
flask
watchdog
psutil
requests
pywin32
```

Mais le code utilise aussi `mitmproxy`, `pyperclip` et `aiosmtpd`, absents de cette liste.

---

## 8. Fichiers générés et référencés

### Fichiers générés à l'exécution

| Chemin | Format | Objectif | Lecture/Écriture |
|---|---|---|---|
| `/var/log/dlp/dlp.json` | JSONL | Log principal des événements | Écrit par manager, lu par `/alerts` |
| `/var/log/dlp/labeled_files.json` | JSON tableau | Index des fichiers sensibles FILE/CLOUD | Lu/écrit par manager |
| `/var/log/dlp/alerts.log` | texte | Logs opérationnels | Écrit par alert_logger |
| `C:/DLP/agent/alerts_queue.json` | JSONL | File d'attente si manager indisponible | Lu/écrit par alert_sender |
| `manager/logs/dlp.json` | JSONL | Emplacement fallback Windows | Lu/écrit par alert_logger |
| `manager/logs/labeled_files.json` | JSON tableau | Fallback Windows fichiers étiquetés | Lu/écrit par alert_logger |
| `manager/logs/alerts.log` | texte | Fallback Windows logs opérationnels | Écrit par alert_logger |

### Fichiers de configuration lus au démarrage

| Chemin | Format | Objectif | Lecteur |
|---|---|---|---|
| `manager/rules.json` | JSON | Configuration politique DLP | manager.py |
| `agent/agent_config.json` | JSON | Paramètres endpoint agent | file_scanner.py, network_monitor.py, usb_monitor.py |

État observé dans l'espace de travail :

- `agent/agent_config.json` existe mais est vide.

---

## Observations et recommandations

1. **Gap d'application des règles côté serveur** : `manager.py` charge les règles mais n'applique pas complètement `conditions` de `rules.json` à l'ingestion.
2. **Incohérence de schéma** : usage mixte de `vector` et `channel`, champs optionnels variables selon les modules.
3. **Divergence des chemins de logs** : `manager.py` écrit directement dans `/var/log/dlp/*`, alors que `alert_logger.py` a sa logique de fallback.
4. **Sécurité transport** : HTTP en clair sans authentification ni signature, risque de spoofing/tampering.
5. **Confiance sur l'identité** : `hostname`, `agent_ip`, `user` sont fournis par le client sans authentification forte.
6. **Dérive de dépendances** : imports runtime non totalement reflétés dans `requirements.txt`.
7. **Robustesse configuration** : un `agent_config.json` vide peut dégrader/rompre certains comportements.
8. **Couverture CLOUD limitée** : logique `dlp_addon.py` spécifique Dropbox, d'autres flux cloud peuvent être manqués.
9. **Faux positifs/négatifs heuristiques** : `network_monitor.py` repose sur de la corrélation probabiliste.
10. **Fiabilité transport hétérogène** : certains modules utilisent la queue `alert_sender`, d'autres envoient en direct.
11. **Minimisation des données** : `content_snippet`/previews peuvent exposer du contenu sensible dans les logs.
12. **Durcissement opérationnel** : ajouter validation schéma, authn/authz, TLS, et moteur de politique centralisé.

---

## Prochaines améliorations suggérées

1. Implémenter un moteur de règles côté serveur dans `manager.py` avec `rules.json` comme source de vérité.
2. Définir et imposer un schéma unifié d'alerte (JSON Schema ou Pydantic).
3. Faire passer tous les modules agents par une abstraction d'envoi robuste unique (`alert_sender`).
4. Ajouter HTTPS + mTLS ou signature HMAC des payloads avec protection anti-rejeu.
5. Mettre à jour les dépendances et figer les versions dans les fichiers requirements.

---

## Corrections & actions (2026-05-12)

Les points suivants ont été identifiés comme corrections immédiates ou actions à planifier :

- **Mettre à jour `requirements.txt`** : ajouter `mitmproxy`, `pyperclip`, `aiosmtpd` (déjà effectué).
- **Standardiser le schéma d'alerte** : remplacer l'usage mixte de `channel` par `vector` comme champ canonique et documenter `channel` comme legacy.
- **Documenter `agent/agent_config.json`** : préciser valeurs par défaut et comportement de fallback quand le fichier est vide.
- **Appliquer `conditions` côté serveur** : planifier l'implémentation d'un moteur de règles dans `manager.py` pour évaluer `rules.json` à l'ingestion.
- **Sécuriser le transport** : ajouter TODO opérationnel pour migration vers HTTPS/mTLS ou signature HMAC des payloads (protection anti-rejeu).
- **Unifier chemins de logs** : documenter la priorité d'écriture (`/var/log/dlp/*` en production, `manager/logs/*` en fallback) et harmoniser `alert_logger.py` et `manager.py`.
- **Limiter les snippets sensibles dans les logs** : ajouter politique de minimisation des données (masquage/longueur maximale pour `content_snippet`).
- **Documenter limites de `dlp_addon.py`** : signaler la couverture Dropbox-first et lister services manquants comme dette technique.

Ces corrections sont des priorités opérationnelles pour la prochaine itération. Voir `manager/architecture_image_instructions.md` pour la proposition de modifications de l'image d'architecture.

## 9. Référence de déploiement opérationnel (Nouvelle section)

### Déploiement Ubuntu (serveur DLP/SOC)

Composants à déployer depuis le projet vers le serveur Ubuntu :

- `manager/manager.py`
- `manager/alert_logger.py`
- `manager/dlp_addon.py`
- `manager/rules.json`
- `manager/dlp_email_sender.py`
- `manager/email_monitor.py` (si utilisé côté SOC)
- `manager/dashboard/` (si dashboard activé côté serveur)

Rôle serveur : réception des alertes, API d'administration, stockage des logs, enrichissement/normalisation.

### Déploiement Windows AXA-AMS (endpoint agent)

Composants à déployer depuis le projet vers le poste AXA-AMS :

- `agent/alert_sender.py`
- `agent/file_scanner.py`
- `agent/clipboard_monitor.py`
- `agent/network_monitor.py`
- `agent/usb_monitor.py`
- `agent/email_monitor.py` (si agent SMTP local activé)
- `agent/agent_config.json`

Rôle endpoint : détection locale en temps réel et transmission des alertes vers `POST /alert` du manager.

- La logique de gouvernance/stockage reste centralisée côté Ubuntu (`manager/`).
- La logique de détection locale reste distribuée côté Windows (`agent/`).
- Toute nouvelle fonctionnalité doit préciser sa destination de déploiement dès sa création.

---

## 10. Fonctionnement Interne : Capture, Communication et Dashboard (Nouvelle Section)

Cette section détaille le fonctionnement global du système DLP, du point d'interception d'une donnée sensible sur le poste client (Windows) jusqu'à sa visualisation en temps réel sur le Dashboard d'administration (Ubuntu).

### 10.1 Capture et Sondes de Détection (Côté Agent Windows)

Chaque type d'activité utilisateur est surveillé par un script Python dédié s'exécutant en tâche de fond sur l'agent :

1. **Surveillance de Fichiers (`file_scanner.py`)** :
   - **Capture** : Utilise la bibliothèque `watchdog` pour s'abonner aux événements du système de fichiers (créations et modifications) dans les répertoires cibles.
   - **Analyse** : À chaque modification, le contenu est lu et passé au crible via une analyse par expressions régulières (Regex) basée sur des mots-clés prédéfinis (IBAN, budget, confidentiel, secret).
   - **Interactivité** :
     - Pour un niveau **CONFIDENTIAL** : Affiche un simple avertissement graphique (Popup Tkinter).
     - Pour un niveau **SECRET** : Demande une confirmation de l'action à l'utilisateur avant d'autoriser le transfert, et envoie immédiatement l'alerte.

2. **Surveillance du Presse-papiers (`clipboard_monitor.py`)** :
   - **Capture** : Effectue un polling périodique (toutes les secondes) via la bibliothèque `pyperclip` pour inspecter le texte brut copié dans le presse-papiers Windows.
   - **Analyse** : Détecte en temps réel si des expressions sensibles (par exemple, des IBANs ou des documents marqués "Strictly Confidential") y sont placés.
   - **Optimisation** : Calcule un hash MD5 du texte copié pour éviter la duplication des alertes si l'utilisateur copie plusieurs fois le même bloc de texte.

3. **Surveillance des Clés USB (`usb_monitor.py`)** :
   - **Capture** : Utilise `psutil` pour détecter l'insertion physique de clés ou disques amovibles. Dès qu'un nouveau disque USB est monté (ex: lecteur `E:`), il lance dynamiquement un observer `watchdog` sur sa racine.
   - **Analyse & Action** : Analyse tout fichier copié ou créé sur le volume amovible. Si un fichier contient du contenu **SECRET**, le script supprime le fichier de la clé USB (`BLOCK`) et alerte l'utilisateur par une boîte de dialogue Windows (`MessageBoxW` via l'API `ctypes`).

4. **Surveillance Réseau & Cloud (`network_monitor.py` & `dlp_addon.py`)** :
   - **Approche Agent (`network_monitor.py`)** : Analyse les connexions réseau actives de la machine via `psutil.net_connections()` et identifie les sockets orientés vers des domaines ou adresses IP de services Cloud (Dropbox, OneDrive, etc.). Il corrèle la temporalité de ces connexions avec les modifications récentes de fichiers locaux sensibles.
   - **Approche Interception HTTPS (`dlp_addon.py`)** : Intègre un relais man-in-the-middle `mitmproxy`. Il écoute et inspecte les flux HTTPS en transit (ex: uploads d'API Dropbox). Il intercepte les requêtes POST, décode les fragments (ex: sessions d'upload de fichiers) et évalue les métadonnées de fichier pour lever des alertes réseau.

5. **Surveillance des Emails (`email_monitor.py`)** :
   - **Capture** : Déploie un serveur SMTP local simulé (port `1025` via `aiosmtpd`) configuré pour intercepter les flux de messagerie sortante.
   - **Analyse** : Décompose les messages MIME pour analyser séparément le corps du message et les pièces jointes (fichiers attachés). Si un destinataire externe est ciblé avec du contenu sensible, une alerte EMAIL est générée.

---

### 10.2 Transmission et Résilience (`alert_sender.py`)

Une fois l'alerte construite sous forme de dictionnaire JSON, elle est centralisée par `alert_sender.py` avant d'être expédiée :
- **Requête standard** : Envoi asynchrone via une requête `HTTP POST` vers l'API du manager (`http://<manager_ip>:5000/alert`).
- **Mode déconnecté (Résilience)** : Si le manager est injoignable (panne réseau, serveur éteint), l'alerte n'est pas perdue. Elle est immédiatement stockée localement dans une file d'attente à l'adresse `C:/DLP/agent/alerts_queue.json` (format JSON Lines).
- **Worker de rejeu** : Un thread d'arrière-plan inspecte périodiquement la file locale. Dès que la connectivité vers le serveur SOC est rétablie, il vide la file locale et rejoue l'ensemble des alertes en attente vers l'API.

---

### 10.3 Ingestion, Normalisation et Logs (Côté DLP Manager)

Le manager est construit sur une API Flask (`manager.py`) qui orchestre le stockage et la corrélation des événements reçus :

```text
+-----------------------+      1. POST /alert      +-------------------------+
|     Agent Windows     | -----------------------> |    manager.py (Flask)   |
+-----------------------+                          +-------------------------+
                                                                |
                                             +------------------+------------------+
                                             |                                     |
                                             v 2. Normaliser                       v 5. SIEM Forward
                                   [build_clean_log()]                     [send_to_wazuh()]
                                             |                                     |
                                             v 3. Log JSON Lines                   v
                                     /var/log/dlp/dlp.json             Socket Wazuh (UDP)
                                             |
                                             v 4. Fichiers étiquetés
                                   /var/log/dlp/labeled_files.json
```

1. **Inbound Endpoint (`/alert`)** : Reçoit la payload brute, valide la présence des champs obligatoires (`filename`, `classification`) et vérifie le vecteur.
2. **Normalisation (`build_clean_log`)** : Standardise la structure en extrayant les métadonnées (nom de fichier, vecteur, utilisateur, machine, sévérité, action) et en isolant les attributs spécifiques (SMTP pour l'email, URL/Service pour le Cloud).
3. **Persistance en JSON Lines** :
   > [!IMPORTANT]
   > Le fichier `/var/log/dlp/dlp.json` est persisté au format **JSON Lines (NDJSON)**. Chaque alerte correspond à une ligne JSON indépendante et valide en soi.
   > **Règle de syntaxe** : Le fichier ne doit PAS être encapsulé par des crochets `[` `]` ni séparé par des virgules à la fin de chaque ligne. Bien que les éditeurs de code signalent une erreur syntaxique standard (*"End of file expected"*), ce format NDJSON est indispensable pour permettre l'écriture incrémentale fluide (mode append rapide sans réécrire tout le fichier) et la lecture ligne par ligne par le serveur SOC sans surcharge mémoire.
4. **Registre des fichiers étiquetés (`labeled_files.json`)** : Si l'alerte concerne un fichier classifié sensible (INTERNAL, CONFIDENTIAL ou SECRET), son chemin complet est indexé dans un catalogue centralisé de fichiers surveillés.
5. **Intégration SIEM / SOC (`send_to_wazuh`)** : Transmet l'alerte formatée au socket local de Wazuh (serveur de sécurité central) via un socket UDP Unix (`/var/ossec/queue/sockets/queue`), permettant la corrélation globale d'événements.
6. **Escalade d'alerte** : Si le nombre d'occurrences pour un type d'alerte particulier dépasse un seuil de 5 événements (`ESCALADE_SEUIL`), le manager émet une alerte de gravité CRITICAL sur sa console.

---

### 10.4 Dashboard d'Administration (Visualisation Web SOC)

Le Dashboard SOC est une interface graphique Web dynamique (SPA codée en HTML5/CSS3/Vanilla JS) intégrée au dossier `manager/dashboard/` et directement servie par Flask sur l'URI `http://<manager_ip>:5000/dashboard`.

Le cycle de rafraîchissement et d'affichage des données fonctionne ainsi :

1. **Collecte des Données via API** :
   - Le script client interroge périodiquement les API exposées par Flask :
     - `/stats` : Fournit les indicateurs clés (KPI) calculés par le serveur, les volumes par vecteur, et l'activité horaire sur 24h.
     - `/alerts` : Récupère la liste chronologique des dernières alertes pour remplir le flux d'événements.
     - `/labeled` : Affiche l'inventaire des fichiers sensibles répertoriés.
     - `/rules` : Affiche les politiques de sécurité actives configurées.

2. **Affichage dans l'Interface** :
    - **Cartes KPI** : Affiche les indicateurs globaux (Total des alertes reçues, Nombre de blocages effectifs, Nombre de Faux Positifs, Alertes critiques du jour).
   - **Tableau de flux live (Live Feed)** : Liste les alertes à la volée. Chaque alerte affiche son horodatage, la machine source (`hostname`), le vecteur de fuite (USB, EMAIL, etc.), la classification du fichier (Secret, Confidential, Internal), et l'action de remédiation associée (ALLOW ou BLOCK). Un code couleur dynamique (Rouge pour BLOCK/CRITICAL, Orange pour HIGH/AUDIT, Bleu pour INFO) attire l'attention de l'administrateur.
   - **Graphiques Interactifs** : Modélisent visuellement la distribution des alertes par vecteur de communication et l'évolution temporelle des incidents.
   - **État des Endpoints** : Présente une vue matricielle des hôtes surveillés (`axa-ams`, `axa-go`), indiquant leur adresse IP, leur statut de connexion (Actif s'ils ont envoyé des logs récemment, Inactif sinon) et la dernière activité enregistrée.

3. **Actions de Gestion Administrateur** :
   - **Gestion des Incidents (Case Management)** : Permet de modifier le statut d'une alerte (New, Investigating, Resolved, False Positive) et son assignation directement depuis le panneau "Alert Events". Les KPI et graphiques du dashboard se mettent à jour dynamiquement de manière instantanée après enregistrement.
   - **Alerte email manuelle** : L'administrateur peut cliquer sur une alerte dans le tableau pour l'envoyer par email à un manager spécifique (`POST /send-alert-email`), l'alerte email contenant le résumé complet de l'infraction.
   - **Configuration SMTP** : Permet de configurer les coordonnées de connexion du serveur SMTP du SOC directement depuis le Dashboard.
   - **Annuaire Organisationnel (`/org-chart`)** : Fournit une vue d'arbre dynamique des rôles et départements d'AXA GBS pour identifier les responsables de chaque machine ou utilisateur impliqué dans les alertes.

