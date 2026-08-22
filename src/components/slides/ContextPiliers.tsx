'use client';

import { motion, type Variants } from 'framer-motion';
import { Cloud, Database, ShareNetwork, Laptop, CheckCircle } from '@phosphor-icons/react';
import { Shell } from '../Presentation';
import type { SlideProps } from '../Presentation';

const INITIAL_DELAY = 1.15; // Attendre la fin de l'overlay "CONTEXTE" (1.15s)

// Animation progressive des 4 cartes piliers
const pillarCardVariant: Variants = {
  hidden: { opacity: 0, y: 25, scale: 0.95, filter: 'blur(4px)' },
  visible: (idx: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      delay: INITIAL_DELAY + idx * 0.15,
      duration: 0.5,
      type: 'spring',
      stiffness: 140,
      damping: 18
    }
  })
};

// Animation séquentielle pour chaque point à l'intérieur des cartes
const pointVariant: Variants = {
  hidden: { opacity: 0, x: -10, filter: 'blur(2px)' },
  visible: ({ pIdx, ptIdx }: { pIdx: number; ptIdx: number }) => ({
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      delay: INITIAL_DELAY + 0.35 + pIdx * 0.15 + ptIdx * 0.06,
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

export default function ContextPiliers({ n }: SlideProps) {
  const pillars = [
    {
      num: '01',
      title: 'CLOUD',
      subtitle: 'Sécurité SaaS & Stockage',
      icon: Cloud,
      points: [
        'Protection des données SaaS',
        'Stockages (OneDrive, SharePoint)',
        'Contrôle des partages externes',
        'Gestion de la conformité cloud',
      ],
    },
    {
      num: '02',
      title: 'DONNÉES',
      subtitle: 'Classification & Audit',
      icon: Database,
      points: [
        'Classification automatique',
        'Inspection PII et données fi.',
        'Politiques de rétention',
        'Destruction sécurisée',
      ],
    },
    {
      num: '03',
      title: 'RÉSEAU',
      subtitle: 'Supervision des Flux',
      icon: ShareNetwork,
      points: [
        'Surveillance du trafic web',
        'Transferts sécurisés (SFTP)',
        'Inspection des emails (SMTP)',
        'Blocage & alertes flux réseau',
      ],
    },
    {
      num: '04',
      title: 'DEVICES',
      subtitle: 'Protection Endpoints',
      icon: Laptop,
      points: [
        'Contrôle des périphériques (USB)',
        'Surveillance des disques externes',
        'Transferts hors ligne',
        'Chiffrement forcé des supports',
      ],
    },
  ];

  return (
    <Shell section="CONTEXTE" title="Les 4 Piliers Structuraux DLP" n={n}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', gap: '1.4vw', padding: '0' }}>
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: INITIAL_DELAY, duration: 0.4 }}
          style={{ margin: 0, fontSize: '0.88vw', color: '#64748b', fontWeight: 500 }}
        >
          Une couverture multicouche intégrée pour assurer la protection des données sensibles sur l'ensemble du périmètre.
        </motion.p>

        {/* Top Connection Line Above the 4 Pillars */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: INITIAL_DELAY + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            width: '100%',
            height: '1vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '-0.2vw 0 -0.4vw 0',
            transformOrigin: 'center'
          }}
        >
          {/* Horizontal Line */}
          <div style={{
            position: 'absolute',
            left: '12.5%',
            right: '12.5%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #0b66d5 15%, #0b66d5 85%, transparent)',
            opacity: 0.6
          }} />

          {/* Node Dots centered over each pillar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.2vw',
            width: '100%',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0
          }}>
            {pillars.map((_, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: INITIAL_DELAY + 0.2 + idx * 0.1, type: 'spring', stiffness: 200 }}
                  style={{
                    width: '0.6vw',
                    height: '0.6vw',
                    borderRadius: '50%',
                    background: '#0b66d5',
                    border: '2px solid #ffffff',
                    boxShadow: '0 0 8px rgba(11, 102, 213, 0.5)',
                    zIndex: 2
                  }}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* 4 Pillars Cards Grid (Compact & Centered Height) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.2vw',
          alignItems: 'start'
        }}>
          {pillars.map((p, pIdx) => {
            const Icon = p.icon;

            return (
              <motion.div
                key={p.title}
                custom={pIdx}
                initial="hidden"
                animate="visible"
                variants={pillarCardVariant}
                whileHover={{ y: -3, scale: 1.01, boxShadow: '0 8px 22px rgba(11, 102, 213, 0.1)' }}
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '1.1vw 1vw',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.8vw',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 4px 14px rgba(15, 23, 42, 0.04)',
                  transition: 'all 0.25s ease'
                }}
              >
                {/* Top Accent Line */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: '#0b66d5'
                }} />

                {/* Card Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7vw', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.6vw' }}>
                  <div style={{
                    background: 'rgba(11, 102, 213, 0.08)',
                    border: '1px solid rgba(11, 102, 213, 0.2)',
                    color: '#0b66d5',
                    borderRadius: '10px',
                    padding: '0.5vw',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Icon size={22} weight="bold" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.65vw', color: '#0b66d5', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Pilier {p.num}
                    </span>
                    <h4 style={{ margin: '0.05vw 0 0 0', fontSize: '1.05vw', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em' }}>
                      {p.title}
                    </h4>
                  </div>
                </div>

                {/* Subtitle tag */}
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #f1f5f9',
                  borderRadius: '6px',
                  padding: '0.28vw 0.5vw',
                  fontSize: '0.72vw',
                  fontWeight: 700,
                  color: '#475569',
                  textAlign: 'center'
                }}>
                  {p.subtitle}
                </div>

                {/* Points List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5vw' }}>
                  {p.points.map((pt, ptIdx) => (
                    <motion.div
                      key={ptIdx}
                      custom={{ pIdx, ptIdx }}
                      initial="hidden"
                      animate="visible"
                      variants={pointVariant}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5vw',
                        background: '#f8fafc',
                        border: '1px solid #f1f5f9',
                        borderRadius: '6px',
                        padding: '0.45vw 0.6vw',
                        fontSize: '0.78vw',
                        color: '#334155',
                        fontWeight: 600,
                        lineHeight: 1.3
                      }}
                    >
                      <CheckCircle size={15} color="#0b66d5" weight="fill" style={{ flexShrink: 0 }} />
                      <span>{pt}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </Shell>
  );
}
