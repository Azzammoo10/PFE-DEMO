'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Lock, 
  UserCheck, 
  ClipboardList, 
  Sliders, 
  FileCode, 
  Sparkles, 
  GitCompare, 
  ShieldCheck, 
  Database, 
  BarChart3, 
  Users, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export default function OneTrustSchema() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  // Sequence animation from start to end (0: Auth to 4: Persistence). Stops at step 4 when finished.
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => {
        if (prev >= 4) {
          clearInterval(interval);
          return 4;
        }
        return prev + 1;
      });
    }, 1300);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      id: 1,
      num: '01',
      title: 'AUTHENTIFICATION',
      subtitle: 'Accès Sécurisé',
      badge: 'SecAuth',
      icon: Lock,
      color: '#1e3a8a',
      bgLight: '#f8fafc',
      borderColor: '#cbd5e1',
      desc: 'Connexion sécurisée de l\'analyste avec identifiants.',
      items: [
        { label: 'Connexion SSO AXA', icon: Lock },
        { label: 'Profil Analyste DLP / RSI', icon: UserCheck }
      ],
      footer: 'Accès Sécurisé'
    },
    {
      id: 2,
      num: '02',
      title: 'SAISIE (INTAKE)',
      subtitle: 'Règles Brutes',
      badge: 'Intake Scope',
      icon: ClipboardList,
      color: '#1e3a8a',
      bgLight: '#f8fafc',
      borderColor: '#cbd5e1',
      desc: 'Sélection de l\'entité et collage du Rule Scope brut.',
      items: [
        { label: 'Sélection Entité AXA', icon: Sliders },
        { label: 'Exchange & Purview Rules', icon: FileCode }
      ],
      footer: 'Collecte Données'
    },
    {
      id: 3,
      num: '03',
      title: 'TRAITEMENT IA',
      subtitle: 'IA Locale (Ollama)',
      badge: 'Ollama LLM',
      icon: Sparkles,
      color: '#1e3a8a',
      bgLight: '#f8fafc',
      borderColor: '#cbd5e1',
      desc: 'Matching IA local des règles avec le référentiel CM11 sans fuite de données.',
      items: [
        { label: 'Analyse Sémantique Local', icon: Sparkles },
        { label: 'Suggestion: "Supprimable"', isWarning: true },
        { label: 'Suggestion: "À Maintenir"', isSuccess: true }
      ],
      footer: 'IA Locale (Ollama)'
    },
    {
      id: 4,
      num: '04',
      title: 'VALIDATION HUMAINE',
      subtitle: 'Human-in-the-Loop',
      badge: 'Review RSI',
      icon: GitCompare,
      color: '#1e3a8a',
      bgLight: '#f8fafc',
      borderColor: '#cbd5e1',
      desc: 'Examen de la justification IA et arbitrage obligatoire.',
      items: [
        { label: '✓ Valider Suggestion IA', isSuccess: true },
        { label: '⚙ Modifier (Override)', isOverride: true },
        { label: 'Exceptions Métier AXA', icon: ShieldCheck }
      ],
      footer: 'Contrôle Humain'
    },
    {
      id: 5,
      num: '05',
      title: 'PERSISTENCE et KPIs',
      subtitle: 'Registre et Reporting',
      badge: 'Audit Trail',
      icon: Database,
      color: '#059669',
      bgLight: '#ecfdf5',
      borderColor: '#6ee7b7',
      desc: 'Enregistrement de la décision et mise à jour des KPIs.',
      items: [
        { label: 'Décision Enregistrée', icon: CheckCircle2, isSuccess: true },
        { label: 'Dashboards et KPIs Métiers', icon: BarChart3 },
        { label: 'Export Managers et RSI', icon: Users }
      ],
      footer: 'Reporting Final'
    }
  ];

  const isAnimationFinished = activeStepIndex === 4;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
      borderLeft: '1.5px solid #cbd5e1',
      borderRight: '1.5px solid #cbd5e1',
      borderTop: '1.5px solid #cbd5e1',
      borderBottom: '1.5px solid #cbd5e1',
      borderRadius: '12px',
      padding: '0.6vw 0.8vw',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      {/* Main Diagram Area - 5 Columns Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 0.15fr 1fr 0.15fr 1fr 0.15fr 1fr 0.15fr 1fr',
        alignItems: 'center',
        width: '100%',
        flex: 1,
        gap: '0.25vw',
        padding: '0.2vw 0'
      }}>
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          const isHovered = hoveredStep === step.id;
          const isActiveSequence = activeStepIndex === index || isHovered;
          const isGreenStep = step.id === 5;

          return (
            <div key={step.id} style={{ display: 'contents' }}>
              {/* STEP CARD */}
              <motion.div
                onMouseEnter={() => setHoveredStep(step.id)}
                onMouseLeave={() => setHoveredStep(null)}
                animate={{
                  y: isActiveSequence ? -3 : 0,
                  scale: isActiveSequence ? 1.02 : 0.98,
                  boxShadow: isActiveSequence
                    ? (isGreenStep ? '0 10px 24px rgba(16, 185, 129, 0.35)' : '0 8px 20px -2px rgba(59, 130, 246, 0.25)')
                    : '0 2px 4px rgba(0, 0, 0, 0.02)',
                  opacity: (isAnimationFinished || isActiveSequence) ? 1 : 0.75
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{
                  background: isActiveSequence ? (isGreenStep ? '#f0fdf4' : '#f8fafc') : '#ffffff',
                  borderLeft: isActiveSequence ? (isGreenStep ? '2px solid #059669' : '2px solid #3b82f6') : '1.5px solid #cbd5e1',
                  borderRight: isActiveSequence ? (isGreenStep ? '2px solid #059669' : '2px solid #3b82f6') : '1.5px solid #cbd5e1',
                  borderBottom: isActiveSequence ? (isGreenStep ? '2px solid #059669' : '2px solid #3b82f6') : '1.5px solid #cbd5e1',
                  borderTop: `4px solid ${step.color}`,
                  borderRadius: '10px',
                  padding: '0.6vw 0.55vw',
                  height: '96%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxSizing: 'border-box'
                }}
              >
                {/* Card Header */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3vw' }}>
                    <span style={{
                      background: step.color,
                      color: '#ffffff',
                      borderRadius: '4px',
                      padding: '0.15vw 0.45vw',
                      fontSize: '0.75vw',
                      fontWeight: 900
                    }}>
                      {step.num}
                    </span>
                    <IconComponent style={{ width: '1.2vw', height: '1.2vw', color: step.color }} />
                  </div>

                  <h3 style={{ margin: 0, fontSize: '0.9vw', fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                    {step.title}
                  </h3>
                  <p style={{ margin: '0.1vw 0 0.35vw 0', fontSize: '0.74vw', fontWeight: 700, color: '#475569' }}>
                    {step.subtitle}
                  </p>
                </div>

                {/* Items List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45vw', flex: 1, justifyContent: 'center', padding: '0.2vw 0' }}>
                  {step.items.map((item, i) => {
                    const ItemIcon = 'icon' in item ? item.icon : null;
                    const isSuccess = 'isSuccess' in item && Boolean((item as Record<string, unknown>).isSuccess);
                    const isWarning = 'isWarning' in item && Boolean((item as Record<string, unknown>).isWarning);
                    const isOverride = 'isOverride' in item && Boolean((item as Record<string, unknown>).isOverride);

                    let bgColor = '#f8fafc';
                    let borderColor = '#cbd5e1';
                    let textColor = '#1e293b';

                    if (isSuccess) {
                      bgColor = '#dcfce7';
                      borderColor = '#86efac';
                      textColor = '#166534';
                    } else if (isWarning) {
                      bgColor = '#fef2f2';
                      borderColor = '#fca5a5';
                      textColor = '#991b1b';
                    } else if (isOverride) {
                      bgColor = '#f0f7ff';
                      borderColor = '#bfdbfe';
                      textColor = '#1e40af';
                    }

                    return (
                      <div
                        key={i}
                        style={{
                          background: bgColor,
                          borderLeft: `1.5px solid ${borderColor}`,
                          borderRight: `1.5px solid ${borderColor}`,
                          borderTop: `1.5px solid ${borderColor}`,
                          borderBottom: `1.5px solid ${borderColor}`,
                          borderRadius: '6px',
                          padding: '0.4vw 0.6vw',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4vw',
                          fontSize: '0.75vw',
                          fontWeight: 800,
                          color: textColor
                        }}
                      >
                        {ItemIcon && <ItemIcon style={{ width: '1.0vw', height: '1.0vw', flexShrink: 0, color: step.color }} />}
                        <span>{item.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Card Footer Tag */}
                <div style={{
                  background: step.bgLight,
                  borderLeft: `1px solid ${step.borderColor}`,
                  borderRight: `1px solid ${step.borderColor}`,
                  borderTop: `1px solid ${step.borderColor}`,
                  borderBottom: `1px solid ${step.borderColor}`,
                  borderRadius: '5px',
                  padding: '0.25vw 0.4vw',
                  textAlign: 'center',
                  fontSize: '0.72vw',
                  fontWeight: 800,
                  color: step.color
                }}>
                  {step.footer}
                </div>
              </motion.div>

              {/* ARROW (IF NOT LAST STEP) */}
              {index < steps.length - 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <motion.div
                    animate={{
                      x: (!isAnimationFinished && activeStepIndex === index) ? [0, 4, 0] : 0,
                      scale: activeStepIndex === index ? 1.2 : 1,
                      opacity: (isAnimationFinished || activeStepIndex === index) ? 1 : 0.5
                    }}
                    transition={{ repeat: (!isAnimationFinished && activeStepIndex === index) ? Infinity : 0, duration: 1 }}
                  >
                    <ArrowRight style={{ width: '1.1vw', height: '1.1vw', color: (isAnimationFinished || activeStepIndex === index) ? '#3b82f6' : '#94a3b8' }} />
                  </motion.div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
