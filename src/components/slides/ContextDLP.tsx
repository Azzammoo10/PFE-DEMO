'use client';

import { Shield, Eye, AlertCircle, FileText, Search, Laptop } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { useSyncExternalStore } from 'react';
import { Shell, draw } from '../Presentation';
import type { SlideProps } from '../Presentation';

const emptySubscribe = () => () => { };
const INITIAL_DELAY = 0.02; // Instant render without waiting

// Variants pour les 4 étapes du schéma (01 -> 02 -> 03 -> 04)
const stageCardVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 10, filter: 'blur(2px)' },
  visible: (idx: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: INITIAL_DELAY + 0.12 + idx * 0.05, // Fast instant stagger: 0.14s, 0.19s, 0.24s, 0.29s
      duration: 0.3,
      type: 'spring',
      stiffness: 180,
      damping: 20
    }
  })
};

export default function ContextDLP({ n }: SlideProps) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Étape 2 : Phrases explicatives du haut
  const callouts = [
    {
      text: "Empêche les données sensibles de quitter votre contrôle",
      icon: Shield,
      color: '#00008f',
      bgColor: 'rgba(0, 0, 143, 0.04)',
      slideDir: -20,
      cardDelay: INITIAL_DELAY + 0.05,
    },
    {
      text: "Détecter et protéger les données sur tous les canaux et appareils",
      icon: Laptop,
      color: '#00008f',
      bgColor: 'rgba(0, 0, 143, 0.04)',
      slideDir: 20,
      cardDelay: INITIAL_DELAY + 0.08,
    },
  ];

  // Étape 3 : Les 4 phases du schéma DLP
  const stages = [
    {
      id: 'surveiller',
      stepNum: '01',
      badgeText: '01 • DÉPART',
      isStart: true,
      title: 'Surveiller',
      desc: 'Flux en temps réel',
      icon: Eye,
      gridArea: '1 / 1 / 2 / 2',
      pathD: "M 90,45 Q 150,25 210,45"
    },
    {
      id: 'detecter',
      stepNum: '02',
      badgeText: '02 • ÉTAPE 2',
      isStart: false,
      title: 'Détecter',
      desc: 'Classification active',
      icon: Search,
      gridArea: '1 / 3 / 2 / 4',
      pathD: "M 230,85 Q 245,120 230,155"
    },
    {
      id: 'repondre',
      stepNum: '03',
      badgeText: '03 • ÉTAPE 3',
      isStart: false,
      title: 'Répondre',
      desc: 'Blocage et alertes',
      icon: AlertCircle,
      gridArea: '3 / 3 / 4 / 4',
      pathD: "M 210,195 Q 150,215 90,195"
    },
    {
      id: 'analyser',
      stepNum: '04',
      badgeText: '04 • ÉTAPE 4',
      isStart: false,
      title: 'Analyser',
      desc: 'Rapports et audit',
      icon: FileText,
      gridArea: '3 / 1 / 4 / 2',
      pathD: "M 70,155 Q 55,120 70,85"
    },
  ];

  // Étape 1 : Titre Principal
  const titleVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { delay: INITIAL_DELAY, duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } // 1.15s
    }
  };

  if (!isMounted) {
    return <div className="p-6 text-slate-500">Chargement du cadre DLP...</div>;
  }

  return (
    <Shell
      section="CONTEXTE"
      pulseLabel="Cadre DLP"
      title="Cadre Conceptuel DLP"
      n={n}
      dense
      keywords={['Cycle Continu', 'Surveiller les Flux', 'Détection Contenu', 'Réponse Automatique', 'Analyse & Audit']}
    >
      {/* Animation continue de circulation lumineuse (démarre à t = 3.2s) */}
      <style>{`
        @keyframes stagePulse0 {
          0%, 14%, 90%, 100% { border-color: #0b66d5; box-shadow: 0 0 20px rgba(11,102,213,0.38); transform: scale(1.05); }
          22%, 82% { border-color: #cbd6e7; box-shadow: 0 4px 12px rgba(7,27,63,0.04); transform: scale(1); }
        }
        @keyframes stagePulse1 {
          0%, 15%, 40%, 100% { border-color: #cbd6e7; box-shadow: 0 4px 12px rgba(7,27,63,0.04); transform: scale(1); }
          22%, 33% { border-color: #0b66d5; box-shadow: 0 0 20px rgba(11,102,213,0.38); transform: scale(1.05); }
        }
        @keyframes stagePulse2 {
          0%, 40%, 65%, 100% { border-color: #cbd6e7; box-shadow: 0 4px 12px rgba(7,27,63,0.04); transform: scale(1); }
          47%, 58% { border-color: #0b66d5; box-shadow: 0 0 20px rgba(11,102,213,0.38); transform: scale(1.05); }
        }
        @keyframes stagePulse3 {
          0%, 65%, 90%, 100% { border-color: #cbd6e7; box-shadow: 0 4px 12px rgba(7,27,63,0.04); transform: scale(1); }
          72%, 83% { border-color: #0b66d5; box-shadow: 0 0 20px rgba(11,102,213,0.38); transform: scale(1.05); }
        }
        .stage-glow-0 { animation: stagePulse0 4s 0.4s infinite ease-in-out; }
        .stage-glow-1 { animation: stagePulse1 4s 0.4s infinite ease-in-out; }
        .stage-glow-2 { animation: stagePulse2 4s 0.4s infinite ease-in-out; }
        .stage-glow-3 { animation: stagePulse3 4s 0.4s infinite ease-in-out; }
      `}</style>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1vw',
        height: '100%',
        justifyContent: 'space-between',
        padding: '0 1vw',
        overflow: 'hidden'
      }}>

        {/* Étape 1 : Titre principal affiché EN PREMIER */}
        <div style={{ overflow: 'hidden', textAlign: 'center', height: '2.5vw' }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={titleVariants}
          >
            <h3 style={{ margin: 0, fontSize: '1.4vw', fontWeight: 500, color: '#1e293b' }}>
              La{' '}
              <motion.span
                animate={{ color: ['#1e293b', '#0b66d5'] }}
                transition={{ delay: INITIAL_DELAY + 0.2, duration: 0.4 }}
                style={{ fontWeight: 900 }}
              >
                Prévention
              </motion.span>{' '}
              des{' '}
              <motion.span
                animate={{ color: ['#1e293b', '#0b66d5'] }}
                transition={{ delay: INITIAL_DELAY + 0.2, duration: 0.4 }}
                style={{ fontWeight: 900 }}
              >
                Pertes de données
              </motion.span>{' '}
              (DLP)
            </h3>
          </motion.div>
        </div>

        {/* Étape 2 : Les 2 phrases explicatives du haut */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2vw', width: '92%', margin: '0 auto', position: 'relative' }}>

          <svg
            style={{
              position: 'absolute',
              top: '-3.1vw',
              left: 0,
              width: '100%',
              height: '3.1vw',
              overflow: 'visible',
              pointerEvents: 'none',
              zIndex: 2
            }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <marker
                id="subtitle-arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#0b66d5" />
              </marker>
            </defs>

            {/* Left curved arrow */}
            <motion.path
              d="M 25,100 C 25,20 37,20 37,5"
              fill="none"
              stroke="#0b66d5"
              strokeWidth="0.35"
              strokeDasharray="2.5 2.5"
              markerEnd="url(#subtitle-arrow)"
              variants={draw}
              custom={Math.floor((INITIAL_DELAY + 0.5) * 10)}
              initial="hidden"
              animate="visible"
            />

            {/* Right curved arrow */}
            <motion.path
              d="M 75,100 C 75,20 63,20 63,5"
              fill="none"
              stroke="#0b66d5"
              strokeWidth="0.35"
              strokeDasharray="2.5 2.5"
              markerEnd="url(#subtitle-arrow)"
              variants={draw}
              custom={Math.floor((INITIAL_DELAY + 0.7) * 10)}
              initial="hidden"
              animate="visible"
            />
          </svg>

          {callouts.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: item.slideDir }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: item.cardDelay, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  border: '1.5px solid rgba(11, 102, 213, 0.2)',
                  borderRadius: '12px',
                  padding: '0.8vw 1.2vw',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1vw',
                  boxShadow: '0 4px 12px rgba(11, 102, 213, 0.04)',
                  position: 'relative',
                }}
              >
                <div style={{
                  background: 'rgba(11, 102, 213, 0.08)',
                  borderRadius: '50%',
                  width: '2.2vw',
                  height: '2.2vw',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0b66d5',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                  flexShrink: 0
                }}>
                  <Icon size={18} />
                </div>
                <p style={{ margin: 0, fontSize: '0.88vw', color: '#1e293b', fontWeight: 600, lineHeight: 1.35 }}>
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Étape 3 : Schéma Central DLP & 4 Étapes Séquentielles */}
        <div style={{
          position: 'relative',
          width: '33vw',
          height: '24.5vw',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '11vw 11vw 11vw',
          gridTemplateRows: '6.8vw 10.9vw 6.8vw',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* SVG overlay lines */}
          <svg viewBox="0 0 300 240" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            pointerEvents: 'none'
          }}>
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 2 L 8 5 L 0 8 z" fill="#0b66d5" />
              </marker>
            </defs>

            {/* Clockwise cycle flowing paths */}
            {stages.map((stage, idx) => (
              <motion.path
                key={`path-${stage.id}`}
                d={stage.pathD}
                fill="none"
                stroke="#0b66d5"
                strokeWidth="2.5"
                strokeDasharray="5,5"
                markerEnd="url(#arrow)"
                variants={draw}
                custom={Math.floor((INITIAL_DELAY + 0.12 + idx * 0.05) * 10)}
                initial="hidden"
                animate="visible"
                style={{ strokeDashoffset: -20 }}
              />
            ))}

            {/* Point voyageur lumineux continu (démarre à t = 0.4s) */}
            <motion.circle
              r="5"
              fill="#0b66d5"
              style={{ filter: 'drop-shadow(0 0 8px #38bdf8)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <animateMotion
                dur="4s"
                begin="0.4s"
                repeatCount="indefinite"
                path="M 90,45 Q 150,25 210,45 Q 245,120 230,155 Q 150,215 90,195 Q 55,120 70,85 Z"
              />
            </motion.circle>
          </svg>

          {/* Badge Central DLP */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, delay: INITIAL_DELAY + 0.1, type: 'spring', stiffness: 200, damping: 16 }}
            style={{
              gridArea: '2 / 2 / 3 / 3',
              zIndex: 5,
              background: 'linear-gradient(135deg, #0b66d5 0%, #004494 100%)',
              color: '#fff',
              width: '7vw',
              height: '7vw',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '1.6vw',
              boxShadow: '0 8px 24px rgba(11, 102, 213, 0.35)',
              margin: '0 auto',
              border: '4px solid #fff'
            }}
          >
            DLP
          </motion.div>

          {/* Les 4 Cartes d'Étapes (01 Surveiller -> 02 Détecter -> 03 Répondre -> 04 Analyser) */}
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.id}
                custom={idx}
                initial="hidden"
                animate="visible"
                variants={stageCardVariant}
                whileHover={{ scale: 1.04, y: -3, boxShadow: '0 8px 20px rgba(11, 102, 213, 0.15)' }}
                className={`stage-glow-${idx}`}
                style={{
                  gridArea: stage.gridArea,
                  zIndex: 10,
                  background: '#ffffff',
                  border: '1.5px solid #cbd6e7',
                  borderRadius: '14px',
                  padding: '0.8vw 1vw',
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(7, 27, 63, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.25vw',
                  width: '10.8vw',
                  height: '6.6vw',
                  justifyContent: 'center',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease'
                }}
              >
                <span style={{
                  background: stage.isStart ? '#0b66d5' : 'rgba(11, 102, 213, 0.08)',
                  color: stage.isStart ? '#ffffff' : '#0b66d5',
                  fontSize: '0.62vw',
                  fontWeight: 900,
                  padding: '0.12vw 0.45vw',
                  borderRadius: '6px',
                  letterSpacing: '0.04em',
                  marginBottom: '0.15vw'
                }}>
                  {stage.badgeText}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4vw', color: '#0b66d5' }}>
                  <Icon size={17} strokeWidth={2.5} />
                  <strong style={{ fontSize: '1vw', color: '#0f172a', fontWeight: 800 }}>
                    {stage.title}
                  </strong>
                </div>
                <span style={{ fontSize: '0.78vw', color: '#64748b', fontWeight: 600 }}>
                  {stage.desc}
                </span>
              </motion.div>
            );
          })}
        </div>

      </div>
    </Shell>
  );
}
