'use client';

import { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  Tag, 
  Activity, 
  ShieldCheck
} from 'lucide-react';
import { Shell } from '../Presentation';
import type { SlideProps } from '../Presentation';

import LabelGuardSchema from './LabelGuardSchema';
import MonitoringSchema from './MonitoringSchema';
import OneTrustSchema from './OneTrustSchema';

const emptySubscribe = () => () => {};

const verticalVariants: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    y: dir > 0 ? '50%' : '-50%',
    scale: 0.97
  }),
  center: {
    opacity: 1,
    y: '0%',
    scale: 1
  },
  exit: (dir: number) => ({
    opacity: 0,
    y: dir > 0 ? '-50%' : '50%',
    scale: 0.97
  })
};

export default function PlatformsSlide({ n, total }: SlideProps) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [subStep, setSubStep] = useState<1 | 2 | 3>(1);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);

  const subStepRef = useRef(subStep);
  useEffect(() => {
    subStepRef.current = subStep;
  }, [subStep]);
  const isScrolling = useRef(false);

  // Capture wheel and keyboard events for internal sub-step navigation (1/3 to 3/3)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 18) return;
      if (isScrolling.current) return;

      if (e.deltaY > 0) {
        if (subStepRef.current < 3) {
          e.stopPropagation();
          e.stopImmediatePropagation();
          isScrolling.current = true;
          setSlideDirection(1);
          setSubStep((prev) => (prev + 1) as 1 | 2 | 3);
          setTimeout(() => { isScrolling.current = false; }, 400);
        }
      } else if (e.deltaY < 0) {
        if (subStepRef.current > 1) {
          e.stopPropagation();
          e.stopImmediatePropagation();
          isScrolling.current = true;
          setSlideDirection(-1);
          setSubStep((prev) => (prev - 1) as 1 | 2 | 3);
          setTimeout(() => { isScrolling.current = false; }, 400);
        }
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (subStepRef.current < 3) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          setSlideDirection(1);
          setSubStep((prev) => (prev + 1) as 1 | 2 | 3);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (subStepRef.current > 1) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          setSlideDirection(-1);
          setSubStep((prev) => (prev - 1) as 1 | 2 | 3);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { capture: true });
    window.addEventListener('keydown', handleKey, { capture: true });

    return () => {
      window.removeEventListener('wheel', handleWheel, { capture: true });
      window.removeEventListener('keydown', handleKey, { capture: true });
    };
  }, []);

  if (!isMounted) {
    return <div className="p-6 text-slate-500">Chargement des plateformes DLP...</div>;
  }

  const getSubTitle = () => {
    if (subStep === 1) return 'VOLET 1/3 : LabelGuard Platform (Classificateur & Autolabeling IA)';
    if (subStep === 2) return 'VOLET 2/3 : DLP Monitoring Tool (Supervision & Ingestion Logs)';
    return 'VOLET 3/3 : OneTrust Tracker (Cartographie & Conformité RGPD)';
  };

  return (
    <Shell
      section="CONCEPTION"
      pulseLabel="Plateformes Ops"
      title="Conception des Plateformes Opérationnelles"
      n={n}
      total={total}
      dense
    >
      <div className="w-full h-full flex flex-col items-center justify-between relative overflow-hidden p-0">
        
        {/* Top Navigation Bar with Sub-step Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
          marginBottom: '0.4vw',
          zIndex: 20
        }}>
          {/* Active Sub-step Badge / Subtitle Banner */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6vw',
            background: '#ffffff',
            border: '2px solid #00008f',
            borderRadius: '24px',
            padding: '0.45vw 1.2vw',
            fontSize: '1.05vw',
            fontWeight: 900,
            color: '#0f172a',
            boxShadow: '0 4px 14px rgba(0, 0, 143, 0.12)'
          }}>
            {subStep === 1 && <Tag style={{ width: '1.2vw', height: '1.2vw', color: '#00008f' }} />}
            {subStep === 2 && <Activity style={{ width: '1.2vw', height: '1.2vw', color: '#0b66d5' }} />}
            {subStep === 3 && <ShieldCheck style={{ width: '1.2vw', height: '1.2vw', color: '#059669' }} />}
            <span style={{ color: subStep === 1 ? '#00008f' : (subStep === 2 ? '#0b66d5' : '#059669') }}>
              {getSubTitle()}
            </span>
          </div>
        </div>

        {/* Main Stage Display */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: 'calc(100% - 3.6vw)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          <AnimatePresence mode="wait" custom={slideDirection}>
            
            {/* VOLET 1: LabelGuard Platform */}
            {subStep === 1 && (
              <motion.div
                key="sub-plat-1"
                custom={slideDirection}
                variants={verticalVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  padding: '0.1vw'
                }}
              >
                <LabelGuardSchema />
              </motion.div>
            )}

            {/* VOLET 2: DLP Monitoring Tool */}
            {subStep === 2 && (
              <motion.div
                key="sub-plat-2"
                custom={slideDirection}
                variants={verticalVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  padding: '0.1vw'
                }}
              >
                <MonitoringSchema />
              </motion.div>
            )}

            {/* VOLET 3: OneTrust Tracker */}
            {subStep === 3 && (
              <motion.div
                key="sub-plat-3"
                custom={slideDirection}
                variants={verticalVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  padding: '0.1vw'
                }}
              >
                <OneTrustSchema />
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Bottom Navigation Control with Scroll Down Arrow Prompt */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '2px', zIndex: 10 }}>
          <button
            onClick={() => {
              if (subStep < 3) {
                setSlideDirection(1);
                setSubStep((prev) => (prev + 1) as 1 | 2 | 3);
              }
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: subStep < 3 ? 'pointer' : 'default',
              padding: 0
            }}
          >
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: subStep === 3 ? 'rgba(16, 185, 129, 0.08)' : 'rgba(0, 0, 143, 0.05)',
                border: `1.5px solid ${subStep === 3 ? 'rgba(16, 185, 129, 0.25)' : 'rgba(0, 0, 143, 0.15)'}`,
                color: subStep === 3 ? '#047857' : '#00008f',
                padding: '2px 12px',
                borderRadius: '20px',
                fontSize: '0.68vw',
                fontWeight: 700
              }}
            >
              <span>
                {subStep === 1 && 'Scroll vers le bas pour le Volet 2/3 (DLP Monitoring Tool)'}
                {subStep === 2 && 'Scroll vers le bas pour le Volet 3/3 (OneTrust Tracker & RGPD)'}
                {subStep === 3 && 'Dernier volet des Plateformes — Continuer vers la slide suivante'}
              </span>
              <span style={{ fontSize: '0.78vw', fontWeight: 900 }}>↓</span>
            </motion.div>
          </button>
        </div>

      </div>
    </Shell>
  );
}
