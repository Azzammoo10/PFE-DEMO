import { Building2, AlertTriangle, Target, Network, Code2, CheckCircle2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Shell } from '../Presentation';
import type { SlideProps } from '../Presentation';

type PlanItem = {
  num: string;
  label: string;
  Icon: LucideIcon;
};

export default function SummarySlide({ n }: SlideProps) {
  const items: PlanItem[] = [
    {
      num: '01',
      label: 'Contexte : Périmètre AXA GBS',
      Icon: Building2,
    },
    {
      num: '02',
      label: 'Problématique et Objectifs',
      Icon: AlertTriangle,
    },
    {
      num: '03',
      label: 'Conception et Architecture',
      Icon: Network,
    },
    {
      num: '04',
      label: 'Validation Opérationnelle (PoC)',
      Icon: Code2,
    },
    {
      num: '05',
      label: 'Conclusion et Perspectives',
      Icon: CheckCircle2,
    },
  ];

  return (
    <Shell 
      section="SOMMAIRE" 
      title="Plan de la Présentation" 
      n={n}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        padding: '0.4vw 0'
      }}>
        {/* Centered Container with Generous Padding and Spacing */}
        <div style={{
          width: '45%',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.15vw'
        }}>
          {items.map((item, i) => {
            const Icon = item.Icon;

            return (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.65,
                  delay: i * 0.22,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ x: 6, boxShadow: '0 6px 20px rgba(15, 23, 42, 0.08)' }}
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #cbd5e1',
                  borderRadius: '10px',
                  padding: '0.7vw 1.4vw',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.3vw',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)'
                }}
              >
                {/* Accent Left Line */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '5px',
                  height: '100%',
                  background: '#0b66d5'
                }} />

                {/* Left Number Badge */}
                <div style={{
                  background: 'rgba(11, 102, 213, 0.08)',
                  border: '1.5px solid rgba(11, 102, 213, 0.25)',
                  color: '#0b66d5',
                  fontWeight: 900,
                  fontSize: '1.0vw',
                  borderRadius: '7px',
                  minWidth: '2.5vw',
                  height: '2.5vw',
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0
                }}>
                  {item.num}
                </div>

                {/* Left-Aligned Title */}
                <div style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  minWidth: 0
                }}>
                  <h3 style={{
                    margin: 0,
                    fontSize: '1.2vw',
                    fontWeight: 800,
                    color: '#0f172a',
                    lineHeight: 1.25,
                    letterSpacing: '-0.01em',
                    textAlign: 'left',
                    whiteSpace: 'nowrap'
                  }}>
                    {item.label}
                  </h3>
                </div>

                {/* Right Icon Container */}
                <div style={{
                  color: '#0b66d5',
                  background: '#f1f5f9',
                  padding: '0.35vw 0.5vw',
                  borderRadius: '7px',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <Icon size={20} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Shell>
  );
}
