'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, AlertTriangle, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { Shell } from '../Presentation';
import type { SlideProps } from '../Presentation';
import Image from 'next/image';
import axaLogo from '../../../public/axaLOGO.jpeg';
import geminiLogo from '../../../public/gemini-logo.png';
import claudeLogo from '../../../public/claude-logo.png';
import openaiLogo from '../../../public/openai-logo.png';
import qwenLogo from '../../../public/qwen-logo.png';

export default function AIBenchmarkSlide({ n }: SlideProps) {
  const criteria = [
    {
      name: 'Confidentialité et Sécurité',
      cloud: { status: 'bad', text: 'Risque de Fuite (API Publique)' },
      ollama: { status: 'good', text: '100% Étanche et Souverain' },
      secureGpt: { status: 'good', text: 'Conforme Socle AXA' },
    },
    {
      name: 'Coût d\'Exploitation',
      cloud: { status: 'warning', text: 'Payant (Facturation Token)' },
      ollama: { status: 'good', text: '0 € (Gratuit et Local)' },
      secureGpt: { status: 'good', text: 'Inclus Socle AXA' },
    },
    {
      name: 'Autonomie et Offline',
      cloud: { status: 'bad', text: 'Dépendance Cloud Totale' },
      ollama: { status: 'good', text: 'Mode 100% Offline' },
      secureGpt: { status: 'good', text: 'Réseau Interne AXA' },
    },
    {
      name: 'Précision d\'Analyse LLM',
      cloud: { status: 'good', text: 'Très Élevée (95%+)' },
      ollama: { status: 'good', text: 'Excellente (Qwen 2.5 7B)' },
      secureGpt: { status: 'good', text: 'Maximale (95%+)' },
    },
    {
      name: 'Rôle dans le Projet',
      cloud: { status: 'bad', text: 'REJETÉ (Non Conforme)' },
      ollama: { status: 'highlight', text: 'VALIDATION POC (LAB)' },
      secureGpt: { status: 'highlight', text: 'ACCÈS CIBLE (PROD)' },
    },
  ];

  return (
    <Shell
      section="RÉALISATION"
      pulseLabel="Benchmark"
      title="Benchmark Moteurs IA"
      n={n}
      dense
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
        padding: '0.2vw 0',
        gap: '1vw'
      }}>
        
        {/* Sober Academic Benchmark Matrix Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            width: '100%',
            background: '#ffffff',
            border: '1.5px solid #cbd5e1',
            borderRadius: '12px',
            overflow: 'hidden',
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Unified Dark Header Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1.25fr 1.15fr 1.15fr',
            background: '#0f172a',
            color: '#ffffff',
            padding: '0.9vw 1.2vw',
            alignItems: 'center'
          }}>
            <div style={{ fontSize: '0.88vw', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8' }}>
              Critères d&apos;Évaluation
            </div>
            
            {/* Column 1: Cloud Publics */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6vw' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4vw',
                background: '#ffffff',
                padding: '0.25vw 0.6vw',
                borderRadius: '8px'
              }}>
                <Image src={geminiLogo} alt="Gemini" unoptimized style={{ height: '1.1vw', width: 'auto', objectFit: 'contain' }} />
                <Image src={claudeLogo} alt="Claude" unoptimized style={{ height: '1.1vw', width: 'auto', objectFit: 'contain' }} />
                <Image src={openaiLogo} alt="OpenAI" unoptimized style={{ height: '1.1vw', width: 'auto', objectFit: 'contain' }} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.9vw', color: '#f8fafc' }}>Cloud Publics</strong>
                <span style={{ fontSize: '0.68vw', color: '#94a3b8' }}>Gemini • Claude • OpenAI</span>
              </div>
            </div>

            {/* Column 2: Ollama Local (LAB) - With Official Qwen 2.5 Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5vw' }}>
              <div style={{
                background: '#ffffff',
                padding: '0.2vw 0.5vw',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Image src={qwenLogo} alt="Qwen 2.5" unoptimized style={{ height: '1.2vw', width: 'auto', objectFit: 'contain' }} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.9vw', color: '#f8fafc' }}>Ollama Local (Lab)</strong>
                <span style={{ fontSize: '0.68vw', color: '#38bdf8', fontWeight: 700 }}>QWEN 2.5 (7B)</span>
              </div>
            </div>

            {/* Column 3: AXA SecureGPT (PROD) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5vw' }}>
              <Image src={axaLogo} alt="AXA" unoptimized style={{ height: '1.4vw', width: 'auto', borderRadius: '3px' }} />
              <div>
                <strong style={{ display: 'block', fontSize: '0.9vw', color: '#f8fafc' }}>AXA SecureGPT</strong>
                <span style={{ fontSize: '0.68vw', color: '#60a5fa', fontWeight: 700 }}>CIBLE PRODUCTION</span>
              </div>
            </div>
          </div>

          {/* Table Body Rows */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-around' }}>
            {criteria.map((row, idx) => {
              const isLast = idx === criteria.length - 1;
              return (
                <motion.div
                  key={row.name}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.25 }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1.25fr 1.15fr 1.15fr',
                    padding: isLast ? '0.8vw 1.2vw' : '0.7vw 1.2vw',
                    alignItems: 'center',
                    background: isLast ? '#f8fafc' : idx % 2 === 0 ? '#ffffff' : '#f8fafc',
                    borderBottom: isLast ? 'none' : '1px solid #e2e8f0'
                  }}
                >
                  {/* Criterion Name */}
                  <div>
                    <strong style={{ fontSize: '0.88vw', color: '#0f172a', fontWeight: 700 }}>
                      {row.name}
                    </strong>
                  </div>

                  {/* Cloud Cell */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4vw' }}>
                    {row.cloud.status === 'bad' && <XCircle size={18} style={{ color: '#dc2626', flexShrink: 0 }} />}
                    {row.cloud.status === 'warning' && <AlertTriangle size={18} style={{ color: '#d97706', flexShrink: 0 }} />}
                    {row.cloud.status === 'good' && <CheckCircle2 size={18} style={{ color: '#2563eb', flexShrink: 0 }} />}
                    <span style={{
                      fontSize: '0.85vw',
                      fontWeight: 600,
                      color: row.cloud.status === 'bad' ? '#dc2626' : row.cloud.status === 'warning' ? '#b45309' : '#334155'
                    }}>
                      {row.cloud.text}
                    </span>
                  </div>

                  {/* Ollama Cell */}
                  <div style={{
                    background: isLast ? '#1e293b' : '#f1f5f9',
                    padding: '0.4vw 0.8vw',
                    borderRadius: '6px',
                    border: isLast ? '1px solid #1e293b' : '1px solid #cbd5e1',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4vw'
                  }}>
                    {isLast ? (
                      <Cpu size={18} style={{ color: '#38bdf8' }} />
                    ) : (
                      <CheckCircle2 size={18} style={{ color: '#0284c7', flexShrink: 0 }} />
                    )}
                    <span style={{
                      fontSize: '0.85vw',
                      fontWeight: 700,
                      color: isLast ? '#ffffff' : '#0f172a'
                    }}>
                      {row.ollama.text}
                    </span>
                  </div>

                  {/* SecureGPT Cell */}
                  <div style={{
                    background: isLast ? '#0f172a' : '#f1f5f9',
                    padding: '0.4vw 0.8vw',
                    borderRadius: '6px',
                    border: isLast ? '1px solid #0f172a' : '1px solid #cbd5e1',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4vw'
                  }}>
                    {isLast ? (
                      <ShieldCheck size={18} style={{ color: '#60a5fa' }} />
                    ) : (
                      <CheckCircle2 size={18} style={{ color: '#1d4ed8', flexShrink: 0 }} />
                    )}
                    <span style={{
                      fontSize: '0.85vw',
                      fontWeight: 700,
                      color: isLast ? '#ffffff' : '#0f172a'
                    }}>
                      {row.secureGpt.text}
                    </span>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* High-Contrast Executive Dark Animated Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          style={{
            background: '#0f172a',
            border: '2px solid #0b66d5',
            borderRadius: '12px',
            padding: '0.65vw 1.5vw',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(11, 102, 213, 0.3)'
          }}
        >
          {/* Continuous Glowing Cyan Beam Sweep Background */}
          <motion.div
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: 'linear'
            }}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              width: '40%',
              background: 'linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.3) 50%, transparent 100%)',
              pointerEvents: 'none'
            }}
          />

          {/* Step 1: Ollama with Official Qwen Logo */}
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.6vw', zIndex: 2 }}
          >
            <div style={{
              background: '#ffffff',
              borderRadius: '6px',
              padding: '0.25vw 0.5vw',
              display: 'flex',
              alignItems: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
            }}>
              <Image src={qwenLogo} alt="Qwen 2.5" unoptimized style={{ height: '1.3vw', width: 'auto', objectFit: 'contain' }} />
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '0.92vw', color: '#ffffff', fontWeight: 800 }}>1. Validation PoC (Lab)</strong>
              <span style={{ fontSize: '0.74vw', color: '#38bdf8', fontWeight: 600 }}>Ollama Local (Modèle Qwen 2.5 7B)</span>
            </div>
          </motion.div>

          {/* Central Pulsing Glowing Blue Badge */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                '0 0 4px rgba(56, 189, 248, 0.4)',
                '0 0 20px rgba(56, 189, 248, 0.85)',
                '0 0 4px rgba(56, 189, 248, 0.4)'
              ]
            }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6vw',
              background: '#0b66d5',
              border: '1.5px solid #38bdf8',
              padding: '0.35vw 1.2vw',
              borderRadius: '20px',
              zIndex: 2
            }}
          >
            {/* Animated Pulsing Arrows */}
            <motion.div
              animate={{ x: [-2, 4, -2] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
            >
              <ArrowRight size={18} style={{ color: '#ffffff' }} />
            </motion.div>

            <span style={{
              fontSize: '0.85vw',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '0.02em',
              textTransform: 'uppercase'
            }}>
              Valide l&apos;application avant la production
            </span>

            <motion.div
              animate={{ x: [-2, 4, -2] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut', delay: 0.15 }}
            >
              <ArrowRight size={18} style={{ color: '#ffffff' }} />
            </motion.div>
          </motion.div>

          {/* Step 2: AXA SecureGPT */}
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut', delay: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.6vw', zIndex: 2 }}
          >
            <Image src={axaLogo} alt="AXA" unoptimized style={{ height: '1.5vw', width: 'auto', borderRadius: '4px', boxShadow: '0 2px 6px rgba(0,0,0,0.3)' }} />
            <div>
              <strong style={{ display: 'block', fontSize: '0.92vw', color: '#ffffff', fontWeight: 800 }}>2. Production AXA</strong>
              <span style={{ fontSize: '0.74vw', color: '#60a5fa', fontWeight: 600 }}>API AXA SecureGPT</span>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </Shell>
  );
}
