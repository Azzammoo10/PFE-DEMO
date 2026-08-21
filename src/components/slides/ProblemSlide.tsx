'use client';

import { motion } from 'framer-motion';
import { useSyncExternalStore } from 'react';
import { Coins, Code, Gear, FileMagnifyingGlass, ShieldWarning } from '@phosphor-icons/react';
import { Shell } from '../Presentation';
import type { SlideProps } from '../Presentation';

const emptySubscribe = () => () => {};

export default function ProblemSlide({ n }: SlideProps) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const problems = [
    {
      id: '01',
      title: 'Coût Élevé',
      text: 'Coût élevé des solutions DLP existantes',
      icon: Coins,
      corner: 'tl',
      color: '#e11d48', // Red Alert
      initialX: -100,
      initialY: -60,
      cardDelay: 0.8,
      lineDelay: 0.6,
      x2: 33,
      y2: 29,
      cardStyle: {
        top: '5%',
        left: '2vw',
      }
    },
    {
      id: '02',
      title: 'Manque Open-Source',
      text: "Manque d'une alternative DLP légère et open-source",
      icon: Code,
      corner: 'tr',
      color: '#00008f', // AXA Blue
      initialX: 100,
      initialY: -60,
      cardDelay: 0.9,
      lineDelay: 0.7,
      x2: 67,
      y2: 29,
      cardStyle: {
        top: '5%',
        right: '2vw',
      }
    },
    {
      id: '03',
      title: 'Règles Complexes',
      text: 'Complexité et redondance des règles DLP',
      icon: Gear,
      corner: 'br',
      color: '#d97706', // Yellow/Amber
      initialX: 100,
      initialY: 60,
      cardDelay: 1.0,
      lineDelay: 0.8,
      x2: 67,
      y2: 71,
      cardStyle: {
        bottom: '5%',
        right: '2vw',
      }
    },
    {
      id: '04',
      title: 'Triage Manuel',
      text: 'Extraction manuelle des informations',
      icon: FileMagnifyingGlass,
      corner: 'bl',
      color: '#475569', // Slate
      initialX: -100,
      initialY: 60,
      cardDelay: 1.1,
      lineDelay: 0.9,
      x2: 33,
      y2: 71,
      cardStyle: {
        bottom: '5%',
        left: '2vw',
      }
    }
  ];

  // Page title with key terms highlighted in axa-blue
  const customTitle = (
    <>
      Vers une solution DLP{' '}
      <span style={{ color: '#00008f', fontWeight: 900 }}>optimisée</span>,{' '}
      <span style={{ color: '#00008f', fontWeight: 900 }}>légère</span> et{' '}
      <span style={{ color: '#00008f', fontWeight: 900 }}>moins coûteuse</span>
    </>
  );

  if (!isMounted) {
    return <div className="p-6 text-slate-500">Chargement de la problématique...</div>;
  }

  return (
    <Shell 
      section="PROBLÉMATIQUE" 
      pulseLabel="Problème" 
      title={customTitle} 
      n={n} 
      dense
    >
      <style>{`
        @keyframes radarSweep {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div style={{ display: 'flex', position: 'relative', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        
        {/* Background Connecting lines targeting specific radar nodes */}
        <svg 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1
          }}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Top-Left Line Gradient */}
            <linearGradient id="lineGrad-01" x1="1" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#e11d48" stopOpacity={0.1} />
              <stop offset="100%" stopColor="#e11d48" stopOpacity={0.8} />
            </linearGradient>
            {/* Top-Right Line Gradient */}
            <linearGradient id="lineGrad-02" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#00008f" stopOpacity={0.1} />
              <stop offset="100%" stopColor="#00008f" stopOpacity={0.8} />
            </linearGradient>
            {/* Bottom-Right Line Gradient */}
            <linearGradient id="lineGrad-03" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#d97706" stopOpacity={0.1} />
              <stop offset="100%" stopColor="#d97706" stopOpacity={0.8} />
            </linearGradient>
            {/* Bottom-Left Line Gradient */}
            <linearGradient id="lineGrad-04" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#475569" stopOpacity={0.1} />
              <stop offset="100%" stopColor="#475569" stopOpacity={0.8} />
            </linearGradient>
            {/* Radar gradient */}
            <linearGradient id="radarGrad" x1="1" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#00008f" stopOpacity="1" />
              <stop offset="100%" stopColor="#00008f" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Hub center dot */}
          <motion.circle
            cx={50}
            cy={50}
            r={0.8}
            fill="#00008f"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          />

          {problems.map((p, idx) => {
            const gradId = `lineGrad-0${idx + 1}`;
            return (
              <g key={`line-group-${p.id}`}>
                {/* Connecting Line */}
                <motion.line
                  x1={50}
                  y1={50}
                  x2={p.x2}
                  y2={p.y2}
                  stroke={`url(#${gradId})`}
                  strokeWidth="0.25"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: p.lineDelay, duration: 0.35, ease: 'easeOut' }}
                />
                
                {/* Card connection point dot */}
                <motion.circle
                  cx={p.x2}
                  cy={p.y2}
                  r={0.7}
                  fill={p.color}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: p.cardDelay, duration: 0.3 }}
                />
              </g>
            );
          })}
        </svg>

        {/* Central Visual: Concentric SOC Detection Radar */}
        <div style={{
          position: 'absolute',
          width: '16vw',
          height: '16vw',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {/* Radar Circles SVG */}
          <svg
            viewBox="0 0 120 120"
            style={{
              width: '100%',
              height: '100%',
              overflow: 'visible'
            }}
          >
            {/* Concentric Circle 1 (Outer) */}
            <motion.circle
              cx={60}
              cy={60}
              r={50}
              stroke="#cbd6e7"
              strokeWidth={1.2}
              fill="none"
              opacity={0.4}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.4 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />
            {/* Concentric Circle 2 (Middle) */}
            <motion.circle
              cx={60}
              cy={60}
              r={35}
              stroke="#cbd6e7"
              strokeWidth={1.2}
              fill="none"
              opacity={0.6}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.6 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
            {/* Concentric Circle 3 (Inner) */}
            <motion.circle
              cx={60}
              cy={60}
              r={18}
              stroke="#cbd6e7"
              strokeWidth={1.2}
              fill="none"
              opacity={0.8}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.8 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />

            {/* Radar Sweep Line (CSS animated rotate) */}
            <motion.g
              style={{
                transformOrigin: '60px 60px',
                animation: 'radarSweep 4s linear infinite'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {/* Sweep Line */}
              <line
                x1={60}
                y1={60}
                x2={60}
                y2={10}
                stroke="#00008f"
                strokeWidth={2}
                opacity={0.3}
              />
              {/* Gradient trail/sweep sector */}
              <path
                d="M 60,60 L 60,10 A 50,50 0 0,0 20,28 Z"
                fill="url(#radarGrad)"
                opacity={0.08}
              />
            </motion.g>

            {/* Definition for Radar Gradient */}
            <defs>
              <linearGradient id="radarGrad" x1="1" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#00008f" stopOpacity="1" />
                <stop offset="100%" stopColor="#00008f" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {/* Central Active Security Icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.4 }}
            style={{
              position: 'absolute',
              width: '3.4vw',
              height: '3.4vw',
              borderRadius: '50%',
              background: '#fff',
              border: '1.5px solid #00008f',
              boxShadow: '0 0 12px rgba(0,0,143,0.15)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 11
            }}
          >
            <ShieldWarning size={26} weight="duotone" className="text-[#00008f]" />
          </motion.div>
        </div>

        {/* Surrounding Threat Console Alert Cards */}
        {problems.map((p) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={`card-${p.id}`}
              initial={{ x: p.initialX, y: p.initialY, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: p.cardDelay, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -2, boxShadow: `0 8px 24px rgba(0,0,0,0.06), 0 0 8px ${p.color}33` }}
              style={{
                position: 'absolute',
                width: '24vw',
                background: '#ffffff',
                border: '1px solid #cbd6e7',
                borderTop: `4px solid ${p.color}`, // Colored status accent bar
                borderRadius: '8px',
                padding: '1vw 1.4vw',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                display: 'flex',
                gap: '1vw',
                alignItems: 'center',
                textAlign: 'left',
                zIndex: 5,
                cursor: 'pointer',
                ...p.cardStyle
              }}
            >
              {/* Left Side: Glowing Icon */}
              <div style={{
                width: '3vw',
                height: '3vw',
                borderRadius: '8px',
                background: `${p.color}0a`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexShrink: 0
              }}>
                <Icon size={28} weight="duotone" style={{ color: p.color }} />
              </div>

              {/* Right Side: Text details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1vw' }}>
                <span style={{
                  fontSize: '0.85vw',
                  fontWeight: 900,
                  color: p.color,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {p.id} · {p.title}
                </span>
                <p style={{
                  margin: 0,
                  fontSize: '1.1vw',
                  fontWeight: 700,
                  color: '#334155',
                  lineHeight: 1.3
                }}>
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
