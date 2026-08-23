'use client';

import { motion } from 'framer-motion';
import { Cloud, Database, ShareNetwork, Laptop, CheckCircle } from '@phosphor-icons/react';
import { Shell } from '../Presentation';
import type { SlideProps } from '../Presentation';

export default function ContextPiliers({ n }: SlideProps) {
  const pillars = [
    {
      num: '01',
      title: 'CLOUD',
      subtitle: 'Sécurité SaaS & Stockage',
      icon: Cloud,
      points: [
        'OneDrive & SharePoint',
        'Partages externes',
        'Applications Cloud',
      ],
    },
    {
      num: '02',
      title: 'DONNÉES',
      subtitle: 'Classification & Confidentialité',
      icon: Database,
      points: [
        'Classification automatique',
        'Détection PII & données sensibles',
        'Sensitivity Labels',
      ],
    },
    {
      num: '03',
      title: 'RÉSEAU',
      subtitle: 'Supervision des Flux',
      icon: ShareNetwork,
      points: [
        'Trafic Web',
        'Inspection des emails',
        'Blocage des transferts',
      ],
    },
    {
      num: '04',
      title: 'DEVICES',
      subtitle: 'Protection Endpoints',
      icon: Laptop,
      points: [
        'Périphériques USB',
        'Transferts réseau',
        'Applications & navigateurs',
      ],
    },
  ];

  return (
    <Shell section="CONTEXTE" title="Les 4 Piliers Structuraux DLP" n={n}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', gap: '1.4vw', padding: '0' }}>
        
        {/* Subtitle Banner */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.8vw',
            background: 'linear-gradient(90deg, #eff6ff 0%, #f8fafc 100%)',
            border: '1.5px solid #bfdbfe',
            borderRadius: '10px',
            padding: '0.55vw 1.1vw',
            width: 'max-content',
            boxShadow: '0 4px 12px rgba(11, 102, 213, 0.05)'
          }}
        >
          <span style={{
            background: '#0b66d5',
            color: '#ffffff',
            fontSize: '0.6vw',
            fontWeight: 900,
            borderRadius: '6px',
            padding: '0.15vw 0.5vw',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            flexShrink: 0
          }}>
            PÉRIMÈTRE D&apos;ACTION
          </span>
          <p style={{ margin: 0, fontSize: '0.88vw', color: '#0f172a', fontWeight: 700, lineHeight: 1.3 }}>
            Une couverture multicouche intégrée pour assurer la protection des données sensibles sur l&apos;ensemble du périmètre.
          </p>
        </div>

        {/* Top Connection Line Above the 4 Pillars */}
        <div
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
                <div
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
        </div>

        {/* 4 Pillars Cards Grid */}
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
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: pIdx * 0.06, ease: 'easeOut' }}
                whileHover={{ y: -3, boxShadow: '0 8px 22px rgba(11, 102, 213, 0.12)' }}
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
                  willChange: 'transform, box-shadow',
                  transform: 'translateZ(0)'
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
                    <Icon size={22} weight="bold" color="#0b66d5" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.65vw', color: '#0b66d5', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Pilier {p.num}
                    </span>
                    <h4 style={{ margin: '0.05vw 0 0 0', fontSize: '1.05vw', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.01em' }}>
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
                    <div
                      key={ptIdx}
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
                    </div>
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

