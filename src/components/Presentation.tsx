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
import PlatformsSlide from './slides/PlatformsSlide';
import TechStackSlide from './slides/TechStackSlide';
import AIBenchmarkSlide from './slides/AIBenchmarkSlide';
import DemoDlpSlide from './slides/DemoDlpSlide';
import ZeroTrustSlide from './slides/ZeroTrustSlide';
import ResultsSlide from './slides/ResultsSlide';
import ThanksSlide from './slides/ThanksSlide';
import MobileBlocker from './MobileBlocker';
import SlideNavigationModal from './SlideNavigationModal';

export type SlideProps = { n: number; total: number };
export type Slide = { section: string; title: string; component: (p: SlideProps) => ReactElement };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.03 * i, duration: 0.28, ease: [0.23, 1, 0.32, 1] }
  }),
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: 10 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: 0.03 * i, duration: 0.32, ease: [0.23, 1, 0.32, 1] }
  }),
};

export const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number = 0) => ({ pathLength: 1, opacity: 1, transition: { delay: 0.08 + i * 0.06, duration: 0.38, ease: [0.23, 1, 0.32, 1] } }),
};

function SectionPulse({ label }: { label: string }) {
  return null;
}

export function Decor() {
  return (
    <>
      <div className="soft-rings"/>
      <div className="brand-line"/>
    </>
  );
}

export function Footer({ n, total = 14 }: { n: number; total?: number }) {
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

const getSlideProgressPercentage = (n: number): number => {
  switch (n) {
    case 1:
    case 2:
    case 3:
      return 0; // Step 01 Contexte (0%)
    case 4:
      return 7; // Moving inside Contexte
    case 5:
      return 14; // End of Contexte
    case 6:
      return 20; // Step 02 Problématique (20%)
    case 7:
      return 30; // Step 02 Objectifs
    case 8:
      return 40; // Step 03 Méthodologie (40%)
    case 9:
      return 60; // Step 04 Conception - Architecture (60%) -> Reaches Conception badge!
    case 10:
      return 70; // Step 04 Conception - Plateformes
    case 11:
      return 80; // Step 05 Réalisation - TechStack (80%) -> Reaches Réalisation badge!
    case 12:
      return 86; // Step 05 Réalisation - AI Benchmark
    case 13:
      return 92; // Step 05 Démonstration DLP
    case 14:
      return 96; // Step 06 Perspectives - Conclusion
    case 15:
    case 16:
      return 100; // Step 06 Perspectives - Thanks (100%)
    default:
      return 0;
  }
};

export function Shell({ section, kicker, pulseLabel, title, n, total = 14, children, dense = false }: { section: string; kicker?: string; pulseLabel?: string; title: string | React.ReactNode; n: number; total?: number; children: React.ReactNode; dense?: boolean }) {
  const planStep = getPlanStepNumber(section);
  const slideProgress = getSlideProgressPercentage(n);
  const showStepNav = section.toUpperCase() !== 'SOMMAIRE' && 
                      section.toUpperCase() !== 'TITLE';

  return (
    <section className={`slide ${dense ? 'dense' : ''}`}>
      <Decor />
      
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
          {/* Horizontal gray connecting line background */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '3%',
            right: '3%',
            height: '2px',
            background: '#cbd5e1',
            zIndex: 1,
            transform: 'translateY(-50%)'
          }} />

          {/* Active glowing progress beam advancing slide by slide */}
          <motion.div
            initial={false}
            animate={{
              width: `${(slideProgress / 100) * 94}%`
            }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '3%',
              height: '3.5px',
              background: 'linear-gradient(90deg, #00008f 0%, #0b66d5 40%, #38bdf8 75%, #00d2ff 100%)',
              boxShadow: '0 0 12px rgba(0, 210, 255, 0.75)',
              zIndex: 1,
              transform: 'translateY(-50%)',
              borderRadius: '3px'
            }}
          />

          {/* Glowing leading pulse head traveling on the tip of the connecting trait */}
          <motion.div
            initial={false}
            animate={{
              left: `calc(3% + ${(slideProgress / 100) * 94}%)`
            }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            style={{
              position: 'absolute',
              top: '50%',
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              background: '#00d2ff',
              boxShadow: '0 0 12px #00d2ff, 0 0 20px #38bdf8',
              zIndex: 2,
              transform: 'translate(-50%, -50%)'
            }}
          />

          {planSteps.map((step, idx) => {
            const stepNum = idx + 1;
            const isActive = stepNum === planStep;
            const isPast = stepNum < planStep;

            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: -6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: isActive ? 1.05 : 1,
                }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
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
                    ? '1.5px solid #0b66d5'
                    : isPast
                    ? '1.5px solid #93c5fd'
                    : '1.5px solid #cbd5e1',
                  padding: '0.25vw 0.7vw',
                  borderRadius: '20px',
                  fontSize: '0.74vw',
                  fontWeight: isActive ? 800 : 600,
                  boxShadow: isActive
                    ? '0 4px 16px rgba(11, 102, 213, 0.4), 0 0 12px rgba(56, 189, 248, 0.35)'
                    : isPast
                    ? '0 2px 6px rgba(11, 102, 213, 0.08)'
                    : 'none',
                  willChange: 'transform, background, border'
                }}
              >
                {/* Active Pulsing Live Dot or Past Checkmark */}
                {isActive ? (
                  <motion.span
                    animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
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
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.3, ease: 'easeOut' }}
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
        <motion.h1 initial="hidden" animate="visible" custom={1} variants={fadeUp}>{title}</motion.h1>
      </header>
      <footer className="slide-body">{children}</footer>
      <Footer n={n} total={total} />
    </section>
  );
}

const slides: Slide[] = [
  { section: 'TITLE', title: 'Page de Garde', component: TitleSlide },
  { section: 'SOMMAIRE', title: 'Sommaire', component: SummarySlide },
  { section: 'CONTEXTE', title: 'Présentation AXA GO', component: ContextAxaPresentation },
  { section: 'CONTEXTE', title: 'Cadre Conceptuel DLP', component: ContextDLP },
  { section: 'CONTEXTE', title: 'Les 4 Piliers de la Protection DLP', component: ContextPiliers },
  { section: 'PROBLÉMATIQUE', title: 'Problématique', component: ProblemSlide },
  { section: 'OBJECTIFS', title: 'Objectifs', component: ObjectivesSlide },
  { section: 'MÉTHODOLOGIE', title: 'Méthodologie', component: MethodologySlide },
  { section: 'CONCEPTION', title: 'Analyse et Conception du Laboratoire DLP', component: ArchitectureSlide },
  { section: 'CONCEPTION', title: 'Conception des Plateformes Opérationnelles', component: PlatformsSlide },
  { section: 'RÉALISATION', title: 'Environnement Technique', component: TechStackSlide },
  { section: 'RÉALISATION', title: 'Benchmark IA', component: AIBenchmarkSlide },
  { section: 'DÉMONSTRATION', title: 'Validation Expérimentale', component: DemoDlpSlide },
  { section: 'CONCLUSION', title: 'Conclusion', component: ZeroTrustSlide },
  { section: 'PERSPECTIVES', title: 'Perspectives d\'Évolution', component: ResultsSlide },
  { section: 'CONCLUSION', title: 'Remerciements et Échange avec le Jury', component: ThanksSlide },
];

const slideVariants = {
  enter: ({ direction, isSameSection }: { direction: number; isSameSection: boolean }) => ({
    x: 0,
    y: direction > 0 ? (isSameSection ? '10vh' : '6vh') : direction < 0 ? (isSameSection ? '-10vh' : '-6vh') : 0,
    opacity: 0,
  }),
  center: {
    x: 0,
    y: 0,
    opacity: 1,
  },
  exit: ({ direction, isSameSection }: { direction: number; isSameSection: boolean }) => ({
    x: 0,
    y: direction < 0 ? (isSameSection ? '10vh' : '6vh') : direction > 0 ? (isSameSection ? '-10vh' : '-6vh') : 0,
    opacity: 0,
  })
};

export default function Presentation() {
  const [[index, direction, isSameSection], setPage] = useState([0, 0, false]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  // Permanent Auto-Lock & Startup Fullscreen across entire presentation
  useEffect(() => {
    const enforceFullscreen = () => {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    };

    // Attempt immediately on mount (works if user navigated with gesture)
    enforceFullscreen();

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setTimeout(enforceFullscreen, 10);
      }
    };

    const handleUserInteraction = () => {
      enforceFullscreen();
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    window.addEventListener('click', handleUserInteraction, { capture: true });
    window.addEventListener('pointerdown', handleUserInteraction, { capture: true });
    window.addEventListener('keydown', handleUserInteraction, { capture: true });

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      window.removeEventListener('click', handleUserInteraction, { capture: true });
      window.removeEventListener('pointerdown', handleUserInteraction, { capture: true });
      window.removeEventListener('keydown', handleUserInteraction, { capture: true });
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        setIsMenuOpen((prev) => !prev);
        return;
      }

      if (e.key === 'Escape') {
        if (isMenuOpen) {
          setIsMenuOpen(false);
          return;
        }
        e.preventDefault();
        if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen().catch(() => {});
        }
        return;
      }

      if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen().catch(() => {});
        }
        return;
      }

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
      }, 380);
    };

    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', onWheel, { passive: true });

    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', onWheel);
    };
  }, [go, goTo, isMenuOpen]);

  return (
    <main className="stage">
      <MobileBlocker />
      <AnimatePresence mode="wait" custom={{ direction, isSameSection }}>
        <motion.div
          key={index}
          className="slide-holder"
          style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
          custom={{ direction, isSameSection }}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            y: { duration: isSameSection ? 0.22 : 0.25, ease: [0.25, 1, 0.5, 1] },
            opacity: { duration: isSameSection ? 0.18 : 0.22, ease: 'easeOut' }
          }}
        >
          <Active n={index + 1} total={slides.length}/>
        </motion.div>
      </AnimatePresence>

      <SlideNavigationModal
        isOpen={isMenuOpen}
        slides={slides}
        currentIndex={index}
        onSelectSlide={(i) => {
          goTo(i);
          setIsMenuOpen(false);
        }}
        onClose={() => setIsMenuOpen(false)}
      />

      <div className="nav">
        <button onClick={() => go(-1)}>‹</button>
        <span>{index + 1}/{slides.length}</span>
        <button onClick={() => setIsMenuOpen((prev) => !prev)} style={{ fontWeight: 800, fontSize: '0.7vw', letterSpacing: '0.05em' }} title="Menu Présentateur (Touche M)">M</button>
        <button onClick={() => document.documentElement.requestFullscreen().catch(() => {})}>⛶</button>
        <button onClick={() => go(1)}>›</button>
      </div>
    </main>
  );
}

