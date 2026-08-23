'use client';

import { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  Layers, 
  Cpu, 
  FileCheck2,
  ArrowDown, 
  ArrowUp,
  Lock,
  FileSpreadsheet,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  UserCheck,
  GitCompare,
  BarChart3,
  Activity,
  Filter,
  Database,
  Eye,
  Inbox
} from 'lucide-react';
import { Shell } from '../Presentation';
import type { SlideProps } from '../Presentation';
import LogicalArchitectureSchema from './LogicalArchitectureSchema';
import LabelGuardSchema from './LabelGuardSchema';
import OneTrustSchema from './OneTrustSchema';
import MonitoringSchema from './MonitoringSchema';

const emptySubscribe = () => () => {};

const verticalVariants: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    y: dir > 0 ? '50%' : '-50%',
    scale: 0.97
  }),
  center: {
    opacity: 1,
    y: '0%',
    scale: 1
  },
  exit: (dir: number) => ({
    opacity: 0,
    y: dir > 0 ? '-50%' : '50%',
    scale: 0.97
  })
};

export default function ArchitectureSlide({ n }: SlideProps) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [subStep, setSubStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);

  const subStepRef = useRef(subStep);
  useEffect(() => {
    subStepRef.current = subStep;
  }, [subStep]);
  const isScrolling = useRef(false);

  // Capture wheel and keyboard events for internal sub-step navigation (1/5 to 5/5)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 18) return;
      if (isScrolling.current) return;

      if (e.deltaY > 0) {
        if (subStepRef.current < 5) {
          e.stopPropagation();
          e.stopImmediatePropagation();
          isScrolling.current = true;
          setSlideDirection(1);
          setSubStep((prev) => (prev + 1) as 1 | 2 | 3 | 4 | 5);
          setTimeout(() => { isScrolling.current = false; }, 400);
        }
      } else if (e.deltaY < 0) {
        if (subStepRef.current > 1) {
          e.stopPropagation();
          e.stopImmediatePropagation();
          isScrolling.current = true;
          setSlideDirection(-1);
          setSubStep((prev) => (prev - 1) as 1 | 2 | 3 | 4 | 5);
          setTimeout(() => { isScrolling.current = false; }, 400);
        }
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (subStepRef.current < 5) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          setSlideDirection(1);
          setSubStep((prev) => (prev + 1) as 1 | 2 | 3 | 4 | 5);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (subStepRef.current > 1) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          setSlideDirection(-1);
          setSubStep((prev) => (prev - 1) as 1 | 2 | 3 | 4 | 5);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { capture: true });
    window.addEventListener('keydown', handleKey, { capture: true });

    return () => {
      window.removeEventListener('wheel', handleWheel, { capture: true });
      window.removeEventListener('keydown', handleKey, { capture: true });
    };
  }, []);

  if (!isMounted) {
    return <div className="p-6 text-slate-500">Chargement de la conception...</div>;
  }

  // LabelGuard Steps Data for Sub-step 3
  const labelGuardSteps = [
    { num: '01', title: 'Génération Synthétique', desc: 'Création de données valides (IBAN/MOD-97, CB/Luhn, SWIFT) sans données réelles.', icon: Cpu },
    { num: '02', title: 'Injection Documentaire', desc: 'Insertion automatique dans des fichiers Office (Word, Excel, PowerPoint).', icon: FileSpreadsheet },
    { num: '03', title: 'Test Microsoft Purview', desc: 'Vérification de la détection DLP et de l\'auto-étiquetage.', icon: ShieldCheck },
    { num: '04', title: 'Traçabilité & Audit AXA', desc: 'Identifiant unique, statut Passed/Failed et export de preuves.', icon: CheckCircle2 }
  ];

  // OneTrust Tracker Steps Data for Sub-step 4
  const oneTrustSteps = [
    { num: '01', title: 'Authentification & Sélection', desc: 'Accès sécurisé de l\'analyste et choix de la règle DLP locale à évaluer.', icon: UserCheck },
    { num: '02', title: 'Analyse IA Locale (Ollama) & CM11', desc: 'Comparaison sémantique locale avec le référentiel CM11 OneTrust (Zéro Fuite de Données).', icon: Sparkles },
    { num: '03', title: 'Recommandations Intelligentes', desc: 'Proposition IA : Conserver (valeur métier), Supprimer (redondante) ou Réviser.', icon: GitCompare },
    { num: '04', title: 'Validation Humaine (Human-in-the-Loop)', desc: 'Validation obligatoire par un analyste DLP ou RSI avant toute application.', icon: ShieldCheck },
    { num: '05', title: 'Traçabilité & Dashboarding', desc: 'Enregistrement des décisions, KPIs, avancement du projet et génération de rapports.', icon: BarChart3 }
  ];

  // DLP Monitoring Tool Steps Data for Sub-step 5
  const monitoringSteps = [
    { num: '01', title: 'Réception Multi-Sources', desc: 'Ingestion des alertes Purview, Exchange & Log Analytics (texte brut ou Excel).', icon: Inbox },
    { num: '02', title: 'Parsing & Nettoyage Automatise', desc: 'Extraction ciblée pour le texte, dédoublonnage et filtrage des champs pour Excel.', icon: Filter },
    { num: '03', title: 'Normalisation des Données', desc: 'Structuration standardisée de l\'ID d\'incident, objet mail, utilisateur, emails & fichiers.', icon: Database },
    { num: '04', title: 'Démasquage des Emails', desc: 'Détection et démasquage automatique des adresses emails obfusquées Purview.', icon: Eye },
    { num: '05', title: 'Restitution SOC Exploitable', desc: 'Génération d\'une sortie synthétique exploitable immédiatement par l\'analyste.', icon: CheckCircle2 }
  ];

  const getSlideTitle = () => {
    if (subStep === 1) return 'Architecture Logique DLP';
    if (subStep === 2) return 'Infrastructure VMware';
    if (subStep === 3) return 'LabelGuard — Validation DLP';
    if (subStep === 4) return 'OneTrust Tracker — CM11';
    return 'DLP Monitoring Tool — Alertes';
  };

  const getSubTitle = () => {
    if (subStep === 1) return 'PARTIE 1/5 — VUE LOGIQUE';
    if (subStep === 2) return 'PARTIE 2/5 — INFRASTRUCTURE VMWARE';
    if (subStep === 3) return 'PARTIE 3/5 — FLUX LABELGUARD';
    if (subStep === 4) return 'PARTIE 4/5 — ONETRUST TRACKER';
    return 'PARTIE 5/5 — MONITORING TOOL';
  };

  return (
    <Shell
      section="CONCEPTION"
      pulseLabel="Conception"
      title={getSlideTitle()}
      n={n}
      dense
    >
      <div className="w-full h-full flex flex-col items-center justify-between relative overflow-hidden p-0">
        
        {/* Top Control Bar with Sub-step Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
          marginBottom: '0.2vw',
          zIndex: 20
        }}>
          {/* Active Sub-step Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4vw',
            background: 'rgba(0, 0, 143, 0.06)',
            border: '1px solid rgba(0, 0, 143, 0.18)',
            borderRadius: '999px',
            padding: '0.2vw 0.75vw',
            fontSize: '0.68vw',
            fontWeight: 800,
            color: '#00008f'
          }}>
            {subStep === 1 && <Layers style={{ width: '0.8vw', height: '0.8vw', color: '#00008f' }} />}
            {subStep === 2 && <Cpu style={{ width: '0.8vw', height: '0.8vw', color: '#00008f' }} />}
            {subStep === 3 && <FileCheck2 style={{ width: '0.8vw', height: '0.8vw', color: '#00008f' }} />}
            {subStep === 4 && <Sparkles style={{ width: '0.8vw', height: '0.8vw', color: '#00008f' }} />}
            {subStep === 5 && <Activity style={{ width: '0.8vw', height: '0.8vw', color: '#00008f' }} />}
            <span>{getSubTitle()}</span>
          </div>
        </div>

        {/* Main Stage Display */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: 'calc(100% - 3.6vw)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          <AnimatePresence mode="wait" custom={slideDirection}>
            
            {/* SUB-STEP 1: Functional Architecture */}
            {subStep === 1 && (
              <motion.div
                key="sub-1"
                custom={slideDirection}
                variants={verticalVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  padding: '0.2vw'
                }}
              >
                <img
                  src="/image.png"
                  alt="Architecture Fonctionnelle DLP"
                  style={{
                    maxWidth: '92%',
                    maxHeight: '90%',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    mixBlendMode: 'multiply',
                    margin: 'auto',
                    display: 'block',
                    filter: 'contrast(1.08) brightness(1.01) saturate(1.06)',
                    WebkitFontSmoothing: 'antialiased',
                    transform: 'translateZ(0)'
                  }}
                />
              </motion.div>
            )}

            {/* SUB-STEP 2: Technical & Network Infrastructure Architecture */}
            {subStep === 2 && (
              <motion.div
                key="sub-2"
                custom={slideDirection}
                variants={verticalVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  padding: '0.2vw'
                }}
              >
                <img
                  src="/image copy.png"
                  alt="Architecture Technique et Infrastructure Réseau VMware"
                  style={{
                    maxWidth: '92%',
                    maxHeight: '90%',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    mixBlendMode: 'multiply',
                    margin: 'auto',
                    display: 'block',
                    filter: 'contrast(1.08) brightness(1.01) saturate(1.06)',
                    WebkitFontSmoothing: 'antialiased',
                    transform: 'translateZ(0)'
                  }}
                />
              </motion.div>
            )}

            {/* SUB-STEP 3: LabelGuard Centered Layout */}
            {subStep === 3 && (
              <motion.div
                key="sub-3"
                custom={slideDirection}
                variants={verticalVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                style={{
                  width: '100%',
                  height: '94%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  paddingTop: '0.4vw',
                  paddingBottom: '0.4vw',
                  margin: 'auto'
                }}
              >
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxSizing: 'border-box'
                }}>
                  <LabelGuardSchema />
                </div>
              </motion.div>
            )}

            {/* SUB-STEP 4: OneTrust Tracker Centered Layout */}
            {subStep === 4 && (
              <motion.div
                key="sub-4"
                custom={slideDirection}
                variants={verticalVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                style={{
                  width: '100%',
                  height: '94%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  paddingTop: '0.4vw',
                  paddingBottom: '0.4vw',
                  margin: 'auto'
                }}
              >
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxSizing: 'border-box'
                }}>
                  <OneTrustSchema />
                </div>
              </motion.div>
            )}

            {/* SUB-STEP 5: DLP Monitoring Tool Centered Layout */}
            {subStep === 5 && (
              <motion.div
                key="sub-5"
                custom={slideDirection}
                variants={verticalVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                style={{
                  width: '100%',
                  height: '94%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  paddingTop: '0.4vw',
                  paddingBottom: '0.4vw',
                  margin: 'auto'
                }}
              >
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxSizing: 'border-box'
                }}>
                  <MonitoringSchema />
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Bottom Interactive Scroll Indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '4px', zIndex: 10 }}>
          <button
            onClick={() => {
              if (subStep < 5) {
                setSlideDirection(1);
                setSubStep((prev) => (prev + 1) as 1 | 2 | 3 | 4 | 5);
              }
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: subStep < 5 ? 'pointer' : 'default',
              padding: 0
            }}
          >
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: subStep === 5 ? 'rgba(16, 185, 129, 0.08)' : 'rgba(0, 0, 143, 0.05)',
                border: `1.5px solid ${subStep === 5 ? 'rgba(16, 185, 129, 0.25)' : 'rgba(0, 0, 143, 0.15)'}`,
                color: subStep === 5 ? '#047857' : '#00008f',
                padding: '2px 12px',
                borderRadius: '20px',
                fontSize: '0.68vw',
                fontWeight: 700
              }}
            >
              <span>
                {subStep === 1 && 'Scroll vers le bas pour la Partie 2/5 (Infrastructure VMware)'}
                {subStep === 2 && 'Scroll vers le bas pour la Partie 3/5 (LabelGuard)'}
                {subStep === 3 && 'Scroll vers le bas pour la Partie 4/5 (OneTrust Tracker)'}
                {subStep === 4 && 'Scroll vers le bas pour la Partie 5/5 (DLP Monitoring Tool)'}
                {subStep === 5 && 'Scroll vers le bas pour la suite (Réalisation)'}
              </span>
              <span style={{ fontSize: '0.78vw', fontWeight: 900 }}>↓</span>
            </motion.div>
          </button>
        </div>

      </div>
    </Shell>
  );
}


