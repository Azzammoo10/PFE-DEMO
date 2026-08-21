'use client';

import { useSyncExternalStore } from 'react';
import { motion } from 'framer-motion';
import { 
  Monitor, 
  Server, 
  Code2, 
  Cpu
} from 'lucide-react';
import { Shell, fadeUp, popIn } from '../Presentation';
import type { SlideProps } from '../Presentation';

const emptySubscribe = () => () => {};

// Official Brand & Technology Vector Logos
const TechLogos = {
  Python: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M11.91 2C6.98 2 7.27 4.14 7.27 4.14V6.3H12V7H5.27S2 6.64 2 11.57c0 4.94 2.87 4.72 2.87 4.72h1.71v-2.42s-.09-2.87 2.87-2.87h4.86s2.72.04 2.72-2.65V4.72S17.41 2 11.91 2zM9.25 3.75a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z" fill="#3776AB"/>
      <path d="M12.09 22c4.93 0 4.64-2.14 4.64-2.14v-2.16H12V17h6.73s3.27.36 3.27-4.57c0-4.94-2.87-4.72-2.87-4.72h-1.71v2.42s.09 2.87-2.87 2.87h-4.86s-2.72-.04-2.72 2.65v3.71S6.59 22 12.09 22zm2.66-1.75a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8z" fill="#FFD43B"/>
    </svg>
  ),
  Watchdog: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="4" fill="#f0f4ff" stroke="#00008f" strokeWidth="1.5"/>
      <path d="M7 9.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm7 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z" fill="#00008f"/>
      <path d="M12 11.5a1 1 0 0 0-1 1v1.5a1 1 0 0 0 2 0v-1.5a1 1 0 0 0-1-1z" fill="#00008f"/>
      <path d="M9.5 16c1.5 1.2 3.5 1.2 5 0" stroke="#00008f" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  PyWin32: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 3h8.5v8.5H3zM12.5 3H21v8.5h-8.5zM3 12.5h8.5V21H3zM12.5 12.5H21V21h-8.5z" fill="#0078D4"/>
    </svg>
  ),
  FlaskExpress: () => (
    // eslint-disable-next-line @next/next/no-img-element
    <img 
      src="/flask-logo.svg" 
      alt="Flask" 
      style={{ width: '1.7vw', height: '1.7vw', objectFit: 'contain' }} 
    />
  ),
  Pandas: () => (
    // eslint-disable-next-line @next/next/no-img-element
    <img 
      src="/pandas-logo.svg" 
      alt="Pandas" 
      style={{ width: '1.7vw', height: '1.7vw', objectFit: 'contain' }} 
    />
  ),
  Mitmproxy: () => (
    // eslint-disable-next-line @next/next/no-img-element
    <img 
      src="/mitmproxy-logo.png" 
      alt="Mitmproxy" 
      style={{ width: '1.7vw', height: '1.7vw', objectFit: 'contain' }} 
    />
  ),
  ReactTS: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="2.2" fill="#61DAFB"/>
      <g stroke="#61DAFB" strokeWidth="1.3">
        <ellipse cx="12" cy="12" rx="9" ry="3.5"/>
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)"/>
      </g>
    </svg>
  ),
  Gemini: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2z" fill="url(#gemini-grad-tech-anim)"/>
      <defs>
        <linearGradient id="gemini-grad-tech-anim" x1="2" y1="2" x2="22" y2="22">
          <stop offset="0%" stopColor="#1a73e8"/>
          <stop offset="50%" stopColor="#8ab4f8"/>
          <stop offset="100%" stopColor="#c58af9"/>
        </linearGradient>
      </defs>
    </svg>
  ),
  Appwrite: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
      subtitle: 'Agents de collecte & surveillance temps réel',
      category: 'COLLECTE TEMPS RÉEL',
      icon: Monitor,
      tools: [
        {
          name: 'Python',
          role: "MOTEUR D'EXÉCUTION LOCAL",
          desc: 'Scripts autonomes de collecte & d\'interception système',
          LogoComp: TechLogos.Python
        },
        {
          name: 'Watchdog',
          role: 'SURVEILLANCE FICHIERS RT',
          desc: 'Inspection instantanée des opérations sur les documents',
          LogoComp: TechLogos.Watchdog
        },
        {
          name: 'pywin32 / WMI',
          role: 'INTERCEPTION AMOVIBLE (USB)',
          desc: 'Supervision des événements matériels & volumes amovibles',
          LogoComp: TechLogos.PyWin32
        }
      ]
    },
    {
      num: '02',
      id: 'backend',
      title: 'Serveur SOC & Analytics',
      subtitle: 'Microservices, ingestion REST & proxy',
      category: 'INGESTION & TRAITEMENT',
      icon: Server,
      tools: [
        {
          name: 'Flask / Express',
          role: 'API REST CENTRALISÉE',
          desc: 'Ingestion sécurisée des journaux & gestion des alertes',
          LogoComp: TechLogos.FlaskExpress
        },
        {
          name: 'Python Pandas',
          role: 'NORMALISATION DONNÉES',
          desc: 'Nettoyage, filtrage et structuration des logs bruts',
          LogoComp: TechLogos.Pandas
        },
        {
          name: 'Mitmproxy',
          role: 'INSPECTION WEB HTTPS',
          desc: 'Analyse et interception des requêtes & flux web',
          LogoComp: TechLogos.Mitmproxy
        }
      ]
    },
    {
      num: '03',
      id: 'frontend',
      title: 'Consoles Web & Intelligence',
      subtitle: 'Interfaces d\'administration & IA décisionnelle',
      category: 'SUPERVISION & DECISION',
      icon: Code2,
      tools: [
        {
          name: 'React 18 + TypeScript',
          role: 'INTERFACE WEB RÉACTIVE',
          desc: 'Tableaux de bord dynamiques & consoles d\'administration',
          LogoComp: TechLogos.ReactTS
        },
        {
          name: 'Google Gemini IA',
          role: 'RATIONALISATION CM11',
          desc: 'Analyse sémantique des règles DLP & assistance décisionnelle',
          LogoComp: TechLogos.Gemini
        },
        {
          name: 'Appwrite',
          role: 'BAAS & AUTHENTIFICATION',
          desc: 'Gestion des accès, base NoSQL & persistance des audits',
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
        gap: '1vw',
        width: '100%',
        height: '92%',
        justifyContent: 'space-between',
        overflow: 'hidden',
        paddingTop: '0.2vw',
        paddingBottom: '0.2vw'
      }}>
        
        {/* Top Architecture Header Note with Entrance Animation */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f4f8fe 100%)',
            border: '1.5px solid #d0dbe9',
            borderRadius: '12px',
            padding: '0.6vw 1.1vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 4px 14px rgba(0, 0, 143, 0.04)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75vw' }}>
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              style={{
                width: '2.2vw',
                height: '2.2vw',
                borderRadius: '9px',
                background: '#00008f',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(0, 0, 143, 0.25)'
              }}
            >
              <Cpu style={{ width: '1.2vw', height: '1.2vw' }} />
            </motion.div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5vw' }}>
                <span style={{ fontSize: '0.65vw', fontWeight: 900, color: '#00008f', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  ARCHITECTURE TECHNIQUE PFE
                </span>
                <span style={{ fontSize: '0.6vw', color: '#cbd5e1' }}>|</span>
                <span style={{ fontSize: '0.65vw', fontWeight: 700, color: '#475569' }}>
                  3 PILIERS MAJEURS DÉCOUPLÉS
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.74vw', fontWeight: 600, color: '#0f172a', lineHeight: 1.25 }}>
                Chaîne d&apos;exécution modulaire : de la collecte par sondes locales vers le serveur d&apos;ingestion SOC jusqu&apos;à la restitution et la rationalisation IA.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4vw' }}>
            <span style={{
              background: 'rgba(0, 0, 143, 0.06)',
              border: '1.5px solid rgba(0, 0, 143, 0.18)',
              borderRadius: '20px',
              padding: '0.25vw 0.85vw',
              fontSize: '0.68vw',
              fontWeight: 800,
              color: '#00008f',
              letterSpacing: '0.04em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#00008f' }}
              />
              ÉCOSYSTÈME OPTIMISÉ
            </span>
          </div>
        </motion.div>

        {/* 3 Pillar Cards with Rich Staggered Animations */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.2vw',
          width: '100%',
          flex: 1,
          alignItems: 'stretch'
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
                whileHover={{ y: -5, borderColor: '#00008f', boxShadow: '0 12px 28px rgba(0, 0, 143, 0.08)' }}
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #d0dbe9',
                  borderRadius: '16px',
                  padding: '1vw 1.1vw',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 18px rgba(11, 43, 93, 0.03)',
                  transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Top Subtle Accent Stripe */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: '#00008f'
                }} />

                <div>
                  {/* Card Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyContent: 'space-between',
                    marginBottom: '0.8vw',
                    paddingBottom: '0.65vw',
                    borderBottom: '1.5px solid #f1f5f9'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65vw' }}>
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        style={{
                          width: '2.2vw',
                          height: '2.2vw',
                          borderRadius: '10px',
                          background: 'rgba(0, 0, 143, 0.06)',
                          border: '1.5px solid rgba(0, 0, 143, 0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#00008f',
                          flexShrink: 0
                        }}
                      >
                        <IconComp style={{ width: '1.15vw', height: '1.15vw' }} />
                      </motion.div>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '0.92vw', fontWeight: 800, color: '#0f172a', lineHeight: 1.25 }}>
                          {p.title}
                        </h3>
                        <span style={{ fontSize: '0.64vw', fontWeight: 600, color: '#64748b', display: 'block', marginTop: '2px' }}>
                          {p.subtitle}
                        </span>
                      </div>
                    </div>

                    <span style={{
                      fontSize: '0.95vw',
                      fontWeight: 900,
                      color: 'rgba(0, 0, 143, 0.25)',
                      fontFamily: 'monospace'
                    }}>
                      {p.num}
                    </span>
                  </div>

                  {/* Tools List with Staggered Slide In */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5vw', marginTop: '0.2vw' }}>
                    {p.tools.map((t, toolIdx) => {
                      const LogoComp = t.LogoComp;
                      return (
                        <motion.div
                          key={t.name}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + idx * 0.15 + toolIdx * 0.1, duration: 0.4 }}
                          whileHover={{ scale: 1.02, x: 4, backgroundColor: '#ffffff', borderColor: '#00008f' }}
                          style={{
                            background: '#f8fafc',
                            border: '1.5px solid #e2e8f0',
                            borderRadius: '12px',
                            padding: '0.8vw 0.9vw',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.8vw',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {/* Official Tech Logo Container */}
                          <div style={{
                            width: '2.6vw',
                            height: '2.6vw',
                            borderRadius: '10px',
                            background: '#ffffff',
                            border: '1.5px solid #cbd5e1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                            flexShrink: 0
                          }}>
                            <LogoComp />
                          </div>

                          {/* Tech Details */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.4vw' }}>
                              <span style={{ fontSize: '0.82vw', fontWeight: 800, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {t.name}
                              </span>
                              <span style={{
                                fontSize: '0.54vw',
                                fontWeight: 800,
                                color: '#00008f',
                                background: 'rgba(0, 0, 143, 0.06)',
                                border: '1px solid rgba(0, 0, 143, 0.15)',
                                borderRadius: '5px',
                                padding: '0.12vw 0.45vw',
                                whiteSpace: 'nowrap',
                                letterSpacing: '0.02em',
                                flexShrink: 0
                              }}>
                                {t.role}
                              </span>
                            </div>
                            <p style={{ margin: '3px 0 0 0', fontSize: '0.66vw', fontWeight: 500, color: '#475569', lineHeight: 1.3 }}>
                              {t.desc}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </Shell>
  );
}
