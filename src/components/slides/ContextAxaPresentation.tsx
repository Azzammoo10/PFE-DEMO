'use client';

import { useEffect, useState } from 'react';
import { Shield, Users, Globe, Star, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Shell } from '../Presentation';
import type { SlideProps } from '../Presentation';

// Custom CountUp Component
function AnimatedCounter({ from, to, duration = 1.2, prefix = '', suffix = '' }: { from: number; to: number; duration?: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * (to - from) + from));
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [from, to, duration]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
}

export default function ContextAxaPresentation({ n }: SlideProps) {
  const stats = [
    {
      value: '#1',
      label: "Centralisation des opérations IT au service de la transformation globale d'AXA",
      icon: Shield,
      isText: true
    },
    {
      value: '118k - 156k',
      label: 'Collaborateurs accompagnés au quotidien dans le monde',
      icon: Globe,
      isCollaborators: true
    },
    {
      value: '+50',
      label: 'Pays couverts par les infrastructures GBS',
      icon: Users,
      isCountries: true
    },
  ];

  const serviceLines = [
    'Customer & Transition Services',
    'Corporate Function Services',
    'Insurance Operations Services',
    'Data, AI & Automation Services',
  ];

  const pillars = [
    { name: 'IAM & Secops', star: false },
    { name: 'Secaudit & Secgov', star: false },
    { name: 'Sectools', star: false },
    { name: 'SecTech', star: false },
    { name: 'Data Protection', star: true },
    { name: 'Pentest', star: false },
    { name: 'Emerging Tech', star: false },
    { name: 'Offensive Security', star: false },
  ];

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  const lineVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeInOut' }
    }
  };

  return (
    <Shell section="CONTEXTE" kicker="AXA GBS" title="AXA GBS & Organisation Cybersécurité" n={n} dense>
      <div style={{ display: 'grid', gridTemplateColumns: '28% 70%', gap: '2%', height: '100%', alignItems: 'stretch' }}>
        
        {/* Left Column: GBS Stats Card */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          style={{
            border: '2.5px solid #00008f',
            borderRadius: '16px',
            padding: '1.2vw',
            background: '#fff',
            boxShadow: '0 12px 28px rgba(0,0,143,0.06)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6vw', marginBottom: '1vw' }}>
              <h3 style={{ margin: 0, fontSize: '1.4vw', fontWeight: 900, color: '#00008f', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                AXA GBS
              </h3>
              <div style={{ flex: 1, height: '3px', background: 'linear-gradient(90deg, #00008f, transparent)' }} />
            </div>
            <p style={{ margin: '0 0 1vw 0', fontSize: '0.8vw', color: '#52657d', lineHeight: '1.4' }}>
              Global Business Services (GBS) centralise les services informatiques, technologiques et de sécurité du groupe AXA.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2vw', marginTop: 'auto' }}>
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div 
                  key={idx} 
                  variants={itemVariants}
                  style={{ display: 'flex', gap: '0.8vw', alignItems: 'flex-start' }}
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.15 + 0.2, type: 'spring', stiffness: 200 }}
                    style={{
                      background: 'rgba(0, 0, 143, 0.05)',
                      border: '1px solid rgba(0, 0, 143, 0.15)',
                      borderRadius: '10px',
                      padding: '0.5vw',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#00008f',
                      flexShrink: 0
                    }}
                  >
                    <Icon size={18} />
                  </motion.div>
                  <div>
                    <h4 style={{ margin: '0 0 0.1vw 0', fontSize: '1.25vw', fontWeight: 900, color: '#00008f', lineHeight: 1.1 }}>
                      {stat.isText && <span>#1</span>}
                      {stat.isCollaborators && (
                        <span>
                          <AnimatedCounter from={0} to={118} duration={1.2} />k à{' '}
                          <AnimatedCounter from={0} to={156} duration={1.2} />k
                        </span>
                      )}
                      {stat.isCountries && (
                        <AnimatedCounter from={0} to={50} duration={1.2} prefix="+" />
                      )}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.7vw', color: '#334155', lineHeight: '1.3', fontWeight: 600 }}>
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Column: Organizational Hierarchy Diagram */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          style={{
            border: '1.5px solid #cbd6e7',
            borderRadius: '16px',
            background: '#fbfdff',
            padding: '1vw 1.2vw',
            boxShadow: '0 8px 24px rgba(7,27,63,0.03)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Group Hierarchy - Top level */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3vw', width: '100%' }}>
              <motion.div 
                variants={itemVariants}
                style={{
                  background: '#00008f',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '0.9vw',
                  padding: '0.4vw 1.2vw',
                  borderRadius: '8px',
                  textAlign: 'center',
                  boxShadow: '0 4px 10px rgba(0,0,143,0.15)',
                  minWidth: '9vw'
                }}
              >
                AXA GROUP
              </motion.div>

              <div style={{ color: '#00008f', display: 'flex', alignItems: 'center', zIndex: 5 }}>
                <ArrowDown size={16} style={{ transform: 'rotate(-90deg)' }} />
              </div>

              <motion.div 
                variants={itemVariants}
                style={{
                  background: '#102240',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '0.9vw',
                  padding: '0.4vw 1.2vw',
                  borderRadius: '8px',
                  textAlign: 'center',
                  boxShadow: '0 4px 10px rgba(16,34,64,0.15)',
                  minWidth: '9vw'
                }}
              >
                AXA GBS
              </motion.div>
            </div>
          </div>

          {/* Dotted connecting line from GBS to branch */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '0.2vw 0' }}>
            <svg width="2" height="15" style={{ overflow: 'visible' }}>
              <motion.line x1="0" y1="0" x2="0" y2="15" stroke="#cbd6e7" strokeWidth="2" strokeDasharray="3,3" variants={lineVariants} />
            </svg>
          </div>

          {/* Service Lines Grid + Highlighted Branch */}
          <div style={{ display: 'grid', gridTemplateColumns: '50% 46%', gap: '4%', alignItems: 'center' }}>
            {/* Service Lines */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5vw' }}>
              {serviceLines.map((line, idx) => (
                <motion.div 
                  key={idx} 
                  variants={itemVariants}
                  style={{
                    background: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '0.4vw',
                    fontSize: '0.7vw',
                    fontWeight: 600,
                    color: '#475569',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.01)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    minHeight: '2.2vw'
                  }}
                >
                  {line}
                </motion.div>
              ))}
            </div>

            {/* Target Branch Box (Technology & Security Services) */}
            <motion.div 
              variants={itemVariants}
              style={{
                border: '2px solid #c82737',
                background: '#fff5f5',
                borderRadius: '10px',
                padding: '0.5vw 0.8vw',
                boxShadow: '0 6px 16px rgba(200,39,55,0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.1vw',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative'
              }}
            >
              <span style={{ color: '#c82737', fontWeight: 800, fontSize: '0.6vw', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Branche d’accueil
              </span>
              <strong style={{ color: '#102240', fontSize: '0.8vw', fontWeight: 800 }}>
                Technology & Security Services
              </strong>
            </motion.div>
          </div>

          {/* Dotted connecting line from branch to pillars */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '0.2vw 0' }}>
            <svg width="2" height="15" style={{ overflow: 'visible' }}>
              <motion.line x1="0" y1="0" x2="0" y2="15" stroke="#cbd6e7" strokeWidth="2" strokeDasharray="3,3" variants={lineVariants} />
            </svg>
          </div>

          {/* Stars Box Header */}
          <motion.div 
            variants={itemVariants}
            style={{
              background: '#102240',
              color: '#fff',
              borderRadius: '8px',
              padding: '0.3vw 1vw',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4vw',
              justifyContent: 'center',
              fontSize: '0.75vw',
              fontWeight: 700,
              boxShadow: '0 4px 8px rgba(16,34,64,0.1)',
              width: 'max-content',
              margin: '0 auto 0.4vw auto'
            }}
          >
            <Star size={11} fill="#ffd166" color="#ffd166" />
            <span>Piliers Cybersécurité</span>
          </motion.div>

          {/* Pillars List (Fanning out 8 cards) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.4vw' }}>
            {pillars.map((p, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                whileHover={{ y: -3, scale: 1.02, boxShadow: '0 4px 10px rgba(0,0,0,0.06)' }}
                style={{
                  background: p.star ? 'rgba(0, 0, 143, 0.08)' : '#fff',
                  border: p.star ? '2px solid #00008f' : '1px solid #cbd6e7',
                  borderRadius: '8px',
                  padding: '0.4vw',
                  textAlign: 'center',
                  fontSize: '0.65vw',
                  fontWeight: p.star ? 800 : 600,
                  color: p.star ? '#00008f' : '#1e293b',
                  boxShadow: p.star ? '0 4px 8px rgba(0,0,143,0.1)' : '0 2px 4px rgba(0,0,0,0.01)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.2vw',
                  minHeight: '1.9vw',
                  cursor: 'default',
                  transition: 'background-color 0.2s, border-color 0.2s'
                }}
              >
                {p.star && <Star size={9} fill="#00008f" color="#00008f" />}
                <span>{p.name}</span>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </Shell>
  );
}
