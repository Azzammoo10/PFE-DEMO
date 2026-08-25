'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Search,
  Sliders,
  Cpu,
  Lock,
  CheckCircle2,
  ArrowRight,
  FileText,
  FileSpreadsheet,
  Presentation as PPTIcon,
  FileType,
  Mail,
  CreditCard,
  UserSquare2,
  Database,
  Layers
} from 'lucide-react';

export default function LabelGuardSchema() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  // Sequence animation from start to end (0: User to 5: Verification). Stops at step 5 when finished.
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => {
        if (prev >= 5) {
          clearInterval(interval);
          return 5;
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
      title: 'SÉLECTION',
      subtitle: 'Type de Donnée',
      badge: 'Données Synthétiques',
      icon: Search,
      color: '#1e3a8a',
      bgLight: '#f8fafc',
      borderColor: '#cbd5e1',
      desc: 'Choix de la donnée sensible à tester sans exposition réelle.',
      items: [
        { label: 'IBAN', icon: CreditCard },
        { label: 'Credit Card', icon: CreditCard },
        { label: 'EU Debit Card', icon: CreditCard },
        { label: 'SWIFT Code', icon: Database },
        { label: 'ABA Routing', icon: Database }
      ],
      footer: 'Saisie et Filtrage'
    },
    {
      id: 2,
      num: '02',
      title: 'CONFIGURATION',
      subtitle: 'Niveau & Langues',
      badge: 'Paramétrage Test',
      icon: Sliders,
      color: '#1e3a8a',
      bgLight: '#f8fafc',
      borderColor: '#cbd5e1',
      desc: 'Définition du niveau de sensibilité, des occurrences et de la langue.',
      items: [
        { label: 'Confidentiel (X occurrences)', icon: Lock, color: '#d97706', isOccurence: true },
        { label: 'Secret (X occurrences)', icon: Lock, color: '#dc2626', isOccurence: true },
        { label: 'Langues : FR & ENG', icon: FileType, color: '#0b66d5' }
      ],
      footer: 'Génération Données'
    },
    {
      id: 3,
      num: '03',
      title: 'GÉNÉRATION',
      subtitle: 'Moteur LabelGuard',
      badge: 'Traitement Algorithmique',
      icon: Cpu,
      color: '#1e3a8a',
      bgLight: '#f8fafc',
      borderColor: '#cbd5e1',
      desc: 'Production automatique du document prêt à l\'emploi.',
      items: [
        { label: 'Word (.docx)', icon: FileText, color: '#1d4ed8' },
        { label: 'Excel (.xlsx)', icon: FileSpreadsheet, color: '#15803d' },
        { label: 'PowerPoint (.pptx)', icon: PPTIcon, color: '#b91c1c' },
        { label: 'Fichiers Texte (.txt, .csv)', icon: FileType, color: '#475569' }
      ],
      footer: 'Fichiers Générés'
    },
    {
      id: 4,
      num: '04',
      title: 'TEST / INJECTION',
      subtitle: 'Clients AXA & Équipe Test',
      badge: 'Environnement Microsoft 365',
      icon: Lock,
      color: '#1e3a8a',
      bgLight: '#f8fafc',
      borderColor: '#cbd5e1',
      desc: 'Injection des fichiers de test dans l écosystème M365 par l équipe de recette et clients AXA.',
      items: [
        { label: 'OneDrive & SharePoint', icon: Database },
        { label: 'Word, Excel & Outlook', icon: FileText },
        { label: 'Exchange Mail & Teams', icon: Mail }
      ],
      footer: 'Dépôt & Diffusion M365'
    },
    {
      id: 5,
      num: '05',
      title: 'VÉRIFICATION',
      subtitle: 'Analyse et Rapports',
      badge: 'Résultat DLP',
      icon: CheckCircle2,
      color: '#059669',
      bgLight: '#ecfdf5',
      borderColor: '#6ee7b7',
      desc: 'Validation de la détection DLP et conformité Purview.',
      items: [
        { label: 'Passed / Failed', isStatus: true },
        { label: 'ID Test Unique' },
        { label: 'Timestamp & Export PDF' }
      ],
      footer: 'Contrôle & Preuves'
    }
  ];

  const isAnimationFinished = activeStepIndex === 5;

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
      {/* Main Diagram Area with Actor + 5 Steps */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '0.75fr 0.15fr 1fr 0.15fr 1fr 0.15fr 1fr 0.15fr 1fr 0.15fr 1fr',
        alignItems: 'center',
        width: '100%',
        flex: 1,
        gap: '0.25vw',
        padding: '0.2vw 0'
      }}>
        
        {/* ACTOR NODE: UTILISATEUR */}
        <motion.div
          animate={{
            y: activeStepIndex === 0 ? -3 : 0,
            scale: activeStepIndex === 0 ? 1.02 : 0.98,
            boxShadow: activeStepIndex === 0
              ? '0 8px 20px -2px rgba(59, 130, 246, 0.25)'
              : '0 2px 4px rgba(0, 0, 0, 0.02)',
            opacity: (isAnimationFinished || activeStepIndex === 0) ? 1 : 0.75
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            background: activeStepIndex === 0 ? '#f8fafc' : '#ffffff',
            borderLeft: activeStepIndex === 0 ? '2px solid #3b82f6' : '1.5px solid #cbd5e1',
            borderRight: activeStepIndex === 0 ? '2px solid #3b82f6' : '1.5px solid #cbd5e1',
            borderBottom: activeStepIndex === 0 ? '2px solid #3b82f6' : '1.5px solid #cbd5e1',
            borderTop: '4px solid #1e3a8a',
            borderRadius: '10px',
            padding: '0.6vw 0.5vw',
            color: '#0f172a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            height: '96%',
            boxSizing: 'border-box'
          }}
        >
          <div style={{
            width: '2.6vw',
            height: '2.6vw',
            borderRadius: '50%',
            background: '#f1f5f9',
            borderLeft: '1.5px solid #cbd5e1',
            borderRight: '1.5px solid #cbd5e1',
            borderTop: '1.5px solid #cbd5e1',
            borderBottom: '1.5px solid #cbd5e1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.4vw'
          }}>
            <User style={{ width: '1.5vw', height: '1.5vw', color: '#1e3a8a' }} />
          </div>
          <span style={{ fontSize: '0.85vw', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#0f172a' }}>
            UTILISATEUR
          </span>
          <span style={{ fontSize: '0.7vw', fontWeight: 700, color: '#475569', marginTop: '0.15vw' }}>
            Analyste DLP / RSI
          </span>
          <div style={{
            marginTop: '0.6vw',
            background: '#f1f5f9',
            borderLeft: '1px solid #cbd5e1',
            borderRight: '1px solid #cbd5e1',
            borderTop: '1px solid #cbd5e1',
            borderBottom: '1px solid #cbd5e1',
            borderRadius: '5px',
            padding: '0.25vw 0.5vw',
            fontSize: '0.68vw',
            fontWeight: 800,
            color: '#1e3a8a'
          }}>
            Initiateur Test
          </div>
        </motion.div>

        {/* ARROW 0: USER -> STEP 1 */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <motion.div
            animate={{
              x: (!isAnimationFinished && activeStepIndex === 0) ? [0, 4, 0] : 0,
              scale: activeStepIndex === 0 ? 1.2 : 1,
              opacity: (isAnimationFinished || activeStepIndex === 0) ? 1 : 0.5
            }}
            transition={{ repeat: (!isAnimationFinished && activeStepIndex === 0) ? Infinity : 0, duration: 1 }}
          >
            <ArrowRight style={{ width: '1.1vw', height: '1.1vw', color: (isAnimationFinished || activeStepIndex === 0) ? '#3b82f6' : '#94a3b8' }} />
          </motion.div>
        </div>

        {/* STEP 1 TO STEP 5 CARDS */}
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          const isHovered = hoveredStep === step.id;
          const isActiveSequence = activeStepIndex === index + 1 || isHovered;
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
                  padding: '0.55vw 0.55vw',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '96%',
                  boxSizing: 'border-box'
                }}
              >
                {/* Header */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25vw' }}>
                    <span style={{
                      background: step.color,
                      color: '#ffffff',
                      borderRadius: '4px',
                      padding: '0.15vw 0.45vw',
                      fontSize: '0.72vw',
                      fontWeight: 900
                    }}>
                      {step.num}
                    </span>
                    <IconComponent style={{ width: '1.2vw', height: '1.2vw', color: step.color }} />
                  </div>

                  <h3 style={{ margin: 0, fontSize: '0.88vw', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.01em' }}>
                    {step.title}
                  </h3>
                  <p style={{ margin: '0.1vw 0 0.25vw 0', fontSize: '0.72vw', fontWeight: 700, color: '#475569' }}>
                    {step.subtitle}
                  </p>

                  <p style={{
                    margin: '0.25vw 0 0.35vw 0',
                    fontSize: '0.66vw',
                    fontWeight: 600,
                    color: '#334155',
                    lineHeight: 1.3,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {step.desc}
                  </p>
                </div>

                {/* Body Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.28vw' }}>
                  {step.items.map((item, idx) => {
                    const ItemIcon = 'icon' in item ? item.icon : null;
                    const isStatus = 'isStatus' in item && Boolean((item as Record<string, unknown>).isStatus);
                    const isOccurence = 'isOccurence' in item && Boolean((item as Record<string, unknown>).isOccurence);
                    const itemColor = 'color' in item ? ((item as Record<string, unknown>).color as string) : undefined;

                    return (
                      <motion.div
                        key={idx}
                        animate={isOccurence && isActiveSequence ? { scale: [1, 1.04, 1] } : {}}
                        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut', delay: idx * 0.3 }}
                        style={{
                          background: isStatus ? '#dcfce7' : isOccurence ? (itemColor === '#dc2626' ? '#fef2f2' : '#fffbeb') : '#f8fafc',
                          borderLeft: isStatus ? '1.5px solid #86efac' : isOccurence ? `1.5px solid ${itemColor}` : '1px solid #cbd5e1',
                          borderRight: isStatus ? '1.5px solid #86efac' : isOccurence ? `1.5px solid ${itemColor}` : '1px solid #cbd5e1',
                          borderTop: isStatus ? '1.5px solid #86efac' : isOccurence ? `1.5px solid ${itemColor}` : '1px solid #cbd5e1',
                          borderBottom: isStatus ? '1.5px solid #86efac' : isOccurence ? `1.5px solid ${itemColor}` : '1px solid #cbd5e1',
                          borderRadius: '5px',
                          padding: '0.28vw 0.45vw',
                          fontSize: '0.68vw',
                          fontWeight: 800,
                          color: isStatus ? '#166534' : isOccurence ? itemColor : '#1e293b',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '0.3vw'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3vw', overflow: 'hidden' }}>
                          {ItemIcon && <ItemIcon style={{ width: '0.9vw', height: '0.9vw', color: itemColor || step.color, flexShrink: 0 }} />}
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {item.label}
                          </span>
                        </div>

                        {isOccurence && isActiveSequence && (
                          <motion.span
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ repeat: Infinity, duration: 1.2 }}
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: itemColor,
                              boxShadow: `0 0 6px ${itemColor}`,
                              flexShrink: 0
                            }}
                          />
                        )}
                      </motion.div>
                    );
                  })}

                  {/* Animated Explanation Badge for 'Why We Use X' in Step 02 */}
                  {step.id === 2 && (
                    <motion.div
                      animate={isActiveSequence ? { scale: [0.98, 1.02, 0.98] } : {}}
                      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                      style={{
                        marginTop: '0.2vw',
                        background: '#fef2f2',
                        border: '1px dashed #dc2626',
                        borderRadius: '5px',
                        padding: '0.2vw 0.4vw',
                        fontSize: '0.58vw',
                        fontWeight: 800,
                        color: '#991b1b',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.25vw'
                      }}
                    >
                      <Lock style={{ width: '0.7vw', height: '0.7vw', color: '#dc2626' }} />
                      <span>Paramètre X : Occurrences anonymisées (Confidentialité AXA)</span>
                    </motion.div>
                  )}
                </div>

                {/* Footer Tag */}
                <div style={{
                  marginTop: '0.35vw',
                  background: step.bgLight,
                  borderLeft: `1px solid ${step.borderColor}`,
                  borderRight: `1px solid ${step.borderColor}`,
                  borderTop: `1px solid ${step.borderColor}`,
                  borderBottom: `1px solid ${step.borderColor}`,
                  borderRadius: '5px',
                  padding: '0.25vw 0.4vw',
                  textAlign: 'center',
                  fontSize: '0.7vw',
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
                      x: (!isAnimationFinished && activeStepIndex === index + 1) ? [0, 4, 0] : 0,
                      scale: activeStepIndex === index + 1 ? 1.2 : 1,
                      opacity: (isAnimationFinished || activeStepIndex === index + 1) ? 1 : 0.5
                    }}
                    transition={{ repeat: (!isAnimationFinished && activeStepIndex === index + 1) ? Infinity : 0, duration: 1 }}
                  >
                    <ArrowRight style={{ width: '1.1vw', height: '1.1vw', color: (isAnimationFinished || activeStepIndex === index + 1) ? '#3b82f6' : '#94a3b8' }} />
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
