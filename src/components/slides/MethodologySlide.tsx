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
      title: 'Infrastructure & Lab DLP',
      icon: Network,
      tag: 'VMs & Réseau Validé',
      details: [
        '4 VMs (Win11, Ubuntu, Kali, Wazuh)',
        'Isolation VNet 192.168.100.x',
        'Sondes Endpoint & Proxies'
      ],
      cardCustom: 1,
      chevronCustom: 2,
    },
    {
      id: '02',
      title: 'Développement DLP Custom',
      icon: Code2,
      tag: 'API & Micro-Agents',
      details: [
        'Micro-Agents (RAM, USB, Net)',
        'API Flask REST Ingestion :5000',
        'Engine & Scoring Règles JSON'
      ],
      cardCustom: 3,
      chevronCustom: 4,
    },
    {
      id: '03',
      title: 'Validation Offensive Kali',
      icon: AlertTriangle,
      tag: 'Scénarios Pentest',
      details: [
        'Attaques Exfiltration & Payloads',
        'Reverse Shell TCP & Data Injection',
        'Validation Blocage & Marquage'
      ],
      cardCustom: 5,
      chevronCustom: 6,
    },
    {
      id: '04',
      title: 'Supervision SOC Wazuh',
      icon: Gauge,
      tag: 'SIEM & Active Response',
      details: [
        'Manager SIEM Central Wazuh',
        'Active Response (Blocage Auto)',
        'Corrélation MITRE ATT&CK'
      ],
      cardCustom: 7,
      chevronCustom: 8,
    },
    {
      id: '05',
      title: 'Consoles Ops & Release',
      icon: LayoutDashboard,
      tag: 'UI Unifiée & Recette',
      details: [
        'Console Web DLP & Analytics',
        'Console LabelGuard UI Unifiée',
        'Recette Finale & Doc PFE'
      ],
      cardCustom: 9,
      chevronCustom: null,
    }
  ];

  if (!isMounted) {
    return <div className="p-6 text-slate-500">Chargement de la méthodologie...</div>;
  }

  return (
    <Shell 
      section="MÉTHODOLOGIE" 
      pulseLabel="Méthodologie" 
      title="Démarche d'Ingénierie du Projet" 
      n={n} 
      dense
      keywords={['Agile / Scrum (5 Sprints)', '4 VMs Virtualisées', '5 Canaux', '2 Scénarios Pentest', '3 Plateformes Ops']}
    >
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8vw',
        width: '100%', 
        height: '100%', 
        justifyContent: 'space-between',
        padding: '0 0.8vw',
        overflow: 'hidden'
      }}>
        
        {/* Top Header agile principle banner */}
        <motion.div 
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate="visible"
          style={{
            background: 'linear-gradient(90deg, rgba(0, 0, 143, 0.06) 0%, rgba(0, 0, 143, 0.01) 100%)',
            borderLeft: '4px solid #00008f',
            borderRadius: '10px',
            padding: '0.6vw 1.2vw',
            display: 'flex',
            alignItems: 'center',
            gap: '1vw',
            boxShadow: '0 4px 12px rgba(0,0,143,0.02)',
            flexShrink: 0
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
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <strong style={{ fontSize: '1.15vw', fontWeight: 900, color: '#00008f' }}>
              Approche Itérative Agile / Scrum (5 Sprints de 2 à 3 Semaines)
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
          padding: '0.4vw 0',
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
                  whileHover={{ y: -4, boxShadow: '0 14px 30px rgba(0,0,143,0.11)' }}
                  style={{
                    width: '16.8vw',
                    height: '21.5vw',
                    background: '#ffffff',
                    borderWidth: '5px 1.5px 1.5px 1.5px',
                    borderStyle: 'solid',
                    borderColor: '#00008f #cbd6e7 #cbd6e7 #cbd6e7',
                    borderRadius: '14px',
                    padding: '1.1vw 1vw',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
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
                      fontSize: '0.75vw',
                      fontWeight: 900,
                      color: '#ffffff',
                      background: '#00008f',
                      padding: '0.2vw 0.65vw',
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
                    margin: '0.5vw 0 0.4vw 0',
                    fontSize: '1.05vw',
                    fontWeight: 900,
                    color: '#0f172a',
                    lineHeight: 1.2
                  }}>
                    {p.title}
                  </h5>

                  {/* 3 Detail Bullet Points - BIGGER & CLEARER */}
                  <ul style={{
                    margin: '0.4vw 0',
                    paddingLeft: '1vw',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.55vw',
                    flex: 1
                  }}>
                    {p.details.map((pt, idx) => (
                      <li key={idx} style={{
                        fontSize: '0.78vw',
                        fontWeight: 700,
                        color: '#1e293b',
                        lineHeight: 1.3
                      }}>
                        {pt}
                      </li>
                    ))}
                  </ul>

                  {/* Tag / Delivered Status */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.4vw', 
                    width: '100%',
                    background: '#10b98112',
                    padding: '0.35vw 0.6vw',
                    borderRadius: '8px',
                    border: '1px solid #10b98130',
                    marginTop: 'auto'
                  }}>
                    <CheckCircle2 size={15} className="text-[#059669] flex-shrink-0" />
                    <span style={{ 
                      fontSize: '0.78vw', 
                      fontWeight: 900, 
                      color: '#047857',
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

      </div>
    </Shell>
  );
}