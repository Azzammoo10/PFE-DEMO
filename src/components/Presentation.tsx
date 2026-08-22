'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type ReactElement } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';

// Import slide components
import TitleSlide from './slides/TitleSlide';
import SummarySlide from './slides/SummarySlide';
import ContextAxaPresentation from './slides/ContextAxaPresentation';
import ContextDLP from './slides/ContextDLP';
import ContextPiliers from './slides/ContextPiliers';
import ProblemSlide from './slides/ProblemSlide';
import ObjectivesSlide from './slides/ObjectivesSlide';
import MethodologySlide from './slides/MethodologySlide';
import ArchitectureSlide from './slides/ArchitectureSlide';
import TechStackSlide from './slides/TechStackSlide';
import DemoDlpSlide from './slides/DemoDlpSlide';
import ZeroTrustSlide from './slides/ZeroTrustSlide';
import ResultsSlide from './slides/ResultsSlide';
import MobileBlocker from './MobileBlocker';

export type SlideProps = { n: number; total: number };
export type Slide = { section: string; title: string; component: (p: SlideProps) => ReactElement };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(3px)' },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: 0.04 * i, duration: 0.32, ease: [0.23, 1, 0.32, 1] }
  }),
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: 0.04 * i, duration: 0.38, type: 'spring', stiffness: 160, damping: 20 }
  }),
};

export const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number = 0) => ({ pathLength: 1, opacity: 1, transition: { delay: 0.1 + i * 0.08, duration: 0.45, ease: [0.23, 1, 0.32, 1] } }),
};

function SectionPulse({ label }: { label: string }) {
  return (
    <motion.div className="section-pulse" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: [0, 1, 1, 0], scale: [0.92, 1, 1, 1.02] }} transition={{ duration: 1.15, times: [0, .18, .72, 1], ease: 'easeOut' }}>
      <span>{label}</span>
    </motion.div>
  );
}

export function Decor() {
  return (
    <>
      <div className="soft-rings"/>
      <div className="brand-line"/>
    </>
  );
}

export function Footer({ n, total = 15 }: { n: number; total?: number }) {
  return (
    <footer className="footer">
      <div className="mini-brand">EMSI</div>
      <span>Projet de Fin d&apos;Études : Ingénierie Informatique et Réseaux</span>
      <strong>{String(n).padStart(2, '0')} / {String(total).padStart(2, '0')}</strong>
    </footer>
  );
}

const getPlanStepNumber = (sec: string): number => {
  const s = sec.toUpperCase();
  if (s === 'CONTEXTE') return 1;
  if (s === 'PROBLÉMATIQUE' || s === 'OBJECTIFS') return 2;
  if (s === 'MÉTHODOLOGIE') return 3;
  if (s === 'CONCEPTION') return 4;
  if (s === 'RÉALISATION' || s === 'DÉMONSTRATION' || s === 'SUPERVISION' || s === 'VALIDATION') return 5;
  if (s === 'CONCLUSION' || s === 'PERSPECTIVES') return 6;
  return 1;
};

const planSteps = [
  { num: '01', title: 'Contexte' },
  { num: '02', title: 'Problématique' },
  { num: '03', title: 'Méthodologie' },
  { num: '04', title: 'Conception' },
  { num: '05', title: 'Réalisation' },
  { num: '06', title: 'Perspectives' },
];

export function Shell({ section, kicker, pulseLabel, title, n, total, children, dense = false }: { section: string; kicker?: string; pulseLabel?: string; title: string | React.ReactNode; n: number; total?: number; children: React.ReactNode; dense?: boolean }) {
  const planStep = getPlanStepNumber(section);
  const showStepNav = section.toUpperCase() !== 'SOMMAIRE' && 
                      section.toUpperCase() !== 'TITLE';

  return (
    <section className={`slide ${dense ? 'dense' : ''}`}>
      <Decor />
      <SectionPulse label={pulseLabel || section} />
      
      {showStepNav && (
        <div className="global-step-nav" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          width: '100%',
          marginBottom: '0.8vw',
          padding: '0.3vw 0',
          zIndex: 10
        }}>
          {/* Horizontal gray connecting line */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '3%',
            right: '3%',
            height: '2px',
            background: '#e2e8f0',
            zIndex: 1,
            transform: 'translateY(-50%)'
          }} />

          {/* Active glowing progress beam with spring animation */}
          <motion.div
            initial={false}
            animate={{
              width: `${((planStep - 1) / 5) * 94}%`
            }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '3%',
              height: '3px',
              background: 'linear-gradient(90deg, #0b66d5 0%, #38bdf8 50%, #00d2ff 100%)',
              boxShadow: '0 0 10px rgba(0, 210, 255, 0.65)',
              zIndex: 1,
              transform: 'translateY(-50%)',
              borderRadius: '2px'
            }}
          />

          {planSteps.map((step, idx) => {
            const stepNum = idx + 1;
            const isActive = stepNum === planStep;
            const isPast = stepNum < planStep;

            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: -8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: isActive ? 1.06 : 1,
                }}
                transition={{ duration: 0.35, type: 'spring', stiffness: 200, damping: 20 }}
                style={{
                  position: 'relative',
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45vw',
                  background: isActive
                    ? 'linear-gradient(135deg, #0b66d5 0%, #0284c7 100%)'
                    : isPast
                    ? '#eff6ff'
                    : '#ffffff',
                  color: isActive ? '#ffffff' : isPast ? '#0b66d5' : '#64748b',
                  border: isActive
                    ? '1.5px solid rgba(56, 189, 248, 0.8)'
                    : isPast
                    ? '1.5px solid #93c5fd'
                    : '1.5px solid #cbd5e1',
                  padding: isActive ? '0.28vw 0.85vw' : '0.22vw 0.6vw',
                  borderRadius: '20px',
                  fontSize: '0.74vw',
                  fontWeight: isActive ? 800 : 600,
                  boxShadow: isActive
                    ? '0 4px 16px rgba(11, 102, 213, 0.4), 0 0 12px rgba(56, 189, 248, 0.35)'
                    : isPast
                    ? '0 2px 6px rgba(11, 102, 213, 0.08)'
                    : 'none',
                  transition: 'background 0.3s ease, border 0.3s ease'
                }}
              >
                {/* Active Pulsing Live Dot or Past Checkmark */}
                {isActive ? (
                  <motion.span
                    animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#38bdf8',
                      boxShadow: '0 0 8px #38bdf8',
                      display: 'inline-block'
                    }}
                  />
                ) : isPast ? (
                  <span style={{ fontSize: '0.65vw', color: '#0b66d5', fontWeight: 900 }}>✓</span>
                ) : (
                  <span style={{ fontSize: '0.65vw', opacity: 0.7 }}>{step.num}</span>
                )}

                <span style={{ fontSize: '0.72vw', letterSpacing: isActive ? '0.02em' : 'normal' }}>
                  {step.title}
                </span>
              </motion.div>
            );
          })}
        </div>
      )}

      <header className="slide-head" style={{ marginTop: showStepNav ? '0' : '0.5vw', display: 'flex', flexDirection: 'column', gap: '0.2vw', alignItems: 'flex-start' }}>
        {kicker && (
          <motion.span
            initial={{ opacity: 0, scale: 1.12, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              color: '#00008f',
              background: 'rgba(0, 0, 143, 0.05)',
              border: '1.5px solid rgba(0, 0, 143, 0.15)',
              borderRadius: '6px',
              padding: '0.2vw 0.5vw',
              fontSize: '0.7vw',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              lineHeight: 1,
              display: 'inline-flex',
              alignItems: 'center',
              marginBottom: '0.2vw'
            }}
          >
            {kicker}
          </motion.span>
        )}
        <motion.div className="section-label" initial="hidden" animate="visible" custom={0} variants={fadeUp}>
          {section}
        </motion.div>
        <motion.h1 initial="hidden" animate="visible" custom={1} variants={fadeUp}>{title}</motion.h1>
      </header>
      <footer className="slide-body">{children}</footer>
      <Footer n={n} total={total} />
    </section>
  );
}

const slides: Slide[] = [
  { section: 'TITLE', title: 'Titre', component: TitleSlide },
  { section: 'SOMMAIRE', title: 'Plan', component: SummarySlide },
  { section: 'CONTEXTE', title: 'AXA Présentation', component: ContextAxaPresentation },
  { section: 'CONTEXTE', title: 'Contexte — Prévention des Pertes de données (DLP)', component: ContextDLP },
  { section: 'CONTEXTE', title: 'Les 4 Piliers Structuraux DLP', component: ContextPiliers },
  { section: 'PROBLÉMATIQUE', title: 'Problème', component: ProblemSlide },
  { section: 'OBJECTIFS', title: 'Objectifs', component: ObjectivesSlide },
  { section: 'MÉTHODOLOGIE', title: 'Méthodologie', component: MethodologySlide },
  { section: 'CONCEPTION', title: 'Architecture', component: ArchitectureSlide },
  { section: 'RÉALISATION', title: 'Technologies & Outils', component: TechStackSlide },
  { section: 'DÉMONSTRATION', title: 'Démonstration Opérationnelle & Validation', component: DemoDlpSlide },
  { section: 'CONCLUSION', title: 'Conclusion & Zero Trust', component: ZeroTrustSlide },
  { section: 'PERSPECTIVES', title: 'Perspectives d\'évolution', component: ResultsSlide },
];

const slideVariants = {
  enter: ({ direction, isSameSection }: { direction: number; isSameSection: boolean }) => {
    if (isSameSection) {
      return {
        x: 0,
        y: direction > 0 ? '35vh' : direction < 0 ? '-35vh' : 0,
        rotateY: 0,
        opacity: 0,
        scale: 0.98,
        filter: 'blur(0px)',
      };
    } else {
      return {
        x: 0,
        y: direction > 0 ? '25vh' : direction < 0 ? '-25vh' : 0,
        rotateY: direction > 0 ? 3 : direction < 0 ? -3 : 0,
        opacity: 0,
        scale: 0.97,
        filter: 'blur(3px)',
      };
    }
  },
  center: {
    x: 0,
    y: 0,
    rotateY: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
  },
  exit: ({ direction, isSameSection }: { direction: number; isSameSection: boolean }) => {
    if (isSameSection) {
      return {
        x: 0,
        y: direction < 0 ? '35vh' : direction > 0 ? '-35vh' : 0,
        rotateY: 0,
        opacity: 0,
        scale: 0.98,
        filter: 'blur(0px)',
      };
    } else {
      return {
        x: 0,
        y: direction < 0 ? '25vh' : direction > 0 ? '-25vh' : 0,
        rotateY: direction < 0 ? 3 : direction > 0 ? -3 : 0,
        opacity: 0,
        scale: 0.97,
        filter: 'blur(3px)',
      };
    }
  }
};

export default function Presentation() {
  const [[index, direction, isSameSection], setPage] = useState([0, 0, false]);
  const isScrolling = useRef(false);

  const Active = useMemo(() => slides[index].component, [index]);

  const go = useCallback((d: number) => {
    setPage(([i]) => {
      const next = Math.max(0, Math.min(slides.length - 1, i + d));
      const dir = next > i ? 1 : next < i ? -1 : 0;
      const sameSec = slides[i].section === slides[next].section;
      return [next, dir, sameSec];
    });
  }, []);

  const goTo = useCallback((targetIndex: number) => {
    setPage(([i]) => {
      const next = Math.max(0, Math.min(slides.length - 1, targetIndex));
      const dir = next > i ? 1 : next < i ? -1 : 0;
      const sameSec = slides[i].section === slides[next].section;
      return [next, dir, sameSec];
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        go(1);
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        go(-1);
      }
      if (e.key === 'Home') goTo(0);
      if (e.key === 'End') goTo(slides.length - 1);
      if (e.key.toLowerCase() === 'f') {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          document.documentElement.requestFullscreen();
        }
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 18) return;
      if (isScrolling.current) return;

      isScrolling.current = true;
      if (e.deltaY > 0) {
        go(1);
      } else if (e.deltaY < 0) {
        go(-1);
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 550);
    };

    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', onWheel, { passive: true });

    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', onWheel);
    };
  }, [go, goTo]);

  return (
    <main className="stage" style={{ perspective: '1600px' }}>
      <MobileBlocker />
      <AnimatePresence mode="wait" custom={{ direction, isSameSection }}>
        <motion.div
          key={index}
          className="slide-holder"
          style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden', WebkitFontSmoothing: 'antialiased' }}
          custom={{ direction, isSameSection }}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { duration: isSameSection ? 0.35 : 0.44, ease: [0.25, 1, 0.5, 1] },
            y: { duration: isSameSection ? 0.35 : 0.44, ease: [0.25, 1, 0.5, 1] },
            rotateY: { duration: isSameSection ? 0.35 : 0.44, ease: [0.25, 1, 0.5, 1] },
            opacity: { duration: isSameSection ? 0.28 : 0.32, ease: 'easeOut' },
            scale: { duration: isSameSection ? 0.35 : 0.44, ease: [0.25, 1, 0.5, 1] },
            filter: { duration: isSameSection ? 0.28 : 0.35, ease: 'easeOut' }
          }}
        >
          <Active n={index + 1} total={slides.length}/>
        </motion.div>
      </AnimatePresence>
      <div className="nav">
        <button onClick={() => go(-1)}>‹</button>
        <span>{index + 1}/{slides.length}</span>
        <button onClick={() => document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen()}>⛶</button>
        <button onClick={() => go(1)}>›</button>
      </div>
    </main>
  );
}

