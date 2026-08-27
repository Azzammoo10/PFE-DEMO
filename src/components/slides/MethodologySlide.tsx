'use client';

import { motion } from 'framer-motion';
import { useSyncExternalStore } from 'react';
import { 
  Network, 
  Code2, 
  AlertTriangle, 
  Gauge, 
  LayoutDashboard, 
  Zap, 
  RotateCw, 
  CheckCircle2, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Shell, fadeUp, popIn } from '../Presentation';
import type { SlideProps } from '../Presentation';

const emptySubscribe = () => () => {};

export default function MethodologySlide({ n }: SlideProps) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const steps = [
    {
      id: '01',
      title: 'Infrastructure & Laboratoire',
      icon: Network,
      tag: 'VMs & Réseau',
      cardCustom: 1,
      chevronCustom: 2,
    },
    {
      id: '02',
      title: 'Développement DLP Custom',
      icon: Code2,
      tag: 'API & Sondes',
      cardCustom: 3,
      chevronCustom: 4,
    },
    {
      id: '03',
      title: 'Validation & Tests d\'Attaque',
      icon: AlertTriangle,
      tag: 'Scénarios Kali',
      cardCustom: 5,
      chevronCustom: 6,
    },
    {
      id: '04',
      title: 'Supervision & Triage SOC',
      icon: Gauge,
      tag: 'Console Web',
      cardCustom: 7,
      chevronCustom: 8,
    },
    {
      id: '05',
      title: 'Plateformes & Suivi DLP',
      icon: LayoutDashboard,
      tag: 'Release Finale',
      cardCustom: 9,
      chevronCustom: null,
    }
  ];

  const metrics = [
    { label: '4 VMs', tag: 'Environnement Virtuel', custom: 10 },
    { label: '5 Canaux', tag: 'Couverture DLP', custom: 11 },
    { label: '2 Scénarios', tag: 'Attaques Offensives', custom: 12 },
    { label: '3 Plateformes', tag: 'Outillage Développé', custom: 13 }
  ];

  if (!isMounted) {
    return <div className="p-6 text-slate-500">Chargement de la méthodologie...</div>;
  }

  return (
    <Shell 
      section="MÉTHODOLOGIE" 
      pulseLabel="Méthodologie" 
      title="Méthodologie et Organisation du Projet" 
      n={n} 
      dense
    >
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2vw',
        width: '100%', 
        height: '100%', 
        justifyContent: 'space-between',
        padding: '0 1.5vw',
        overflow: 'hidden'
      }}>
        
        {/* Top Header agile principle banner */}
        <motion.div 
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate="visible"
          style={{
            background: 'linear-gradient(90deg, rgba(0, 0, 143, 0.05) 0%, rgba(0, 0, 143, 0.01) 100%)',
            borderLeft: '4px solid #00008f',
            borderRadius: '10px',
            padding: '0.8vw 1.4vw',
            display: 'flex',
            alignItems: 'center',
            gap: '1.2vw',
            boxShadow: '0 4px 12px rgba(0,0,143,0.02)'
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background: '#00008f10',
              padding: '0.6vw',
              borderRadius: '50%',
              color: '#00008f',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Zap size={24} className="text-[#00008f]" />
          </motion.div>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <strong style={{ fontSize: '1.2vw', fontWeight: 900, color: '#00008f' }}>
              Approche Itérative Agile / Scrum (Sprints de 2 à 3 Semaines)
            </strong>
          </div>
        </motion.div>

        {/* Middle Agile Kanban Sprint Board */}
        <div style={{ 
          display: 'flex', 
          width: '100%', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          position: 'relative',
          padding: '0.8vw 0',
          flex: 1,
        }}>

          {steps.map((p) => {
            const Icon = p.icon;
            return (
              <div 
                key={`sprint-${p.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flex: 1,
                  position: 'relative',
                  justifyContent: 'center'
                }}
              >
                {/* Sprint Kanban Card */}
                <motion.div
                  variants={popIn}
                  custom={p.cardCustom}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -4, boxShadow: '0 12px 28px rgba(0,0,143,0.08)' }}
                  style={{
                    width: '15.5vw',
                    height: '11.5vw',
                    background: '#ffffff',
                    borderWidth: '5px 1.5px 1.5px 1.5px',
                    borderStyle: 'solid',
                    borderColor: '#00008f #cbd6e7 #cbd6e7 #cbd6e7',
                    borderRadius: '14px',
                    padding: '1.2vw 1.1vw',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    cursor: 'pointer',
                    zIndex: 5
                  }}
                >
                  {/* Card Header row */}
                  <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '0.68vw',
                      fontWeight: 900,
                      color: '#ffffff',
                      background: '#00008f',
                      padding: '0.2vw 0.6vw',
                      borderRadius: '6px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Sprint {p.id}
                    </span>
                    <div style={{
                      background: '#eff6ff',
                      padding: '0.45vw',
                      borderRadius: '8px',
                      color: '#00008f',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon size={20} />
                    </div>
                  </div>

                  {/* Main Title */}
                  <h5 style={{
                    margin: '0.4vw 0',
                    fontSize: '1.05vw',
                    fontWeight: 900,
                    color: '#0f172a',
                    lineHeight: 1.25
                  }}>
                    {p.title}
                  </h5>

                  {/* Tag / Delivered Status */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.3vw', 
                    width: '100%',
                    background: '#10b9810d',
                    padding: '0.35vw 0.6vw',
                    borderRadius: '8px',
                    border: '1px solid #10b98125'
                  }}>
                    <CheckCircle2 size={14} className="text-[#10b981] flex-shrink-0" />
                    <span style={{ 
                      fontSize: '0.75vw', 
                      fontWeight: 800, 
                      color: '#059669',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {p.tag}
                    </span>
                  </div>
                </motion.div>

                {/* Transition chevron between cards */}
                {p.chevronCustom && (
                  <motion.div
                    variants={popIn}
                    custom={p.chevronCustom}
                    initial="hidden"
                    animate="visible"
                    style={{
                      position: 'absolute',
                      right: '-0.75vw',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 4,
                      pointerEvents: 'none'
                    }}
                  >
                    <ChevronRight size={24} className="text-[#94a3b8] stroke-[3]" />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Key Deliverables / Concrete Results Mini-Section */}
        <div style={{
          paddingTop: '0.8vw',
          borderTop: '1px dashed #cbd6e7',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6vw',
          width: '100%'
        }}>
          {/* Section title */}
          <motion.div 
            variants={fadeUp}
            custom={60}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5vw' }}
          >
            <Sparkles size={16} className="text-[#00008f]" />
            <h4 style={{ 
              margin: 0, 
              fontSize: '0.9vw', 
              fontWeight: 900, 
              color: '#00008f', 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em', 
              textAlign: 'left' 
            }}>
              Livrables Opérationnels
            </h4>
          </motion.div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1.2vw' }}>
            {metrics.map((m) => (
              <motion.div
                key={m.label}
                variants={fadeUp}
                custom={m.custom}
                initial="hidden"
                animate="visible"
                style={{
                  flex: 1,
                  background: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '0.6vw 1vw',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                }}
              >
                <strong style={{ fontSize: '1.1vw', fontWeight: 900, color: '#00008f' }}>
                  {m.label}
                </strong>
                <span style={{ fontSize: '0.75vw', fontWeight: 800, color: '#475569', background: '#f1f5f9', padding: '0.2vw 0.5vw', borderRadius: '6px' }}>
                  {m.tag}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </Shell>
  );
}