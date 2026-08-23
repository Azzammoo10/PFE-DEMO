import { useState, useEffect } from 'react';
import { Building2, AlertTriangle, Target, Network, Code2, CheckCircle2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Shell } from '../Presentation';
import type { SlideProps } from '../Presentation';

type PlanItem = {
  num: string;
  label: string;
  desc: string;
  Icon: LucideIcon;
};

export default function SummarySlide({ n }: SlideProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const items: PlanItem[] = [
    {
      num: '01',
      label: 'Contexte & Enjeux',
      desc: 'Présentation AXA GBS & fondements de la DLP',
      Icon: Building2,
    },
    {
      num: '02',
      label: 'Problématique & Objectifs',
      desc: 'Défis de fuite de données et objectifs clés du projet',
      Icon: AlertTriangle,
    },
    {
      num: '03',
      label: 'Méthodologie & Démarche',
      desc: "Cadrage projet et méthodologie d'ingénierie",
      Icon: Target,
    },
    {
      num: '04',
      label: 'Conception & Architecture',
      desc: 'Architecture DLP Hybride (Sondes Windows & API Flask)',
      Icon: Network,
    },
    {
      num: '05',
      label: 'Réalisation & Démonstration',
      desc: 'Mise en œuvre technique, supervision SOC & démo',
      Icon: Code2,
    },
    {
      num: '06',
      label: 'Conclusion & Perspectives',
      desc: "Bilan Zero Trust, perspectives d'évolution & remerciements",
      Icon: CheckCircle2,
    },
  ];

  // Sequential step animation (1 -> 2 -> 3 -> 4 -> 5 -> 6 and stops on 6)
  useEffect(() => {
    if (hoveredIndex !== null) return;
    const timer = setInterval(() => {
      setActiveStepIndex((prev) => {
        if (prev >= items.length - 1) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 1800);
    return () => clearInterval(timer);
  }, [hoveredIndex, items.length]);

  return (
    <Shell 
      section="SOMMAIRE" 
      title="Plan & Déroulement de la Soutenance" 
      n={n}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        padding: '0 0.5vw'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.4vw 1.8vw'
        }}>
          {items.map((item, i) => {
            const Icon = item.Icon;
            const isActive = hoveredIndex !== null ? hoveredIndex === i : activeStepIndex === i;

            return (
              <motion.div
                key={item.num}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: 15 }}
                animate={{
                  opacity: 1,
                  y: isActive ? -4 : 0,
                  scale: isActive ? 1.025 : 1,
                  boxShadow: isActive
                    ? '0 10px 28px -4px rgba(11, 102, 213, 0.35), 0 0 16px rgba(11, 102, 213, 0.18)'
                    : '0 4px 14px rgba(15, 23, 42, 0.04)'
                }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                style={{
                  background: isActive
                    ? 'linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%)'
                    : '#ffffff',
                  border: isActive
                    ? '2px solid #0b66d5'
                    : '1.5px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '1.3vw 1.6vw',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.3vw',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  willChange: 'transform, box-shadow',
                  transform: 'translateZ(0)'
                }}
              >
                {/* Accent Left Line */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: isActive ? '6px' : '4.5px',
                  height: '100%',
                  background: isActive ? 'linear-gradient(180deg, #0b66d5, #38bdf8)' : '#0b66d5',
                  transition: 'all 0.3s ease'
                }} />

                {/* Number Badge */}
                <div style={{
                  background: isActive ? '#0b66d5' : 'rgba(11, 102, 213, 0.08)',
                  border: isActive ? '1px solid #0b66d5' : '1px solid rgba(11, 102, 213, 0.2)',
                  color: isActive ? '#ffffff' : '#0b66d5',
                  fontWeight: 900,
                  fontSize: '1.05vw',
                  borderRadius: '11px',
                  minWidth: '2.9vw',
                  height: '2.9vw',
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0,
                  boxShadow: isActive ? '0 4px 12px rgba(11, 102, 213, 0.4)' : 'none',
                  transition: 'all 0.3s ease'
                }}>
                  {item.num}
                </div>

                {/* Text Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5vw' }}>
                    <h3 style={{
                      margin: 0,
                      fontSize: '1.12vw',
                      fontWeight: 800,
                      color: isActive ? '#0b66d5' : '#0f172a',
                      lineHeight: 1.25,
                      letterSpacing: '-0.01em',
                      transition: 'color 0.3s ease'
                    }}>
                      {item.label}
                    </h3>

                    {/* Active Step Indicator */}
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                          fontSize: '0.62vw',
                          fontWeight: 900,
                          background: '#0b66d5',
                          color: '#ffffff',
                          borderRadius: '6px',
                          padding: '0.1vw 0.4vw',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em'
                        }}
                      >
                        Étape En Cours
                      </motion.span>
                    )}
                  </div>
                  <p style={{
                    margin: '0.35vw 0 0 0',
                    fontSize: '0.86vw',
                    color: isActive ? '#334155' : '#475569',
                    fontWeight: isActive ? 600 : 500,
                    lineHeight: 1.35
                  }}>
                    {item.desc}
                  </p>
                </div>

                {/* Icon Container */}
                <div style={{
                  background: isActive ? '#0b66d5' : '#f8fafc',
                  border: isActive ? '1px solid #0b66d5' : '1px solid #e2e8f0',
                  color: isActive ? '#ffffff' : '#0b66d5',
                  borderRadius: '12px',
                  padding: '0.7vw',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.3s ease'
                }}>
                  <Icon size={24} color={isActive ? '#ffffff' : '#0b66d5'} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Shell>
  );
}






