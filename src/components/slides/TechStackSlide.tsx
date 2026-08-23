'use client';

import { useSyncExternalStore } from 'react';
import { motion } from 'framer-motion';
import { 
  Monitor, 
  Server, 
  Code2
} from 'lucide-react';
import { Shell, popIn } from '../Presentation';
import type { SlideProps } from '../Presentation';

const emptySubscribe = () => () => {};
const INITIAL_DELAY = 1.15; // Attendre la fin de l'overlay (1.15s)

// Official Brand & Technology Vector Logos
const TechLogos = {
  Python: () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M11.91 2C6.98 2 7.27 4.14 7.27 4.14V6.3H12V7H5.27S2 6.64 2 11.57c0 4.94 2.87 4.72 2.87 4.72h1.71v-2.42s-.09-2.87 2.87-2.87h4.86s2.72.04 2.72-2.65V4.72S17.41 2 11.91 2zM9.25 3.75a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z" fill="#3776AB"/>
      <path d="M12.09 22c4.93 0 4.64-2.14 4.64-2.14v-2.16H12V17h6.73s3.27.36 3.27-4.57c0-4.94-2.87-4.72-2.87-4.72h-1.71v2.42s.09 2.87-2.87 2.87h-4.86s-2.72-.04-2.72 2.65v3.71S6.59 22 12.09 22zm2.66-1.75a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8z" fill="#FFD43B"/>
    </svg>
  ),
  Watchdog: () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="4" fill="#f0f4ff" stroke="#0b66d5" strokeWidth="1.5"/>
      <path d="M7 9.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm7 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z" fill="#0b66d5"/>
      <path d="M12 11.5a1 1 0 0 0-1 1v1.5a1 1 0 0 0 2 0v-1.5a1 1 0 0 0-1-1z" fill="#0b66d5"/>
      <path d="M9.5 16c1.5 1.2 3.5 1.2 5 0" stroke="#0b66d5" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  PyWin32: () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M3 3h8.5v8.5H3zM12.5 3H21v8.5h-8.5zM3 12.5h8.5V21H3zM12.5 12.5H21V21h-8.5z" fill="#0078D4"/>
    </svg>
  ),
  FlaskExpress: () => (
    // eslint-disable-next-line @next/next/no-img-element
    <img 
      src="/flask-logo.svg" 
      alt="Flask" 
      style={{ width: '2.2vw', height: '2.2vw', objectFit: 'contain' }} 
    />
  ),
  Pandas: () => (
    // eslint-disable-next-line @next/next/no-img-element
    <img 
      src="/image copy 6.png" 
      alt="Pandas" 
      style={{ width: '2.2vw', height: '2.2vw', objectFit: 'contain' }} 
    />
  ),
  Mitmproxy: () => (
    // eslint-disable-next-line @next/next/no-img-element
    <img 
      src="/image copy 5.png" 
      alt="Mitmproxy" 
      style={{ width: '2.2vw', height: '2.2vw', objectFit: 'contain' }} 
    />
  ),
  ReactTS: () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="2.2" fill="#61DAFB"/>
      <g stroke="#61DAFB" strokeWidth="1.3">
        <ellipse cx="12" cy="12" rx="9" ry="3.5"/>
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)"/>
      </g>
    </svg>
  ),
  Ollama: () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#0f172a" />
      <path d="M12 6a4 4 0 0 0-4 4c0 1.5.8 2.8 2 3.5V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3.5c1.2-.7 2-2 2-3.5a4 4 0 0 0-4-4z" fill="#38bdf8"/>
      <circle cx="10" cy="10" r="1" fill="#fff"/>
      <circle cx="14" cy="10" r="1" fill="#fff"/>
    </svg>
  ),
  Appwrite: () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#F02E65" />
      <path d="M12 5.5A6.5 6.5 0 1 0 18.5 12 6.5 6.5 0 0 0 12 5.5zm0 10.5a4 4 0 1 1 4-4 4 4 0 0 1-4 4z" fill="#fff"/>
    </svg>
  )
};

export default function TechStackSlide({ n }: SlideProps) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const pillars = [
    {
      num: '01',
      id: 'agent',
      title: 'Sondes Endpoint (Windows)',
      subtitle: 'Collecte & Supervision Temps Réel',
      icon: Monitor,
      tools: [
        {
          name: 'Python',
          role: "Moteur local",
          desc: 'Scripts autonomes d\'interception système',
          LogoComp: TechLogos.Python
        },
        {
          name: 'Watchdog',
          role: 'Fichiers RT',
          desc: 'Inspection instantanée des accès fichiers',
          LogoComp: TechLogos.Watchdog
        },
        {
          name: 'pywin32 / WMI',
          role: 'Amovible USB',
          desc: 'Supervision des événements matériels USB',
          LogoComp: TechLogos.PyWin32
        }
      ]
    },
    {
      num: '02',
      id: 'backend',
      title: 'Serveur SOC & Analytics',
      subtitle: 'Ingestion REST & Inspection Proxy',
      icon: Server,
      tools: [
        {
          name: 'Flask / Express',
          role: 'API REST',
          desc: 'Ingestion sécurisée des journaux & alertes',
          LogoComp: TechLogos.FlaskExpress
        },
        {
          name: 'Python Pandas',
          role: 'Analytics',
          desc: 'Normalisation et structuration des logs',
          LogoComp: TechLogos.Pandas
        },
        {
          name: 'Mitmproxy',
          role: 'Proxy HTTPS',
          desc: 'Analyse et interception des flux web',
          LogoComp: TechLogos.Mitmproxy
        }
      ]
    },
    {
      num: '03',
      id: 'frontend',
      title: 'Consoles Web & Intelligence',
      subtitle: 'Supervision SOC & Décisionnel IA',
      icon: Code2,
      tools: [
        {
          name: 'React 18 + TS',
          role: 'Console Web',
          desc: 'Tableaux de bord dynamiques réactifs',
          LogoComp: TechLogos.ReactTS
        },
        {
          name: 'Ollama (LLM Local)',
          role: 'IA Locale Souveraine',
          desc: 'Exécution 100% On-Premise — Zéro Fuite de Données',
          LogoComp: TechLogos.Ollama
        },
        {
          name: 'Appwrite',
          role: 'BaaS & Auth',
          desc: 'Gestion des accès & persistance des audits',
          LogoComp: TechLogos.Appwrite
        }
      ]
    }
  ];

  if (!isMounted) {
    return <div className="p-6 text-slate-500">Chargement de la réalisation...</div>;
  }

  return (
    <Shell
      section="RÉALISATION"
      pulseLabel="Réalisation"
      title="Technologies & Écosystème d'Outillage DLP"
      n={n}
      dense
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        gap: '1.2vw',
        padding: '0.2vw 0'
      }}>
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: INITIAL_DELAY, duration: 0.4 }}
          style={{ margin: 0, fontSize: '0.88vw', color: '#64748b', fontWeight: 500 }}
        >
          Une architecture modulaire et découplée pour la collecte, l&apos;ingestion et la restitution intelligente des événements DLP.
        </motion.p>

        {/* 3 Pillar Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.4vw',
          width: '100%',
          alignItems: 'start'
        }}>
          {pillars.map((p, idx) => {
            const IconComp = p.icon;
            return (
              <motion.div
                key={p.id}
                custom={idx + 1}
                initial="hidden"
                animate="visible"
                variants={popIn}
                whileHover={{ y: -4, scale: 1.01, boxShadow: '0 10px 25px rgba(11, 102, 213, 0.1)' }}
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '1.2vw 1.1vw',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1vw',
                  boxShadow: '0 4px 14px rgba(15, 23, 42, 0.04)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease'
                }}
              >
                {/* Top Accent Line */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: '#0b66d5'
                }} />

                {/* Card Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.7vw',
                  paddingBottom: '0.7vw',
                  borderBottom: '1.5px solid #f1f5f9'
                }}>
                  <div style={{
                    width: '2.4vw',
                    height: '2.4vw',
                    borderRadius: '12px',
                    background: 'rgba(11, 102, 213, 0.08)',
                    border: '1px solid rgba(11, 102, 213, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0b66d5',
                    flexShrink: 0
                  }}>
                    <IconComp size={22} strokeWidth={2.2} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.65vw', fontWeight: 800, color: '#0b66d5', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Axe {p.num}
                    </span>
                    <h3 style={{ margin: '0.05vw 0 0 0', fontSize: '1vw', fontWeight: 800, color: '#0f172a', lineHeight: 1.25 }}>
                      {p.title}
                    </h3>
                  </div>
                </div>

                {/* Subtitle Pill */}
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #f1f5f9',
                  borderRadius: '6px',
                  padding: '0.3vw 0.6vw',
                  fontSize: '0.72vw',
                  fontWeight: 700,
                  color: '#475569',
                  textAlign: 'center'
                }}>
                  {p.subtitle}
                </div>

                {/* Tools List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7vw' }}>
                  {p.tools.map((t) => {
                    const LogoComp = t.LogoComp;
                    return (
                      <div
                        key={t.name}
                        style={{
                          background: '#ffffff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '12px',
                          padding: '0.65vw 0.75vw',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75vw',
                          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)'
                        }}
                      >
                        {/* Logo Container */}
                        <div style={{
                          width: '2.8vw',
                          height: '2.8vw',
                          borderRadius: '10px',
                          background: '#f8fafc',
                          border: '1px solid #cbd5e1',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          padding: '0.2vw'
                        }}>
                          <LogoComp />
                        </div>

                        {/* Tech Details */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.3vw' }}>
                            <strong style={{ fontSize: '0.82vw', fontWeight: 800, color: '#0f172a' }}>
                              {t.name}
                            </strong>
                            <span style={{
                              fontSize: '0.6vw',
                              fontWeight: 800,
                              color: '#0b66d5',
                              background: 'rgba(11, 102, 213, 0.08)',
                              border: '1px solid rgba(11, 102, 213, 0.2)',
                              borderRadius: '4px',
                              padding: '0.1vw 0.4vw',
                              whiteSpace: 'nowrap'
                            }}>
                              {t.role}
                            </span>
                          </div>
                          <p style={{ margin: '0.15vw 0 0 0', fontSize: '0.7vw', fontWeight: 500, color: '#475569', lineHeight: 1.3 }}>
                            {t.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </Shell>
  );
}
