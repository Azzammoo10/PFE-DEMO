'use client';

import { Shield, Eye, AlertCircle, FileText, Search, Laptop } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSyncExternalStore } from 'react';
import { Shell, popIn, draw } from '../Presentation';
import type { SlideProps } from '../Presentation';

const emptySubscribe = () => () => { };

export default function ContextDLP({ n }: SlideProps) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const callouts = [
    {
      text: "Empêche les données sensibles de quitter votre contrôle",
      icon: Shield,
      color: '#00008f',
      bgColor: 'rgba(0, 0, 143, 0.04)',
      slideDir: -30,
      cardDelay: 0.7,
      arrowDelay: 3 // custom index for left arrow drawing
    },
    {
      text: "Détecter et protéger les données sur tous les canaux et appareils",
      icon: Laptop,
      color: '#00008f',
      bgColor: 'rgba(0, 0, 143, 0.04)',
      slideDir: 30,
      cardDelay: 1.2,
      arrowDelay: 9 // custom index for right arrow drawing
    },
  ];

  const stages = [
    {
      id: 'surveiller',
      title: 'Surveiller',
      desc: 'Flux en temps réel',
      icon: Eye,
      gridArea: '1 / 1 / 2 / 2',
      cardDelay: 1.6,
      pathDelay: 21, // Custom index for draw variant
      showPath: true,
      pathD: "M 90,45 Q 150,25 210,45"
    },
    {
      id: 'detecter',
      title: 'Détecter',
      desc: 'Classification active',
      icon: Search,
      gridArea: '1 / 3 / 2 / 4',
      cardDelay: 2.1,
      pathDelay: 26,
      showPath: true,
      pathD: "M 230,85 Q 245,120 230,155"
    },
    {
      id: 'repondre',
      title: 'Répondre',
      desc: 'Blocage et alertes',
      icon: AlertCircle,
      gridArea: '3 / 3 / 4 / 4',
      cardDelay: 2.6,
      pathDelay: 31,
      showPath: true,
      pathD: "M 210,195 Q 150,215 90,195"
    },
    {
      id: 'analyser',
      title: 'Analyser',
      desc: 'Rapports et audit',
      icon: FileText,
      gridArea: '3 / 1 / 4 / 2',
      cardDelay: 3.1,
      pathDelay: 36,
      showPath: true,
      pathD: "M 70,155 Q 55,120 70,85"
    },
  ];

  // Reveal variants for title
  const titleVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
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
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2vw',
        height: '100%',
        justifyContent: 'space-between',
        padding: '0 1vw',
        overflow: 'hidden'
      }}>

        {/* Subtitle with sequential highlight */}
        <div style={{ overflow: 'hidden', textAlign: 'center', height: '2.5vw' }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={titleVariants}
          >
            <h3 style={{ margin: 0, fontSize: '1.5vw', fontWeight: 500, color: '#1e293b' }}>
              La{' '}
              <motion.span
                animate={{ color: ['#1e293b', '#00008f'] }}
                transition={{ delay: 0.5, duration: 0.4 }}
                style={{ fontWeight: 900 }}
              >
                Prévention
              </motion.span>{' '}
              des{' '}
              <motion.span
                animate={{ color: ['#1e293b', '#00008f'] }}
                transition={{ delay: 0.5, duration: 0.4 }}
                style={{ fontWeight: 900 }}
              >
                Pertes de données
              </motion.span>{' '}
              (DLP)
            </h3>
          </motion.div>
        </div>

        {/* Callouts Row with drawing arrows pointing directly to the subtitle words */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2vw', width: '92%', margin: '0 auto', position: 'relative' }}>

          <svg
            style={{
              position: 'absolute',
              top: '-3.1vw', // Adjusted to span exactly from cards to the subtitle words
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
                <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#00008f" />
              </marker>
            </defs>

            {/* Left curved arrow pointing to "Prévention" (centered around 37% x) */}
            <motion.path
              d="M 25,100 C 25,20 37,20 37,5"
              fill="none"
              stroke="#00008f"
              strokeWidth="0.3"
              strokeDasharray="2.5 2.5"
              markerEnd="url(#subtitle-arrow)"
              variants={draw}
              custom={3}
              initial="hidden"
              animate="visible"
            />

            {/* Right curved arrow pointing to "Pertes de données" (centered around 63% x) */}
            <motion.path
              d="M 75,100 C 75,20 63,20 63,5"
              fill="none"
              stroke="#00008f"
              strokeWidth="0.3"
              strokeDasharray="2.5 2.5"
              markerEnd="url(#subtitle-arrow)"
              variants={draw}
              custom={9}
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
                transition={{ duration: 0.6, delay: item.cardDelay, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: item.bgColor,
                  border: `1.5px solid ${item.color}33`,
                  borderRadius: '12px',
                  padding: '0.9vw 1.3vw',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1vw',
                  boxShadow: '0 4px 12px rgba(0,0,143,0.02)',
                  position: 'relative',
                }}
              >
                <div style={{
                  background: '#fff',
                  borderRadius: '50%',
                  width: '2.2vw',
                  height: '2.2vw',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: item.color,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                  flexShrink: 0
                }}>
                  <Icon size={18} />
                </div>
                <p style={{ margin: 0, fontSize: '0.9vw', color: '#1e293b', fontWeight: 600, lineHeight: 1.35 }}>
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Central Cycle Diagram (Scaled up and vertically distributed) */}
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
          {/* SVG overlay line cycles with flowing marching ants animation */}
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
                <path d="M 0 2 L 8 5 L 0 8 z" fill="#00008f" />
              </marker>
            </defs>

            {/* Clockwise cycle flowing paths */}
            {stages.map((stage) => (
              <motion.path
                key={`path-${stage.id}`}
                d={stage.pathD}
                fill="none"
                stroke="#00008f"
                strokeWidth="2.5"
                strokeDasharray="5,5"
                markerEnd="url(#arrow)"
                variants={draw}
                custom={stage.pathDelay}
                initial="hidden"
                animate="visible"
                style={{ strokeDashoffset: -20 }}
              />
            ))}

            {/* Glowing dot traveling once around the loop at the end of the sequence */}
            <motion.circle
              r="4.5"
              fill="#00008f"
              style={{ filter: 'drop-shadow(0 0 6px #00008f)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{
                delay: 3.4,
                duration: 3,
                times: [0, 0.05, 0.95, 1],
                ease: 'easeInOut'
              }}
            >
              <animateMotion
                dur="3s"
                begin="3.4s"
                repeatCount="1"
                path="M 90,45 Q 150,25 210,45 Q 245,120 230,155 Q 150,215 90,195 Q 55,120 70,85 Z"
              />
            </motion.circle>
          </svg>

          {/* Central DLP Badge */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2, type: 'spring', stiffness: 180, damping: 12 }}
            style={{
              gridArea: '2 / 2 / 3 / 3',
              zIndex: 5,
              background: '#00008f',
              color: '#fff',
              width: '7vw',
              height: '7vw',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '1.6vw',
              boxShadow: '0 8px 24px rgba(0,0,143,0.3)',
              margin: '0 auto',
              border: '4px solid #fff'
            }}
          >
            DLP
          </motion.div>

          {/* Outer Cards */}
          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.id}
                variants={popIn}
                custom={Math.floor(stage.cardDelay * 20)}
                initial="hidden"
                animate="visible"
                style={{
                  gridArea: stage.gridArea,
                  zIndex: 10,
                  background: '#fff',
                  border: '1.5px solid #cbd6e7',
                  borderRadius: '12px',
                  padding: '0.8vw 1.1vw',
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(7,27,63,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.3vw',
                  width: '10.5vw',
                  height: '6.5vw',
                  justifyContent: 'center'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4vw', color: '#00008f' }}>
                  <Icon size={16} strokeWidth={2.5} />
                  <strong style={{ fontSize: '1.1vw', color: '#102240', fontWeight: 800 }}>
                    {stage.title}
                  </strong>
                </div>
                <span style={{ fontSize: '0.85vw', color: '#64748b', fontWeight: 500 }}>
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
