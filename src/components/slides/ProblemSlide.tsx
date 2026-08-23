'use client';

import { motion } from 'framer-motion';
import { ShieldAlert, DollarSign, Code2, SlidersHorizontal, SearchCheck, AlertCircle } from 'lucide-react';
import { Shell } from '../Presentation';
import type { SlideProps } from '../Presentation';

export default function ProblemSlide({ n }: SlideProps) {
  const problems = [
    {
      id: '01',
      title: 'Coût Élevé des Licences',
      text: 'Tarification prohibitive des solutions DLP propriétaires du marché (Symantec, Forcepoint).',
      tag: 'Impact Financier',
      icon: DollarSign,
      color: '#e11d48', // Red
      bgLight: '#fff1f2',
      border: '#fecdd3',
      gridArea: '1 / 1 / 2 / 2'
    },
    {
      id: '02',
      title: 'Absence d\'Alternative Open-Source',
      text: 'Manque d\'une solution DLP légère, modulaire et totalement contrôlable en interne.',
      tag: 'Souveraineté & Code',
      icon: Code2,
      color: '#00008f', // AXA Blue
      bgLight: '#eff6ff',
      border: '#bfdbfe',
      gridArea: '1 / 3 / 2 / 4'
    },
    {
      id: '03',
      title: 'Triage Manuel & Surcharge SOC',
      text: 'Extraction manuelle lourde des journaux bruts et fatigue décisionnelle des analystes.',
      tag: 'Efficacité Opérationnelle',
      icon: SearchCheck,
      color: '#475569', // Slate
      bgLight: '#f8fafc',
      border: '#cbd5e1',
      gridArea: '2 / 1 / 3 / 2'
    },
    {
      id: '04',
      title: 'Complexité des Règles DLP',
      text: 'Redondance et chevauchement sémantique des règles au sein du référentiel CM11 / OneTrust.',
      tag: 'Gouvernance & Conflits',
      icon: SlidersHorizontal,
      color: '#d97706', // Amber
      bgLight: '#fffbeb',
      border: '#fef3c7',
      gridArea: '2 / 3 / 3 / 4'
    }
  ];

  return (
    <Shell 
      section="PROBLÉMATIQUE" 
      title={
        <>
          Limites des Solutions DLP Actuelles &amp; <span style={{ color: '#e11d48', fontWeight: 900 }}>Verrous Opérationnels</span>
        </>
      } 
      n={n}
    >
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 22vw 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: '1.2vw 1.6vw',
        alignItems: 'center',
        padding: '0.4vw 0'
      }}>
        
        {/* Background Subtle Vector Connecting Lines */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1
          }}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <line x1="25" y1="25" x2="50" y2="50" stroke="#cbd5e1" strokeWidth="0.3" strokeDasharray="1 1" />
          <line x1="75" y1="25" x2="50" y2="50" stroke="#cbd5e1" strokeWidth="0.3" strokeDasharray="1 1" />
          <line x1="25" y1="75" x2="50" y2="50" stroke="#cbd5e1" strokeWidth="0.3" strokeDasharray="1 1" />
          <line x1="75" y1="75" x2="50" y2="50" stroke="#cbd5e1" strokeWidth="0.3" strokeDasharray="1 1" />
        </svg>

        {/* ========================================================================= */}
        {/* CENTRAL EXECUTIVE CORE SHIELD                                             */}
        {/* ========================================================================= */}
        <div style={{
          gridArea: '1 / 2 / 3 / 3',
          justifySelf: 'center',
          alignSelf: 'center',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.8vw',
          background: 'linear-gradient(135deg, #ffffff 0%, #fff1f2 100%)',
          border: '2px solid #e11d48',
          borderRadius: '20px',
          padding: '1.4vw 1.2vw',
          boxShadow: '0 12px 32px rgba(225, 29, 72, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04)',
          textAlign: 'center',
          width: '100%'
        }}>
          {/* Central Shield Icon Badge */}
          <div style={{
            width: '3.6vw',
            height: '3.6vw',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 16px rgba(225, 29, 72, 0.3)',
            flexShrink: 0
          }}>
            <ShieldAlert size={30} />
          </div>

          <div>
            <span style={{
              background: '#fff1f2',
              border: '1px solid #fecdd3',
              color: '#e11d48',
              fontSize: '0.58vw',
              fontWeight: 900,
              borderRadius: '6px',
              padding: '0.15vw 0.55vw',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              CONSTAT SÉCURITÉ
            </span>
            <h3 style={{ margin: '0.4vw 0 0.2vw 0', fontSize: '1.05vw', fontWeight: 900, color: '#0f172a', lineHeight: 1.2 }}>
              Verrous DLP Actuels
            </h3>
            <p style={{ margin: 0, fontSize: '0.74vw', color: '#475569', fontWeight: 600, lineHeight: 1.35 }}>
              Coûts élevés, opacité du code &amp; triage manuelle lourd.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* THE 4 CORNER PROBLEM CARDS                                                */}
        {/* ========================================================================= */}
        {problems.map((p, idx) => {
          const Icon = p.icon;

          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.08, ease: 'easeOut' }}
              whileHover={{ y: -3, boxShadow: `0 10px 24px rgba(15, 23, 42, 0.08), 0 0 0 1px ${p.color}40` }}
              style={{
                gridArea: p.gridArea,
                background: '#ffffff',
                border: `1.5px solid ${p.border}`,
                borderRadius: '14px',
                padding: '1.1vw 1.2vw',
                display: 'flex',
                gap: '0.9vw',
                alignItems: 'flex-start',
                boxShadow: '0 4px 14px rgba(15, 23, 42, 0.04)',
                position: 'relative',
                overflow: 'hidden',
                zIndex: 5,
                willChange: 'transform, box-shadow',
                transform: 'translateZ(0)'
              }}
            >
              {/* Left Side Accent Bar */}
              <div style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                width: '4.5px',
                background: p.color
              }} />

              {/* Icon Container */}
              <div style={{
                background: p.bgLight,
                border: `1px solid ${p.border}`,
                color: p.color,
                borderRadius: '10px',
                padding: '0.55vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Icon size={22} />
              </div>

              {/* Text Body */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2vw', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.6vw', color: p.color, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    PROBLÈME {p.id}
                  </span>
                  <span style={{
                    background: p.bgLight,
                    color: p.color,
                    fontSize: '0.58vw',
                    fontWeight: 800,
                    borderRadius: '4px',
                    padding: '0.1vw 0.4vw'
                  }}>
                    {p.tag}
                  </span>
                </div>

                <h4 style={{ margin: '0.1vw 0 0 0', fontSize: '0.95vw', fontWeight: 900, color: '#0f172a', lineHeight: 1.25 }}>
                  {p.title}
                </h4>

                <p style={{ margin: 0, fontSize: '0.76vw', color: '#475569', fontWeight: 500, lineHeight: 1.38 }}>
                  {p.text}
                </p>
              </div>
            </motion.div>
          );
        })}

      </div>
    </Shell>
  );
}


