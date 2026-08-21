'use client';

import { motion } from 'framer-motion';
import { useSyncExternalStore } from 'react';
import { Compass, Sliders, Eye, ShieldCheck, CaretRight } from '@phosphor-icons/react';
import { Shell } from '../Presentation';
import type { SlideProps } from '../Presentation';

const emptySubscribe = () => () => {};

export default function ObjectivesSlide({ n }: SlideProps) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const objectives = [
    {
      id: '01',
      title: 'Coût & Flexibilité',
      text: 'Concevoir une architecture DLP hybride, flexible et à coût réduit',
      icon: Compass,
      delay: 0.1,
      caretDelay: 0.3
    },
    {
      id: '02',
      title: 'Gestion des Règles',
      text: 'Optimiser la gestion des règles de conformité en identifiant les redondances',
      icon: Sliders,
      delay: 0.4,
      caretDelay: 0.6
    },
    {
      id: '03',
      title: 'Monitoring Automatique',
      text: 'Améliorer la visibilité et automatiser le monitoring des incidents DLP',
      icon: Eye,
      delay: 0.7,
      caretDelay: 0.9
    },
    {
      id: '04',
      title: 'Validation des SIT',
      text: 'Faciliter la validation des SIT (Sensitive Information Types) et des politiques DLP',
      icon: ShieldCheck,
      delay: 1.0,
      caretDelay: null
    }
  ];

  // Page title matching requirements
  const customTitle = (
    <>
      Nos <span style={{ color: '#00008f', fontWeight: 900 }}>Objectifs</span>
    </>
  );

  if (!isMounted) {
    return <div className="p-6 text-slate-500">Chargement des objectifs...</div>;
  }

  return (
    <Shell 
      section="OBJECTIFS" 
      pulseLabel="Objectifs" 
      title={customTitle} 
      n={n} 
      dense
    >
      <div style={{ 
        display: 'flex', 
        width: '100%', 
        height: '100%', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: '0 2vw', 
        overflow: 'hidden' 
      }}>
        {objectives.map((p) => {
          const Icon = p.icon;
          return (
            <div 
              key={`obj-${p.id}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                flex: 1,
                position: 'relative',
                height: '100%',
                justifyContent: 'center'
              }}
            >
              {/* Objective Card */}
              <motion.div
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: p.delay, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,143,0.08)', borderColor: '#00008f' }}
                style={{
                  width: '17.5vw',
                  height: '17.5vw',
                  background: '#ffffff',
                  border: '1.5px solid #cbd6e7',
                  borderTop: '5px solid #00008f', // Unified AXA Blue
                  borderRadius: '14px',
                  padding: '1.8vw 1.4vw',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                {/* Header Row: Step number and Icon */}
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2vw' }}>
                  <span style={{
                    fontSize: '1vw',
                    fontWeight: 900,
                    color: '#00008f',
                    background: '#00008f0a',
                    padding: '0.2vw 0.6vw',
                    borderRadius: '8px',
                    letterSpacing: '0.05em'
                  }}>
                    {p.id}
                  </span>
                  <div style={{
                    width: '3vw',
                    height: '3vw',
                    borderRadius: '10px',
                    background: '#00008f0d',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <Icon size={26} weight="duotone" className="text-[#00008f]" />
                  </div>
                </div>

                {/* Objective Title */}
                <h4 style={{
                  margin: '0 0 0.6vw 0',
                  fontSize: '1.2vw',
                  fontWeight: 900,
                  color: '#00008f',
                  lineHeight: 1.2
                }}>
                  {p.title}
                </h4>

                {/* Objective Description Text */}
                <p style={{
                  margin: 0,
                  fontSize: '0.98vw',
                  fontWeight: 600,
                  color: '#475569',
                  lineHeight: 1.45
                }}>
                  {p.text}
                </p>
              </motion.div>

              {/* Progress Flow Caret Indicator */}
              {p.caretDelay && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: p.caretDelay, duration: 0.4 }}
                  style={{
                    position: 'absolute',
                    right: '-0.7vw',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 4,
                    pointerEvents: 'none'
                  }}
                >
                  <CaretRight size={24} weight="bold" className="text-[#cbd6e7]" />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </Shell>
  );
}
