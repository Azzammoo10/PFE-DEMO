'use client';

import { motion } from 'framer-motion';
import { Cloud, Database, ShareNetwork, Laptop } from '@phosphor-icons/react';
import { Shell } from '../Presentation';
import type { SlideProps } from '../Presentation';

export default function ContextPiliers({ n }: SlideProps) {
  const pillars = [
    {
      title: 'CLOUD',
      icon: Cloud,
      points: [
        'Protection données SaaS',
        'Stockages (OneDrive, SharePoint)',
        'Contrôle partages externes',
        'Gestion conformité cloud',
      ],
    },
    {
      title: 'DONNÉES',
      icon: Database,
      points: [
        'Classification automatique',
        'Inspection PII et données fi.',
        'Politiques de rétention',
        'Destruction sécurisée',
      ],
    },
    {
      title: 'RÉSEAU',
      icon: ShareNetwork,
      points: [
        'Surveillance trafic web',
        'Transferts sécurisés (SFTP)',
        'Inspection emails (SMTP)',
        'Blocage & alertes flux reseau',
      ],
    },
    {
      title: 'DEVICES',
      icon: Laptop,
      points: [
        'Contrôle périphériques (USB)',
        'Surveillance disques externes',
        'Transferts hors ligne',
        'Chiffrement forcé supports',
      ],
    },
  ];

  return (
    <Shell section="CONTEXTE" pulseLabel="Piliers DLP" title="Les 4 Piliers Structuraux DLP" n={n} dense>
      {/* Inline styles for custom continuous flow & slow, calm glow transitions on circular icon badges */}
      <style>{`
        @keyframes flowBeam {
          0% { left: -30%; }
          100% { left: 100%; }
        }
        @keyframes glowPillar0 {
          0%, 25%, 100% { 
            transform: scale(1); 
            border-color: #cbd6e7; 
            color: #64748b; 
            background: rgba(0, 0, 143, 0.03); 
            box-shadow: 0 4px 10px rgba(0,0,0,0.01); 
          }
          5%, 18% { 
            transform: scale(1.08); 
            border-color: #00008f; 
            color: #00008f; 
            background: rgba(0, 0, 143, 0.08); 
            box-shadow: 0 0 14px rgba(0, 0, 143, 0.3); 
          }
        }
        @keyframes glowPillar1 {
          0%, 25%, 50%, 100% { 
            transform: scale(1); 
            border-color: #cbd6e7; 
            color: #64748b; 
            background: rgba(0, 0, 143, 0.03); 
            box-shadow: 0 4px 10px rgba(0,0,0,0.01); 
          }
          30%, 43% { 
            transform: scale(1.08); 
            border-color: #00008f; 
            color: #00008f; 
            background: rgba(0, 0, 143, 0.08); 
            box-shadow: 0 0 14px rgba(0, 0, 143, 0.3); 
          }
        }
        @keyframes glowPillar2 {
          0%, 50%, 75%, 100% { 
            transform: scale(1); 
            border-color: #cbd6e7; 
            color: #64748b; 
            background: rgba(0, 0, 143, 0.03); 
            box-shadow: 0 4px 10px rgba(0,0,0,0.01); 
          }
          55%, 68% { 
            transform: scale(1.08); 
            border-color: #00008f; 
            color: #00008f; 
            background: rgba(0, 0, 143, 0.08); 
            box-shadow: 0 0 14px rgba(0, 0, 143, 0.3); 
          }
        }
        @keyframes glowPillar3 {
          0%, 75%, 100% { 
            transform: scale(1); 
            border-color: #cbd6e7; 
            color: #64748b; 
            background: rgba(0, 0, 143, 0.03); 
            box-shadow: 0 4px 10px rgba(0,0,0,0.01); 
          }
          80%, 93% { 
            transform: scale(1.08); 
            border-color: #00008f; 
            color: #00008f; 
            background: rgba(0, 0, 143, 0.08); 
            box-shadow: 0 0 14px rgba(0, 0, 143, 0.3); 
          }
        }
        .glow-0 { animation: glowPillar0 8s infinite ease-in-out; }
        .glow-1 { animation: glowPillar1 8s infinite ease-in-out; }
        .glow-2 { animation: glowPillar2 8s infinite ease-in-out; }
        .glow-3 { animation: glowPillar3 8s infinite ease-in-out; }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6vw', height: '100%', justifyContent: 'center', padding: '0.5vw 0' }}>
        
        {/* Title reveal & Supporting sentence */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2vw', marginBottom: '0.2vw' }}>
          <div style={{ overflow: 'hidden', height: '2.2vw' }}>
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <h3 style={{ margin: 0, fontSize: '1.3vw', fontWeight: 800, color: '#00008f' }}>
                Piliers de DLP :
              </h3>
            </motion.div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            style={{ margin: 0, fontSize: '0.8vw', color: '#64748b', fontWeight: 600, letterSpacing: '0.01em' }}
          >
            Une approche multicouche pour une protection complète des données
          </motion.p>
        </div>

        {/* Horizontal Connector Flow System */}
        <div style={{ position: 'relative', width: '100%', height: '1.6vw', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0.2vw 0' }}>
          
          {/* Static gray connection line background */}
          <div style={{
            position: 'absolute',
            left: '12.5%',
            right: '12.5%',
            height: '2px',
            background: '#cbd6e7',
            opacity: 0.8,
            zIndex: 1
          }} />

          {/* Flowing Conduction Beam overlay */}
          <div style={{
            position: 'absolute',
            left: '12.5%',
            right: '12.5%',
            height: '2px',
            zIndex: 2,
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              width: '30%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, #00008f, transparent)',
              filter: 'drop-shadow(0 0 2px #00008f)',
              animation: 'flowBeam 8s infinite ease-in-out'
            }} />
          </div>

          {/* Connection node dots & vertical dashed lines */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.8vw', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
            {pillars.map((p, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', position: 'relative' }}>
                {/* Node dot */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.25 + idx * 0.08 }}
                  style={{
                    width: '0.6vw',
                    height: '0.6vw',
                    borderRadius: '50%',
                    background: '#64748b',
                    border: '2px solid #fff',
                    zIndex: 3,
                    boxShadow: '0 2px 5px rgba(0,0,143,0.15)'
                  }}
                />
                {/* Vertical connecting dash line down */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  bottom: 0,
                  width: '0',
                  borderLeft: '2px dashed #cbd6e7',
                  zIndex: 1
                }} />
              </div>
            ))}
          </div>
        </div>

        {/* Pillars Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.8vw', width: '100%', alignItems: 'stretch' }}>
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            const delayBase = idx * 0.1 + 0.35; // 100ms staggered delay starting after connection line

            return (
              <div 
                key={p.title} 
                style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center' }}
              >
                {/* Column Top Circular Icon Badge: Draws in first & carries the custom glow class */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: delayBase, type: 'spring', stiffness: 140 }}
                  className={`glow-${idx}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '5.0vw',
                    height: '5.0vw',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 143, 0.03)',
                    border: '2px solid #cbd6e7',
                    color: '#64748b',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.01)',
                    transition: 'all 0.3s ease',
                    marginBottom: '0.3vw',
                    zIndex: 2,
                    transformOrigin: 'center'
                  }}
                >
                  <Icon size={36} weight="duotone" />
                </motion.div>

                {/* Column Body Card: Slides up after column top icon draws */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: delayBase + 0.4, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, scale: 1.02, boxShadow: '0 12px 28px rgba(0,0,143,0.08)' }}
                  style={{
                    background: '#fff',
                    border: '1px solid #cbd6e7',
                    borderRadius: '14px',
                    padding: '0.8vw 0.7vw',
                    boxShadow: '0 4px 10px rgba(7,27,63,0.01)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5vw',
                    height: '100%',
                    width: '100%',
                    position: 'relative',
                    cursor: 'pointer',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Card Title (Clean layout without duplicate icon inside) */}
                  <div style={{ display: 'flex', justifyContent: 'center', borderBottom: '1px solid #edf2f7', paddingBottom: '0.4vw' }}>
                    <strong style={{ fontSize: '0.75vw', color: '#1e293b', fontWeight: 800, letterSpacing: '0.03em', textAlign: 'center' }}>
                      {p.title}
                    </strong>
                  </div>

                  {/* Bullet Points */}
                  <ul style={{
                    margin: 0,
                    paddingLeft: '0.8vw',
                    fontSize: '0.65vw',
                    color: '#475569',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35vw',
                    lineHeight: '1.3',
                    fontWeight: 500
                  }}>
                    {p.points.map((pt, index) => (
                      <li key={index} style={{
                        listStyleType: 'square',
                        color: '#475569',
                        fontWeight: 500
                      }}>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </Shell>
  );
}
