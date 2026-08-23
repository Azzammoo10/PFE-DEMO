'use client';

import { MessageSquare, Award, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { SlideProps } from '../Presentation';
import Image from 'next/image';
import logoEmsi from '../../../public/logo-emsi.png';
import axaLogo from '../../../public/axaLOGO.jpeg';

const ARABIC_WORDS = ["﴿", "هَٰذَا", "مِنْ", "فَضْلِ", "رَبِّي", "﴾"];

// Pure Framer Motion Stagger Animation Variants for Word-by-Word Reveal
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.45,
      delayChildren: 0.2
    }
  }
};

const wordVariants: Variants = {
  hidden: { opacity: 0, scale: 0.3, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 260,
      damping: 18
    }
  }
};

export default function ThanksSlide({ n }: SlideProps) {
  return (
    <section className="slide title-slide" style={{
      background: 'radial-gradient(circle at 50% 30%, rgba(0, 210, 255, 0.18), transparent 50%), radial-gradient(circle at 85% 85%, rgba(11, 102, 213, 0.22), transparent 50%), linear-gradient(135deg, #030a16 0%, #061327 50%, #0a1c38 100%)',
      position: 'relative',
      overflow: 'hidden',
      padding: '2.5vw 4vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div className="title-bg-grid" />

      {/* Top Header Logos */}
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2 }}>
        <div style={{ background: '#ffffff', padding: '0.4vw 1.2vw', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <Image src={logoEmsi} alt="EMSI" unoptimized priority style={{ height: '2.8vw', width: 'auto' }} />
        </div>
        <div style={{ background: '#ffffff', padding: '0.4vw 1.2vw', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <Image src={axaLogo} alt="AXA GBS" unoptimized priority style={{ height: '2.8vw', width: 'auto', objectFit: 'contain' }} />
        </div>
      </div>

      {/* Main Content Centered in the middle of the screen */}
      <div style={{
        width: '90%',
        maxWidth: '1050px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        margin: 'auto 0',
        zIndex: 2,
        gap: '1.4vw'
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.6vw',
          background: 'linear-gradient(90deg, rgba(11, 102, 213, 0.35), rgba(0, 210, 255, 0.25))',
          border: '1px solid rgba(0, 210, 255, 0.5)',
          padding: '0.45vw 1.6vw',
          borderRadius: '30px',
          color: '#38bdf8',
          fontWeight: 800,
          letterSpacing: '0.12em',
          fontSize: '0.9vw',
          textTransform: 'uppercase',
          boxShadow: '0 0 20px rgba(56, 189, 248, 0.25)'
        }}>
          <Award size={20} style={{ color: '#38bdf8' }} />
          <span>SOUTENANCE DE PROJET DE FIN D&apos;ÉTUDES</span>
        </div>

        {/* Main Title: Merci pour votre attention */}
        <h1 style={{
          fontSize: '3.8vw',
          fontWeight: 900,
          color: '#ffffff',
          margin: 0,
          letterSpacing: '-0.02em',
          lineHeight: 1.15
        }}>
          Merci pour votre{' '}
          <span style={{
            background: 'linear-gradient(90deg, #38bdf8 0%, #60a5fa 50%, #93c5fd 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            attention
          </span>
        </h1>

        {/* Subtitle / Open Questions Announcement */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.06)',
          border: '1.5px solid rgba(56, 189, 248, 0.35)',
          borderRadius: '20px',
          padding: '1.2vw 2.6vw',
          display: 'flex',
          alignItems: 'center',
          gap: '1.2vw',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25)',
          backdropFilter: 'blur(12px)'
        }}>
          <div style={{
            background: 'rgba(56, 189, 248, 0.18)',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            borderRadius: '50%',
            width: '3.5vw',
            height: '3.5vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#38bdf8',
            flexShrink: 0
          }}>
            <MessageSquare size={32} />
          </div>
          <p style={{ margin: 0, fontSize: '1.4vw', fontWeight: 600, color: '#f8fafc', textAlign: 'left', lineHeight: 1.4 }}>
            Je suis à votre entière disposition pour répondre à toutes vos questions.
          </p>
        </div>

        {/* Royal Calligraphic Plaque with Framer Motion Staggered Word Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            marginTop: '0.4vw',
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.75) 0%, rgba(11, 30, 60, 0.85) 100%)',
            border: '1.5px solid rgba(56, 189, 248, 0.55)',
            borderRadius: '40px',
            padding: '0.5vw 2.8vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.8vw',
            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.35), 0 0 25px rgba(56, 189, 248, 0.25), inset 0 0 15px rgba(56, 189, 248, 0.15)',
            backdropFilter: 'blur(16px)',
            position: 'relative'
          }}
        >
          {/* Left Sparkle Icon */}
          <motion.div
            animate={{ scale: [1, 1.25, 1], rotate: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          >
            <Sparkles size={20} style={{ color: '#38bdf8', opacity: 0.85 }} />
          </motion.div>

          {/* Words Container with Framer Motion Stagger */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45vw',
              direction: 'rtl',
              fontFamily: "'Amiri', 'Traditional Arabic', 'Scheherazade New', 'Noto Naskh Arabic', serif",
              fontSize: '2.8vw',
              fontWeight: 700,
              lineHeight: 1.2
            }}
          >
            {ARABIC_WORDS.map((word, idx) => (
              <motion.span
                key={idx}
                variants={wordVariants}
                style={{
                  backgroundImage: 'linear-gradient(90deg, #7fd6ff 0%, #38bdf8 50%, #60a5fa 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 2px 12px rgba(56, 189, 248, 0.5))',
                  display: 'inline-block'
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          {/* Right Sparkle Icon */}
          <motion.div
            animate={{ scale: [1, 1.25, 1], rotate: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: 1.5 }}
          >
            <Sparkles size={20} style={{ color: '#38bdf8', opacity: 0.85 }} />
          </motion.div>
        </motion.div>
      </div>

      {/* Footer slide counter */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.8vw', fontWeight: 600, zIndex: 2 }}>
        <span>EMSI • AXA GBS</span>
        <span>Projet de Fin d&apos;Études</span>
        <strong style={{ color: '#ffffff' }}>{String(n).padStart(2, '0')} / {String(n).padStart(2, '0')}</strong>
      </div>
    </section>
  );
}
