'use client';

import { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  Network, 
  Cpu, 
  Flame,
  ShieldAlert
} from 'lucide-react';
import { Shell } from '../Presentation';
import type { SlideProps } from '../Presentation';
import Volet1InfrastructureSchema from './Volet1InfrastructureSchema';
import Volet2DlpManagerSchema from './Volet2DlpManagerSchema';
import Volet3PentestAnimation from './Volet3PentestAnimation';

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

export default function ArchitectureSlide({ n }: SlideProps) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [subStep, setSubStep] = useState<1 | 2 | 3 | 4>(1);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);

  const subStepRef = useRef(subStep);
  useEffect(() => {
    subStepRef.current = subStep;
  }, [subStep]);
  const isScrolling = useRef(false);

  // Capture wheel and keyboard events for internal sub-step navigation (1/4 to 4/4)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 18) return;
      if (isScrolling.current) return;

      if (e.deltaY > 0) {
        if (subStepRef.current < 4) {
          e.stopPropagation();
          e.stopImmediatePropagation();
          isScrolling.current = true;
          setSlideDirection(1);
          setSubStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
          setTimeout(() => { isScrolling.current = false; }, 400);
        }
      } else if (e.deltaY < 0) {
        if (subStepRef.current > 1) {
          e.stopPropagation();
          e.stopImmediatePropagation();
          isScrolling.current = true;
          setSlideDirection(-1);
          setSubStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
          setTimeout(() => { isScrolling.current = false; }, 400);
        }
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        if (subStepRef.current < 4) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          setSlideDirection(1);
          setSubStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
        }
      } else if (e.key === 'ArrowUp') {
        if (subStepRef.current > 1) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          setSlideDirection(-1);
          setSubStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
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
    return <div className="p-6 text-slate-500">Chargement de la conception DLP...</div>;
  }

  const getSubTitle = () => {
    if (subStep === 1) return 'VOLET 1/4 : Infrastructure & Réseau Virtualisé (4 VMs)';
    if (subStep === 2) return 'VOLET 2/4 : DLP Manager & Micro-Agents Python';
    if (subStep === 3) return 'VOLET 3/4 : Conception de la Validation Offensive (Pentest)';
    return 'VOLET 4/4 : Supervision SOC Wazuh & Active Response';
  };

  return (
    <Shell
      section="CONCEPTION"
      pulseLabel="Conception Lab"
      title={subStep === 1 ? "Conception du Laboratoire DLP" : ""}
      n={n}
      dense
      keywords={['Virtualisation 4 VMs', 'Micro-agents Python REST', 'Hook Watchdog/WMI', 'Pentest Metasploit', 'SOC Wazuh Active Response']}
    >
      <div className="w-full h-full flex flex-col items-center justify-between relative overflow-hidden p-0">
        
        {/* Top Navigation Bar with Sub-step Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
          marginBottom: subStep === 2 ? '0.15vw' : '0.4vw',
          zIndex: 20
        }}>
          {/* Active Sub-step Badge / Subtitle Banner */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5vw',
            background: '#ffffff',
            border: '1.5px solid #0b66d5',
            borderRadius: '20px',
            padding: subStep === 2 ? '0.2vw 0.8vw' : '0.45vw 1.2vw',
            fontSize: subStep === 2 ? '0.82vw' : '1.05vw',
            fontWeight: 900,
            color: '#0f172a',
            boxShadow: '0 2px 10px rgba(11, 102, 213, 0.1)'
          }}>
            {subStep === 1 && <Network style={{ width: '1.2vw', height: '1.2vw', color: '#0b66d5' }} />}
            {subStep === 2 && <Cpu style={{ width: '1vw', height: '1vw', color: '#0b66d5' }} />}
            {subStep === 3 && <Flame style={{ width: '1.2vw', height: '1.2vw', color: '#dc2626' }} />}
            {subStep === 4 && <ShieldAlert style={{ width: '1.2vw', height: '1.2vw', color: '#00008f' }} />}
            <span style={{ color: subStep === 3 ? '#b91c1c' : (subStep === 4 ? '#00008f' : '#0b66d5') }}>
              {getSubTitle()}
            </span>
          </div>
        </div>

        {/* Main Stage Display (Maximized Height for all 4 Volets) */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: 'calc(100% - 1.8vw)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          <AnimatePresence mode="wait" custom={slideDirection}>
            
            {/* VOLET 1: Infrastructure & Réseau Virtualisé (4 VMs) */}
            {subStep === 1 && (
              <motion.div
                key="sub-1"
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
                <Volet1InfrastructureSchema />
              </motion.div>
            )}

            {/* VOLET 2: DLP Manager & Agents Python */}
            {subStep === 2 && (
              <motion.div
                key="sub-2"
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
                <Volet2DlpManagerSchema />
              </motion.div>
            )}

            {/* VOLET 3: Validation Offensive (Pentest Kali Linux) */}
            {subStep === 3 && (
              <motion.div
                key="sub-3"
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
                <Volet3PentestAnimation />
              </motion.div>
            )}

            {/* VOLET 4: Supervision SOC Wazuh & Active Response */}
            {subStep === 4 && (
              <motion.div
                key="sub-4"
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
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#ffffff',
                  border: '1.5px solid #cbd5e1',
                  borderRadius: '16px',
                  padding: '0.6vw 1vw',
                  boxShadow: '0 8px 24px rgba(15, 23, 42, 0.04)',
                  boxSizing: 'border-box'
                }}>
                  <img
                    src="/soc_wazuh_dlp (1).png"
                    alt="Chaîne de visibilité SOC Wazuh & DLP"
                    style={{
                      maxWidth: '96%',
                      maxHeight: '94%',
                      objectFit: 'contain'
                    }}
                  />
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </Shell>
  );
}
