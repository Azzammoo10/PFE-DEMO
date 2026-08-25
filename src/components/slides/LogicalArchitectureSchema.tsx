'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Monitor, 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  Bell, 
  Activity, 
  Flame, 
  CheckCircle2,
  Lock,
  Zap,
  ShieldAlert,
  ArrowDown,
  ArrowRight,
  ArrowLeft,
  ArrowUp
} from 'lucide-react';

export default function LogicalArchitectureSchema() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Auto step-by-step sequence loop (1 -> 2 -> 3 -> 4 -> 5)
  useEffect(() => {
    if (hoveredNode !== null) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev % 5) + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, [hoveredNode]);

  const stepsData = [
    { num: 1, title: 'Step 1 : Surveillance Endpoints et Agents Python', desc: 'Les sondes Python surveillent la mémoire, les USB, emails, SCP et uploads cloud des postes Windows AXA GO.' },
    { num: 2, title: 'Step 2 : Traitement Moteur DLP LAB', desc: 'Ingestion, parsing, normalisation JSON et calcul du Risk Scoring au sein du Laboratoire DLP Hybride.' },
    { num: 3, title: 'Step 3 : Politiques et Décision Locale', desc: 'Évaluation contre le référentiel de classification et déclenchement immédiat du blocage ou de l\'alerte.' },
    { num: 4, title: 'Step 4 : Corrélation Wazuh SOC et Active Response', desc: 'Centralisation des logs JSON dans Wazuh SOC, mapping MITRE ATT&CK et blocage automatique des Reverse Shells.' },
    { num: 5, title: 'Step 5 : Validation Offensive Kali Linux', desc: 'Execution de scénarios d\'exfiltration réels (Kali Linux) pour valider l\'efficacité des règles DLP et du SOC.' }
  ];

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      border: '1.5px solid #cbd5e1',
      borderRadius: '16px',
      padding: '0.7vw 1vw',
      boxShadow: '0 8px 24px rgba(15, 23, 42, 0.04)',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      
      {/* Top Controls & Flow Navigator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#f1f5f9',
        border: '1px solid #cbd5e1',
        borderRadius: '10px',
        padding: '0.3vw 0.8vw',
        marginBottom: '0.4vw'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5vw' }}>
          <span style={{
            background: '#00008f',
            color: '#ffffff',
            fontSize: '0.6vw',
            fontWeight: 900,
            borderRadius: '5px',
            padding: '0.12vw 0.5vw',
            letterSpacing: '0.05em'
          }}>
            VUE LOGIQUE DÉTAILLÉE
          </span>
          <span style={{ fontSize: '0.75vw', fontWeight: 800, color: '#0f172a' }}>
            Architecture Hybride DLP &amp; Supervision SOC
          </span>
        </div>

        {/* Step Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35vw' }}>
          {stepsData.map((s) => {
            const isActive = activeStep === s.num;
            return (
              <button
                key={s.num}
                onClick={() => setActiveStep(s.num)}
                style={{
                  background: isActive ? '#00008f' : '#ffffff',
                  color: isActive ? '#ffffff' : '#475569',
                  border: isActive ? '1.5px solid #00008f' : '1px solid #cbd5e1',
                  borderRadius: '6px',
                  padding: '0.18vw 0.55vw',
                  fontSize: '0.62vw',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 2px 8px rgba(0,0,143,0.25)' : 'none'
                }}
              >
                Step 0{s.num}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Canvas Grid Layout (Matching image.png perfectly) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.35fr 1fr',
        gridTemplateRows: 'auto auto auto auto',
        gap: '0.5vw 0.9vw',
        flex: 1,
        alignItems: 'stretch',
        position: 'relative'
      }}>

        {/* ========================================================================= */}
        {/* ROW 1: ENDPOINTS WINDOWS (TOP CENTER)                                     */}
        {/* ========================================================================= */}
        <div style={{ gridColumn: '2 / 3', gridRow: '1 / 2' }}>
          <motion.div
            onMouseEnter={() => setHoveredNode('endpoints')}
            onMouseLeave={() => setHoveredNode(null)}
            animate={{
              borderColor: activeStep === 1 || hoveredNode === 'endpoints' ? '#0b66d5' : '#93c5fd',
              boxShadow: activeStep === 1 || hoveredNode === 'endpoints'
                ? '0 6px 18px rgba(11, 102, 213, 0.25)'
                : '0 2px 6px rgba(0,0,0,0.02)'
            }}
            style={{
              background: activeStep === 1 || hoveredNode === 'endpoints' ? '#eff6ff' : '#ffffff',
              border: '1.5px solid #93c5fd',
              borderRadius: '12px',
              padding: '0.5vw 0.8vw',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.7vw',
              textAlign: 'center',
              transition: 'all 0.25s ease'
            }}
          >
            <div style={{
              background: 'linear-gradient(135deg, #0b66d5 0%, #00449e 100%)',
              color: '#ffffff',
              borderRadius: '9px',
              padding: '0.45vw',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Monitor size={20} />
            </div>

            <div style={{ textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4vw' }}>
                <h4 style={{ margin: 0, fontSize: '0.82vw', fontWeight: 900, color: '#0b66d5', letterSpacing: '0.02em' }}>
                  ENDPOINTS WINDOWS
                </h4>
                <span style={{ background: '#dbeafe', color: '#1e40af', fontSize: '0.54vw', fontWeight: 800, padding: '0.08vw 0.35vw', borderRadius: '4px' }}>
                  AXA AMS / AXA GO
                </span>
              </div>
              <p style={{ margin: '0.1vw 0 0 0', fontSize: '0.62vw', color: '#475569', fontWeight: 600 }}>
                Activités utilisateurs : création, copie, envoi email, upload cloud, transfert, etc.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* ROW 2: AGENTS DLP PYTHON (LEFT) | LABORATOIRE DLP (CENTER) | WAZUH SOC (RIGHT) */}
        {/* ========================================================================= */}

        {/* LEFT: AGENTS DLP PYTHON */}
        <div style={{ gridColumn: '1 / 2', gridRow: '2 / 3' }}>
          <motion.div
            onMouseEnter={() => setHoveredNode('agents')}
            onMouseLeave={() => setHoveredNode(null)}
            animate={{
              borderColor: activeStep === 1 || hoveredNode === 'agents' ? '#059669' : '#6ee7b7',
              boxShadow: activeStep === 1 || hoveredNode === 'agents'
                ? '0 6px 18px rgba(5, 150, 105, 0.25)'
                : '0 2px 6px rgba(0,0,0,0.02)'
            }}
            style={{
              background: activeStep === 1 || hoveredNode === 'agents' ? '#f0fdf4' : '#ffffff',
              border: '1.5px solid #6ee7b7',
              borderRadius: '12px',
              padding: '0.6vw 0.8vw',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxSizing: 'border-box',
              transition: 'all 0.25s ease'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5vw', marginBottom: '0.4vw' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  color: '#ffffff',
                  borderRadius: '7px',
                  padding: '0.35vw',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Terminal size={16} />
                </div>
                <h4 style={{ margin: 0, fontSize: '0.82vw', fontWeight: 900, color: '#059669' }}>
                  AGENTS DLP PYTHON
                </h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25vw' }}>
                {[
                  'USB Monitoring',
                  'Email Monitoring',
                  'SCP Monitoring',
                  'Clipboard Monitoring',
                  'Cloud Monitoring'
                ].map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35vw',
                    background: '#ffffff',
                    border: '1px solid #a7f3d0',
                    borderRadius: '5px',
                    padding: '0.18vw 0.45vw',
                    fontSize: '0.63vw',
                    fontWeight: 700,
                    color: '#065f46'
                  }}>
                    <CheckCircle2 size={11} color="#059669" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* CENTER CORE: LABORATOIRE DLP HYBRIDE */}
        <div style={{ gridColumn: '2 / 3', gridRow: '2 / 3' }}>
          <motion.div
            onMouseEnter={() => setHoveredNode('core')}
            onMouseLeave={() => setHoveredNode(null)}
            animate={{
              borderColor: activeStep === 2 || hoveredNode === 'core' ? '#d97706' : '#fcd34d',
              boxShadow: activeStep === 2 || hoveredNode === 'core'
                ? '0 8px 24px rgba(217, 119, 6, 0.28)'
                : '0 4px 10px rgba(0,0,0,0.03)'
            }}
            style={{
              background: activeStep === 2 || hoveredNode === 'core' ? '#fffbeb' : '#ffffff',
              border: '2px solid #fcd34d',
              borderRadius: '14px',
              padding: '0.7vw 0.9vw',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxSizing: 'border-box',
              transition: 'all 0.25s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5vw' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                  color: '#ffffff',
                  borderRadius: '8px',
                  padding: '0.4vw',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Cpu size={18} />
                </div>
                <div>
                  <span style={{ fontSize: '0.52vw', fontWeight: 900, color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    CŒUR HYBRIDE
                  </span>
                  <h3 style={{ margin: 0, fontSize: '0.92vw', fontWeight: 900, color: '#78350f' }}>
                    LABORATOIRE DLP HYBRIDE
                  </h3>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25vw', margin: '0.3vw 0' }}>
              {[
                'Collecte des événements',
                'Parsing & Normalisation',
                'Classification & Risk Scoring',
                'Application des politiques'
              ].map((item, idx) => (
                <div key={idx} style={{
                  background: '#ffffff',
                  border: '1px solid #fde68a',
                  borderRadius: '5px',
                  padding: '0.22vw 0.45vw',
                  fontSize: '0.64vw',
                  fontWeight: 800,
                  color: '#78350f',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3vw'
                }}>
                  <span style={{ color: '#d97706' }}>•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT: WAZUH SOC */}
        <div style={{ gridColumn: '3 / 4', gridRow: '2 / 3' }}>
          <motion.div
            onMouseEnter={() => setHoveredNode('wazuh')}
            onMouseLeave={() => setHoveredNode(null)}
            animate={{
              borderColor: activeStep === 4 || hoveredNode === 'wazuh' ? '#ea580c' : '#fdba74',
              boxShadow: activeStep === 4 || hoveredNode === 'wazuh'
                ? '0 6px 18px rgba(234, 88, 12, 0.25)'
                : '0 2px 6px rgba(0,0,0,0.02)'
            }}
            style={{
              background: activeStep === 4 || hoveredNode === 'wazuh' ? '#fff7ed' : '#ffffff',
              border: '1.5px solid #fdba74',
              borderRadius: '12px',
              padding: '0.6vw 0.8vw',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxSizing: 'border-box',
              transition: 'all 0.25s ease'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5vw', marginBottom: '0.4vw' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
                  color: '#ffffff',
                  borderRadius: '7px',
                  padding: '0.35vw',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Activity size={16} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.82vw', fontWeight: 900, color: '#ea580c' }}>
                    WAZUH SOC
                  </h4>
                  <span style={{ fontSize: '0.52vw', fontWeight: 800, color: '#9a3412' }}>
                    SUPERVISION &amp; CORRÉLATION
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.22vw' }}>
                {[
                  'Collecte & Centralisation (JSON)',
                  'Corrélation des événements',
                  'Détection des menaces',
                  'MITRE ATT&CK',
                  'Active Response (Reverse Shell)'
                ].map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35vw',
                    background: '#ffffff',
                    border: '1px solid #fed7aa',
                    borderRadius: '5px',
                    padding: '0.18vw 0.45vw',
                    fontSize: '0.62vw',
                    fontWeight: 700,
                    color: '#9a3412'
                  }}>
                    <Zap size={11} color="#ea580c" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* ROW 3: POLITIQUES & CLASIF. (CENTER) | ALERTES LOCALE (LEFT) | ACTIONS SOC (RIGHT) */}
        {/* ========================================================================= */}

        {/* LEFT BOTTOM: ALERTES & ACTIONS */}
        <div style={{ gridColumn: '1 / 2', gridRow: '3 / 4' }}>
          <motion.div
            onMouseEnter={() => setHoveredNode('alertes')}
            onMouseLeave={() => setHoveredNode(null)}
            animate={{
              borderColor: activeStep === 3 || hoveredNode === 'alertes' ? '#2563eb' : '#93c5fd',
              boxShadow: activeStep === 3 || hoveredNode === 'alertes'
                ? '0 6px 18px rgba(37, 99, 235, 0.25)'
                : '0 2px 6px rgba(0,0,0,0.02)'
            }}
            style={{
              background: activeStep === 3 || hoveredNode === 'alertes' ? '#eff6ff' : '#ffffff',
              border: '1.5px solid #93c5fd',
              borderRadius: '12px',
              padding: '0.5vw 0.8vw',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6vw',
              transition: 'all 0.25s ease'
            }}
          >
            <div style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              color: '#ffffff',
              borderRadius: '8px',
              padding: '0.4vw',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Bell size={18} />
            </div>

            <div>
              <h4 style={{ margin: 0, fontSize: '0.78vw', fontWeight: 900, color: '#1e40af' }}>
                ALERTES &amp; ACTIONS
              </h4>
              <p style={{ margin: '0.1vw 0 0 0', fontSize: '0.62vw', color: '#3b82f6', fontWeight: 700 }}>
                • Alertes • Blocage • Escalade D+1 • Investigation
              </p>
            </div>
          </motion.div>
        </div>

        {/* CENTER BOTTOM: POLITIQUES & CLASSIFICATION */}
        <div style={{ gridColumn: '2 / 3', gridRow: '3 / 4' }}>
          <motion.div
            onMouseEnter={() => setHoveredNode('policies')}
            onMouseLeave={() => setHoveredNode(null)}
            animate={{
              borderColor: activeStep === 3 || hoveredNode === 'policies' ? '#7c3aed' : '#c4b5fd',
              boxShadow: activeStep === 3 || hoveredNode === 'policies'
                ? '0 6px 18px rgba(124, 58, 237, 0.25)'
                : '0 2px 6px rgba(0,0,0,0.02)'
            }}
            style={{
              background: activeStep === 3 || hoveredNode === 'policies' ? '#f5f3ff' : '#ffffff',
              border: '1.5px solid #c4b5fd',
              borderRadius: '12px',
              padding: '0.5vw 0.8vw',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6vw',
              transition: 'all 0.25s ease'
            }}
          >
            <div style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
              color: '#ffffff',
              borderRadius: '8px',
              padding: '0.4vw',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <ShieldCheck size={18} />
            </div>

            <div>
              <h4 style={{ margin: 0, fontSize: '0.78vw', fontWeight: 900, color: '#6d28d9' }}>
                POLITIQUES &amp; CLASSIFICATION
              </h4>
              <p style={{ margin: '0.1vw 0 0 0', fontSize: '0.61vw', color: '#5b21b6', fontWeight: 700 }}>
                • Politiques DLP (Règles &amp; Seuils) • Classification (Public, Internal, Confidential, Secret) • Risk Scoring Engine
              </p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT BOTTOM: 3 SOC ACTION CARDS */}
        <div style={{ gridColumn: '3 / 4', gridRow: '3 / 4' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.35vw', height: '100%', alignItems: 'center' }}>
            <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '7px', padding: '0.35vw 0.2vw', textAlign: 'center', color: '#991b1b' }}>
              <div style={{ fontSize: '0.62vw', fontWeight: 900 }}>🔔 ALERTES</div>
              <div style={{ fontSize: '0.52vw', fontWeight: 700 }}>Notifications T.R.</div>
            </div>
            <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '7px', padding: '0.35vw 0.2vw', textAlign: 'center', color: '#991b1b' }}>
              <div style={{ fontSize: '0.62vw', fontWeight: 900 }}>✋ BLOCAGE</div>
              <div style={{ fontSize: '0.52vw', fontWeight: 700 }}>Prévention</div>
            </div>
            <div style={{ background: '#ffedd5', border: '1px solid #fed7aa', borderRadius: '7px', padding: '0.35vw 0.2vw', textAlign: 'center', color: '#9a3412' }}>
              <div style={{ fontSize: '0.62vw', fontWeight: 900 }}>👥 ESCALADE</div>
              <div style={{ fontSize: '0.52vw', fontWeight: 700 }}>Remédiation</div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ROW 4: VALIDATION OFFENSIVE (KALI LINUX) - BOTTOM RIGHT/CENTER           */}
        {/* ========================================================================= */}
        <div style={{ gridColumn: '2 / 4', gridRow: '4 / 5' }}>
          <motion.div
            onMouseEnter={() => setHoveredNode('offensive')}
            onMouseLeave={() => setHoveredNode(null)}
            animate={{
              borderColor: activeStep === 5 || hoveredNode === 'offensive' ? '#dc2626' : '#fca5a5',
              boxShadow: activeStep === 5 || hoveredNode === 'offensive'
                ? '0 6px 18px rgba(220, 38, 38, 0.25)'
                : '0 2px 6px rgba(0,0,0,0.02)'
            }}
            style={{
              background: activeStep === 5 || hoveredNode === 'offensive' ? '#fff1f1' : '#ffffff',
              border: '1.5px solid #fca5a5',
              borderRadius: '10px',
              padding: '0.45vw 0.8vw',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8vw',
              transition: 'all 0.25s ease'
            }}
          >
            <div style={{
              background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
              color: '#ffffff',
              borderRadius: '7px',
              padding: '0.4vw',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Flame size={18} />
            </div>

            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.54vw', fontWeight: 900, color: '#dc2626', textTransform: 'uppercase' }}>
                  VALIDATION &amp; AUDIT OFFENSIF
                </span>
                <h4 style={{ margin: 0, fontSize: '0.78vw', fontWeight: 900, color: '#991b1b' }}>
                  VALIDATION OFFENSIVE (Kali Linux)
                </h4>
              </div>

              <div style={{ fontSize: '0.62vw', fontWeight: 700, color: '#7f1d1d', background: '#fee2e2', borderRadius: '5px', padding: '0.15vw 0.5vw' }}>
                Scénarios d&apos;exfiltration : Email, SCP, USB, Cloud, Reverse Shell
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Bottom Interactive Step Explanation Footer */}
      <div style={{
        marginTop: '0.4vw',
        background: '#f8fafc',
        border: '1px solid #cbd5e1',
        borderRadius: '8px',
        padding: '0.3vw 0.8vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4vw' }}>
          <span style={{
            background: '#00008f',
            color: '#ffffff',
            fontSize: '0.54vw',
            fontWeight: 900,
            borderRadius: '4px',
            padding: '0.08vw 0.4vw'
          }}>
            FLUX ACTIF
          </span>
          <span style={{ fontSize: '0.72vw', fontWeight: 800, color: '#0f172a' }}>
            {stepsData[activeStep - 1].title}
          </span>
        </div>

        <span style={{ fontSize: '0.68vw', fontWeight: 600, color: '#475569' }}>
          {stepsData[activeStep - 1].desc}
        </span>
      </div>

    </div>
  );
}
