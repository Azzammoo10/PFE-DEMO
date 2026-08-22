import { Building2, AlertTriangle, Target, Network, Code2, CheckCircle2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Shell, popIn } from '../Presentation';
import type { SlideProps } from '../Presentation';

import type { Variants } from 'framer-motion';

type PlanItem = {
  num: string;
  label: string;
  desc: string;
  Icon: LucideIcon;
};

const INITIAL_DELAY = 1.15; // Attendre la fin de l'animation d'overlay "SOMMAIRE" au milieu (1.15s)

const cardVariant: Variants = {
  hidden: { opacity: 0, x: -30, y: 25, scale: 0.92, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      delay: INITIAL_DELAY + 0.22 * i,
      duration: 0.65,
      type: 'spring',
      stiffness: 130,
      damping: 16
    }
  })
};

export default function SummarySlide({ n }: SlideProps) {
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

  return (
    <Shell 
      section="SOMMAIRE" 
      kicker="Vue d'ensemble" 
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
            return (
              <motion.div
                key={item.num}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariant}
                whileHover={{ scale: 1.015, y: -2 }}
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '1.3vw 1.6vw',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.3vw',
                  boxShadow: '0 4px 14px rgba(15, 23, 42, 0.04)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease'
                }}
              >
                {/* Accent Left Line */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '4.5px',
                  height: '100%',
                  background: '#0b66d5'
                }} />

                {/* Number Badge */}
                <div style={{
                  background: 'rgba(11, 102, 213, 0.08)',
                  border: '1px solid rgba(11, 102, 213, 0.2)',
                  color: '#0b66d5',
                  fontWeight: 800,
                  fontSize: '1.05vw',
                  borderRadius: '11px',
                  minWidth: '2.9vw',
                  height: '2.9vw',
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0
                }}>
                  {item.num}
                </div>

                {/* Text Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{
                    margin: 0,
                    fontSize: '1.12vw',
                    fontWeight: 800,
                    color: '#0f172a',
                    lineHeight: 1.25,
                    letterSpacing: '-0.01em'
                  }}>
                    {item.label}
                  </h3>
                  <p style={{
                    margin: '0.35vw 0 0 0',
                    fontSize: '0.86vw',
                    color: '#475569',
                    fontWeight: 500,
                    lineHeight: 1.35
                  }}>
                    {item.desc}
                  </p>
                </div>

                {/* Icon Container */}
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  color: '#0b66d5',
                  borderRadius: '12px',
                  padding: '0.7vw',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={24} color="#0b66d5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Shell>
  );
}





