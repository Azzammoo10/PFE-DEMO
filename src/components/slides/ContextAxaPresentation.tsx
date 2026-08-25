'use client';

import { useEffect, useState } from 'react';
import { Shield, Globe, Users, Building2, ChevronRight, Star, CheckCircle2, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Shell } from '../Presentation';
import type { SlideProps } from '../Presentation';

// Custom Animated Counter
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
  const pillars = [
    { name: 'Data Protection', isTarget: true, desc: 'Pôle PFE (Prévention des Fuites & Chiffrement)' },
    { name: 'IAM & SecOps', isTarget: false, desc: 'Gestion des Identités & Opérations de Sécurité' },
    { name: 'SecAudit & SecGov', isTarget: false, desc: 'Conformité, Audits & Gouvernance' },
    { name: 'SecTools & SecTech', isTarget: false, desc: 'Outillage Sécurité & Technologies' },
    { name: 'Offensive Security & Pentest', isTarget: false, desc: 'Tests d\'intrusion & Red Teaming' },
  ];

  return (
    <Shell section="CONTEXTE" title="Contexte Général et Organisme d'Accueil (AXA GO)" n={n}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.05fr 1.15fr',
        gap: '1.2vw',
        height: '100%',
        alignItems: 'stretch'
      }}>

        {/* ========================================================================= */}
        {/* COLUMN 1: AXA GBS (PREMIUM METRICS & OVERVIEW)                            */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{
            background: '#ffffff',
            border: '1.5px solid #00008f',
            borderRadius: '14px',
            padding: '1.1vw 1.2vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 8px 24px rgba(0, 0, 143, 0.08)',
            willChange: 'transform, box-shadow',
            transform: 'translateZ(0)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6vw', marginBottom: '0.8vw' }}>
              <div style={{ background: '#00008f', padding: '0.4vw', borderRadius: '8px', color: '#fff', display: 'flex' }}>
                <Building2 size={18} />
              </div>
              <div>
                <span style={{ fontSize: '0.6vw', fontWeight: 900, color: '#00008f', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  FILIALE GLOBALE
                </span>
                <h3 style={{ margin: 0, fontSize: '1.2vw', fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>
                  AXA GBS
                </h3>
              </div>
            </div>

            <p style={{ margin: 0, fontSize: '0.74vw', color: '#475569', lineHeight: 1.4, fontWeight: 500 }}>
              Global Business Services (GBS) centralise les opérations IT, la sécurité et la transformation numérique du Groupe AXA.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75vw', marginTop: 'auto' }}>
            {/* Metric 1 */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.6vw 0.8vw', display: 'flex', alignItems: 'center', gap: '0.7vw' }}>
              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '0.45vw', color: '#0b66d5', display: 'flex' }}>
                <Shield size={16} />
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '1.1vw', fontWeight: 900, color: '#00008f', lineHeight: 1 }}>#1</span>
                <span style={{ fontSize: '0.65vw', color: '#64748b', fontWeight: 600 }}>Hub Global d&apos;Informatique & Sécurité</span>
              </div>
            </div>

            {/* Metric 2 */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.6vw 0.8vw', display: 'flex', alignItems: 'center', gap: '0.7vw' }}>
              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '0.45vw', color: '#0b66d5', display: 'flex' }}>
                <Globe size={16} />
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '1.1vw', fontWeight: 900, color: '#00008f', lineHeight: 1 }}>
                  <AnimatedCounter from={0} to={118} duration={1} />k – <AnimatedCounter from={0} to={156} duration={1} />k
                </span>
                <span style={{ fontSize: '0.65vw', color: '#64748b', fontWeight: 600 }}>Collaborateurs accompagnés dans le monde</span>
              </div>
            </div>

            {/* Metric 3 */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.6vw 0.8vw', display: 'flex', alignItems: 'center', gap: '0.7vw' }}>
              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '0.45vw', color: '#0b66d5', display: 'flex' }}>
                <Users size={16} />
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '1.1vw', fontWeight: 900, color: '#00008f', lineHeight: 1 }}>
                  <AnimatedCounter from={0} to={50} duration={1} prefix="+" />
                </span>
                <span style={{ fontSize: '0.65vw', color: '#64748b', fontWeight: 600 }}>Pays couverts par les infrastructures GBS</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* COLUMN 2: ORGANIZATIONAL FUNNEL (AXA GROUP -> GBS -> BRANCHE PFE)          */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08, ease: 'easeOut' }}
          style={{
            background: '#ffffff',
            border: '1.5px solid #cbd5e1',
            borderRadius: '14px',
            padding: '1.1vw 1.2vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.04)',
            willChange: 'transform, box-shadow',
            transform: 'translateZ(0)'
          }}
        >
          <div>
            <span style={{ fontSize: '0.6vw', fontWeight: 900, color: '#0b66d5', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              ARBORESCENCE & INTEGRATION
            </span>
            <h3 style={{ margin: '0.1vw 0 0.8vw 0', fontSize: '1.1vw', fontWeight: 900, color: '#0f172a' }}>
              Fil Conducteur Organisationnel
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6vw', flex: 1, justifyContent: 'center' }}>
            {/* Step 1: Groupe AXA */}
            <div style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '0.5vw 0.8vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.58vw', color: '#64748b', fontWeight: 800, textTransform: 'uppercase' }}>NIVEAU 1</span>
                <h4 style={{ margin: 0, fontSize: '0.85vw', fontWeight: 900, color: '#0f172a' }}>AXA Group</h4>
              </div>
              <ChevronRight size={16} style={{ color: '#94a3b8' }} />
            </div>

            {/* Down Arrow */}
            <div style={{ textAlign: 'center', height: '0.6vw', lineHeight: 1, color: '#0b66d5', fontWeight: 900, fontSize: '0.8vw' }}>↓</div>

            {/* Step 2: AXA GBS */}
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '0.5vw 0.8vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.58vw', color: '#0b66d5', fontWeight: 800, textTransform: 'uppercase' }}>NIVEAU 2</span>
                <h4 style={{ margin: 0, fontSize: '0.85vw', fontWeight: 900, color: '#0369a1' }}>AXA GBS (Services Globaux)</h4>
              </div>
              <ChevronRight size={16} style={{ color: '#0b66d5' }} />
            </div>

            {/* Down Arrow */}
            <div style={{ textAlign: 'center', height: '0.6vw', lineHeight: 1, color: '#059669', fontWeight: 900, fontSize: '0.8vw' }}>↓</div>

            {/* Step 3: Branche d'Accueil (Technology & Security Services) */}
            <div style={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)', border: '2px solid #10b981', borderRadius: '10px', padding: '0.7vw 0.8vw', boxShadow: '0 4px 14px rgba(16, 185, 129, 0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2vw' }}>
                <span style={{ background: '#10b981', color: '#ffffff', fontSize: '0.55vw', fontWeight: 900, borderRadius: '4px', padding: '0.1vw 0.4vw', textTransform: 'uppercase' }}>
                  BRANCHE D&apos;ACCUEIL PFE
                </span>
                <CheckCircle2 size={16} style={{ color: '#059669' }} />
              </div>
              <h4 style={{ margin: 0, fontSize: '0.9vw', fontWeight: 900, color: '#064e3b' }}>
                Technology &amp; Security Services
              </h4>
              <p style={{ margin: '0.2vw 0 0 0', fontSize: '0.66vw', color: '#047857', fontWeight: 600 }}>
                Département dédié aux solutions de cybersécurité et de protection système
              </p>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* COLUMN 3: CYBERSECURITY PILLARS & FOCUS DATA PROTECTION                     */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.16, ease: 'easeOut' }}
          style={{
            background: '#ffffff',
            border: '1.5px solid #cbd5e1',
            borderRadius: '14px',
            padding: '1.1vw 1.2vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.04)',
            willChange: 'transform, box-shadow',
            transform: 'translateZ(0)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6vw' }}>
              <span style={{ fontSize: '0.6vw', fontWeight: 900, color: '#7c3aed', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                PÔLE CYBERSÉCURITÉ
              </span>
              <span style={{ background: '#f5f3ff', border: '1px solid #c7d2fe', color: '#6d28d9', fontSize: '0.6vw', fontWeight: 800, borderRadius: '6px', padding: '0.15vw 0.4vw', display: 'flex', alignItems: 'center', gap: '0.3vw' }}>
                <Lock size={12} /> Équipe d&apos;Accueil
              </span>
            </div>

            <h3 style={{ margin: '0 0 0.8vw 0', fontSize: '1.1vw', fontWeight: 900, color: '#0f172a' }}>
              Piliers de Sécurité AXA
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5vw', flex: 1, justifyContent: 'center' }}>
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                style={{
                  background: pillar.isTarget ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' : '#f8fafc',
                  border: pillar.isTarget ? '2px solid #10b981' : '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: pillar.isTarget ? '0.6vw 0.8vw' : '0.45vw 0.7vw',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: pillar.isTarget ? '0 4px 14px rgba(16, 185, 129, 0.2)' : 'none'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4vw' }}>
                    {pillar.isTarget && <Star size={13} fill="#059669" color="#059669" />}
                    <h4 style={{ margin: 0, fontSize: pillar.isTarget ? '0.85vw' : '0.75vw', fontWeight: pillar.isTarget ? 900 : 700, color: pillar.isTarget ? '#064e3b' : '#334155' }}>
                      {pillar.name}
                    </h4>
                  </div>
                  <span style={{ fontSize: '0.62vw', color: pillar.isTarget ? '#047857' : '#64748b', fontWeight: pillar.isTarget ? 700 : 500, display: 'block', marginTop: '0.1vw' }}>
                    {pillar.desc}
                  </span>
                </div>

                {pillar.isTarget && (
                  <span style={{ background: '#10b981', color: '#ffffff', fontSize: '0.55vw', fontWeight: 900, borderRadius: '4px', padding: '0.15vw 0.4vw', textTransform: 'uppercase', flexShrink: 0 }}>
                    FOCUS PFE
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </Shell>
  );
}

