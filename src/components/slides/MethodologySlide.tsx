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
      title: 'Lab Infra',
      icon: Network,
      tasks: ['VMware Host-Only', '4 VMs déployées', "Plan d'IPs configuré"],
      increment: 'Réseau & VMs OK',
      cardCustom: 25,
      chevronCustom: 28,
      elementDelay: 1.25
    },
    {
      id: '02',
      title: 'DLP Custom',
      icon: Code2,
      tasks: ['API Manager Flask', 'Sondes agents Python', 'Hooking Windows API'],
      increment: 'Sondes & API OK',
      cardCustom: 32,
      chevronCustom: 35,
      elementDelay: 1.53
    },
    {
      id: '03',
      title: 'Validation',
      icon: AlertTriangle,
      tasks: ['Simulations Kali', 'Fuites SCP & Mail', 'Reverse Shells'],
      increment: 'Vecteurs Testés',
      cardCustom: 39,
      chevronCustom: 42,
      elementDelay: 1.81
    },
    {
      id: '04',
      title: 'Supervision',
      icon: Gauge,
      tasks: ['SOC Console Flask', 'Triage Alertes', 'Case Management'],
      increment: 'Console Web OK',
      cardCustom: 46,
      chevronCustom: 49,
      elementDelay: 2.09
    },
    {
      id: '05',
      title: 'Plateformes',
      icon: LayoutDashboard,
      tasks: ['DLP Monitor Tool', 'OneTrust Tracker', 'Suivi opérationnel'],
      increment: 'Release Finale',
      cardCustom: 53,
      chevronCustom: null,
      elementDelay: 2.37
    }
  ];

  const metrics = [
    { label: '4 VMs', desc: 'Ubuntu, AXA AMS & GO, Kali', custom: 64 },
    { label: '5 Canaux', desc: 'USB, Mail, File, Cloud, Presse-papiers', custom: 67 },
    { label: '4 Scénarios', desc: "d'attaques offensives Kali", custom: 70 },
    { label: '2 Plateformes', desc: 'DLP Monitor & OneTrust Tracker', custom: 73 }
  ];

  if (!isMounted) {
    return <div className="p-6 text-slate-500">Chargement de la méthodologie...</div>;
  }

  return (
    <Shell 
      section="MÉTHODOLOGIE" 
      pulseLabel="Méthodologie" 
      title="Sprints et Démarche Projet Agile" 
      n={n} 
      dense
    >
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '1vw',
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
            background: 'linear-gradient(90deg, rgba(0, 0, 143, 0.04) 0%, rgba(0, 0, 143, 0.01) 100%)',
            borderLeft: '4px solid #00008f',
            borderRadius: '8px',
            padding: '0.6vw 1.2vw',
            display: 'flex',
            alignItems: 'center',
            gap: '1.2vw',
            boxShadow: '0 4px 12px rgba(0,0,143,0.01)'
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background: '#00008f10',
              padding: '0.5vw',
              borderRadius: '50%',
              color: '#00008f',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Zap size={22} className="text-[#00008f]" />
          </motion.div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1vw', textAlign: 'left' }}>
            <strong style={{ fontSize: '1.05vw', fontWeight: 900, color: '#00008f' }}>
              Approche Itérative Scrum : Sprints de 2-3 Semaines
            </strong>
            <span style={{ fontSize: '0.85vw', fontWeight: 600, color: '#475569' }}>
              Chaque sprint valide une brique fonctionnelle complète, de l&apos;infrastructure réseau aux plateformes de suivi opérationnel.
            </span>
          </div>
        </motion.div>

        {/* Middle Agile Kanban Sprint Board */}
        <div style={{ 
          display: 'flex', 
          width: '100%', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          position: 'relative',
          padding: '1.5vw 0',
          flex: 1,
          minHeight: '14.5vw'
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
                  whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.04)' }}
                  style={{
                    width: '15vw',
                    height: '13.5vw',
                    background: '#ffffff',
                    border: '1.5px solid #cbd6e7',
                    borderTop: '5px solid #00008f',
                    borderRadius: '12px',
                    padding: '0.8vw 1vw',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.01)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    textAlign: 'left',
                    cursor: 'pointer',
                    zIndex: 5
                  }}
                >
                  {/* Card Header row */}
                  <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4vw' }}>
                    <span style={{
                      fontSize: '0.65vw',
                      fontWeight: 900,
                      color: '#ffffff',
                      background: '#00008f',
                      padding: '0.15vw 0.5vw',
                      borderRadius: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Sprint {p.id}
                    </span>
                    <Icon size={16} className="text-[#00008f]" />
                  </div>

                  {/* Title */}
                  <h5 style={{
                    margin: '0.2vw 0 0.4vw 0',
                    fontSize: '0.9vw',
                    fontWeight: 900,
                    color: '#00008f',
                    lineHeight: 1.2
                  }}>
                    {p.title}
                  </h5>

                  {/* Tasks List */}
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '0.3vw', 
                    width: '100%',
                    margin: '0.2vw 0',
                    flex: 1
                  }}>
                    {p.tasks.map((task, tidx) => (
                      <span 
                        key={tidx}
                        style={{ 
                          fontSize: '0.8vw', 
                          fontWeight: 600, 
                          color: '#475569', 
                          lineHeight: 1.25,
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.25vw'
                        }}
                      >
                        • {task}
                      </span>
                    ))}
                  </div>

                  {/* Agile loop indicator (Daily & Retrospective) - fades in second layer */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: p.elementDelay, duration: 0.3 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3vw',
                      width: '100%',
                      padding: '0.3vw 0',
                      borderTop: '1px solid #f1f5f9',
                      borderBottom: '1px solid #f1f5f9',
                      marginBottom: '0.4vw'
                    }}
                  >
                    <RotateCw size={10} className="text-[#00008f] animate-spin" style={{ animationDuration: '6s' }} />
                    <span style={{ fontSize: '0.55vw', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>
                      Daily Sync & Loop
                    </span>
                  </motion.div>

                  {/* Increment delivered - fades in second layer */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: p.elementDelay + 0.1, duration: 0.3 }}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.25vw', 
                      width: '100%',
                      background: '#10b9810a',
                      padding: '0.2vw 0.4vw',
                      borderRadius: '6px',
                      border: '1px solid #10b9811a'
                    }}
                  >
                    <CheckCircle2 size={12} className="text-[#10b981] fill-[#10b981]/10 flex-shrink-0" />
                    <span style={{ 
                      fontSize: '0.7vw', 
                      fontWeight: 800, 
                      color: '#10b981',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {p.increment}
                    </span>
                  </motion.div>
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
                      right: '-0.7vw',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 4,
                      pointerEvents: 'none'
                    }}
                  >
                    <ChevronRight size={22} className="text-[#cbd6e7] stroke-[3]" />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Key Deliverables / Concrete Results Mini-Section */}
        <div style={{
          marginTop: '0.6vw',
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
              fontSize: '0.85vw', 
              fontWeight: 900, 
              color: '#00008f', 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em', 
              textAlign: 'left' 
            }}>
              Résultats Opérationnels Clés Livrés
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
                  background: '#00008f04',
                  border: '1px solid #00008f0d',
                  borderRadius: '8px',
                  padding: '0.5vw 1vw',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  textAlign: 'left'
                }}
              >
                <strong style={{ fontSize: '1vw', fontWeight: 900, color: '#00008f' }}>
                  {m.label}
                </strong>
                <span style={{ fontSize: '0.8vw', fontWeight: 600, color: '#475569', marginTop: '0.1vw' }}>
                  {m.desc}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </Shell>
  );
}