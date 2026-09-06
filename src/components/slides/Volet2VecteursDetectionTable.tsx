'use client';

import { motion } from 'framer-motion';
import { 
  FileText, 
  Mail, 
  HardDrive, 
  Clipboard, 
  Cloud
} from 'lucide-react';

export default function Volet2VecteursDetectionTable() {
  const vectorsData = [
    {
      vector: 'FILE',
      icon: FileText,
      capture: 'Événements du Filesystem',
      tool: 'watchdog',
      logic: 'Scan Regex lors de modification. Déclenche une popup tkinter si fichier sensible.'
    },
    {
      vector: 'EMAIL',
      icon: Mail,
      capture: 'Serveur SMTP local (Port 1025)',
      tool: 'aiosmtpd',
      logic: 'Analyse MIME du corps & pièces jointes. Détection si le destinataire est externe.'
    },
    {
      vector: 'USB',
      icon: HardDrive,
      capture: 'Détection montage de volume',
      tool: 'psutil + watchdog',
      logic: 'Suppression immédiate si classé SECRET. Avertissement Windows via ctypes.'
    },
    {
      vector: 'CLIPBOARD',
      icon: Clipboard,
      capture: 'Polling périodique (1 sec)',
      tool: 'pyperclip',
      logic: 'Analyse du texte brut. Hachage MD5 pour déduplication des alertes.'
    },
    {
      vector: 'CLOUD',
      icon: Cloud,
      capture: 'Corrélation Hôte / Réseau',
      tool: 'psutil / mitmproxy',
      logic: 'Analyse des flux POST HTTPS et des sockets des processus navigateurs actifs.'
    }
  ];

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      background: '#ffffff',
      border: '1.5px solid #cbd5e1',
      borderRadius: '16px',
      padding: '1.2vw 1.6vw',
      boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)',
      boxSizing: 'border-box',
      overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>

      {/* Main Table Layout */}
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'separate',
          borderSpacing: '0',
          border: '2px solid #1e293b',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 14px rgba(15, 23, 42, 0.06)'
        }}>
          <thead>
            <tr style={{ background: '#cbd5e1', color: '#0f172a' }}>
              <th style={{
                padding: '0.8vw 1.2vw',
                fontSize: '0.9vw',
                fontWeight: 900,
                textAlign: 'left',
                width: '16%',
                borderRight: '1.5px solid #94a3b8',
                borderBottom: '2px solid #1e293b',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}>
                Vecteur
              </th>
              <th style={{
                padding: '0.8vw 1.2vw',
                fontSize: '0.9vw',
                fontWeight: 900,
                textAlign: 'left',
                width: '26%',
                borderRight: '1.5px solid #94a3b8',
                borderBottom: '2px solid #1e293b',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}>
                Méthode de Capture
              </th>
              <th style={{
                padding: '0.8vw 1.2vw',
                fontSize: '0.9vw',
                fontWeight: 900,
                textAlign: 'left',
                width: '20%',
                borderRight: '1.5px solid #94a3b8',
                borderBottom: '2px solid #1e293b',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}>
                Outil / Librairie
              </th>
              <th style={{
                padding: '0.8vw 1.2vw',
                fontSize: '0.9vw',
                fontWeight: 900,
                textAlign: 'left',
                width: '38%',
                borderBottom: '2px solid #1e293b',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}>
                Logique d&apos;Analyse &amp; Action
              </th>
            </tr>
          </thead>
          <tbody>
            {vectorsData.map((row, index) => {
              const Icon = row.icon;
              const isLast = index === vectorsData.length - 1;

              return (
                <motion.tr
                  key={row.vector}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.25 }}
                  style={{
                    background: index % 2 === 0 ? '#ffffff' : '#f8fafc'
                  }}
                >
                  {/* Vecteur */}
                  <td style={{
                    padding: '0.9vw 1.2vw',
                    fontSize: '0.88vw',
                    fontWeight: 900,
                    color: '#0f172a',
                    borderRight: '1.5px solid #cbd5e1',
                    borderBottom: isLast ? 'none' : '1.5px solid #cbd5e1',
                    verticalAlign: 'middle'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6vw' }}>
                      <div style={{
                        background: '#eff6ff',
                        color: '#0b66d5',
                        padding: '0.4vw',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid #bfdbfe'
                      }}>
                        <Icon size={18} />
                      </div>
                      <strong style={{ fontSize: '0.95vw', color: '#0f172a' }}>{row.vector}</strong>
                    </div>
                  </td>

                  {/* Méthode de Capture */}
                  <td style={{
                    padding: '0.9vw 1.2vw',
                    fontSize: '0.85vw',
                    fontWeight: 700,
                    color: '#334155',
                    borderRight: '1.5px solid #cbd5e1',
                    borderBottom: isLast ? 'none' : '1.5px solid #cbd5e1',
                    verticalAlign: 'middle'
                  }}>
                    {row.capture}
                  </td>

                  {/* Outil / Librairie */}
                  <td style={{
                    padding: '0.9vw 1.2vw',
                    fontSize: '0.85vw',
                    borderRight: '1.5px solid #cbd5e1',
                    borderBottom: isLast ? 'none' : '1.5px solid #cbd5e1',
                    verticalAlign: 'middle'
                  }}>
                    <span style={{
                      background: '#f1f5f9',
                      border: '1.5px solid #64748b',
                      color: '#0f172a',
                      fontSize: '0.82vw',
                      fontWeight: 800,
                      fontFamily: 'monospace',
                      padding: '0.25vw 0.7vw',
                      borderRadius: '5px',
                      display: 'inline-block'
                    }}>
                      {row.tool}
                    </span>
                  </td>

                  {/* Logique d'Analyse & Action */}
                  <td style={{
                    padding: '0.9vw 1.2vw',
                    fontSize: '0.82vw',
                    fontWeight: 600,
                    color: '#0f172a',
                    lineHeight: 1.45,
                    borderBottom: isLast ? 'none' : '1.5px solid #cbd5e1',
                    verticalAlign: 'middle'
                  }}>
                    {row.logic}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}

