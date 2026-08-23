import { GraduationCap, User, UserCheck, Users, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp } from '../Presentation';
import type { SlideProps } from '../Presentation';
import Image from 'next/image';
import logoEmsi from '../../../public/logo-emsi.png';
import axaLogo from '../../../public/axaLOGO.jpeg';

export default function TitleSlide({ n }: SlideProps) {
  return (
    <section className="slide title-slide" style={{
      background: 'radial-gradient(circle at 50% 30%, rgba(0, 210, 255, 0.12), transparent 50%), radial-gradient(circle at 85% 85%, rgba(11, 102, 213, 0.15), transparent 50%), linear-gradient(135deg, #030a16 0%, #061327 50%, #0a1c38 100%)',
      position: 'relative',
      overflow: 'hidden',
      padding: '2vw 3.5vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div className="title-bg-grid" />

      {/* 1. Header with EMSI on Left & AXA on Right */}
      <div className="top-logos" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2, marginBottom: '1vw' }}>
        <div style={{ background: '#ffffff', padding: '0.4vw 1.2vw', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <Image src={logoEmsi} alt="EMSI" unoptimized priority style={{ height: '3vw', width: 'auto', filter: 'none' }} />
        </div>
        <div style={{ background: '#ffffff', padding: '0.4vw 1.2vw', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <Image src={axaLogo} alt="AXA GBS" unoptimized priority style={{ height: '3vw', width: 'auto', objectFit: 'contain', filter: 'none' }} />
        </div>
      </div>

      {/* 2. Main Content Centered in the middle of the page */}
      <motion.div 
        initial="hidden" 
        animate="visible" 
        variants={fadeUp} 
        style={{ 
          width: '88%', 
          maxWidth: '1050px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          textAlign: 'center', 
          margin: 'auto 0',
          zIndex: 2 
        }}
      >
        {/* Badge 1: PRÉSENTATION PROJET DE FIN D'ÉTUDES */}
        <motion.div custom={1} variants={fadeUp} style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5vw',
          background: 'linear-gradient(90deg, rgba(11, 102, 213, 0.3), rgba(0, 210, 255, 0.2))',
          border: '1px solid rgba(0, 210, 255, 0.4)',
          padding: '0.4vw 1.2vw',
          borderRadius: '20px',
          color: '#38bdf8',
          fontWeight: 800,
          letterSpacing: '0.1em',
          fontSize: '0.9vw',
          textTransform: 'uppercase',
          marginBottom: '0.4vw'
        }}>
          <Award size={16} style={{ color: '#38bdf8' }} />
          PRÉSENTATION PROJET DE FIN D&apos;ÉTUDES
        </motion.div>

        {/* Text 2: POUR L'OBTENTION DU DIPLOME NATIONAL D'INGENIEUR EN INFORMATIQUE */}
        <motion.span custom={2} variants={fadeUp} style={{ 
          color: '#93c5fd', 
          fontWeight: 700, 
          fontSize: '0.95vw', 
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          marginBottom: '1.2vw' 
        }}>
          POUR L&apos;OBTENTION DU DIPLOME NATIONAL D&apos;INGENIEUR EN INFORMATIQUE
        </motion.span>

        {/* Text 3: Conception et Mise en Œuvre d’une Architecture DLP Hybride avec Supervision SOC */}
        <motion.div custom={3} variants={fadeUp} style={{ margin: '0.4vw 0 1vw 0' }}>
          <h1 style={{ fontSize: '2.5vw', lineHeight: '1.2', fontWeight: 800, color: '#ffffff', margin: 0, letterSpacing: '-0.01em' }}>
            Conception et Mise en Œuvre d’une Architecture <span style={{ color: '#38bdf8', background: 'linear-gradient(90deg, #38bdf8, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>DLP Hybride</span> avec Supervision SOC
          </h1>
        </motion.div>

        {/* Text 4: DLP Manager central (Flask API) & Sondes Endpoints Windows */}
        <motion.h2 custom={4} variants={fadeUp} style={{ fontSize: '1.2vw', fontWeight: 500, color: '#cbd5e1', margin: '0 0 1.2vw 0' }}>
          DLP Manager central (Flask API) & Sondes Endpoints Windows
        </motion.h2>

        {/* Text 5: Filière : Ingénierie Informatique et Réseaux (EMSI) */}
        <motion.p custom={5} variants={fadeUp} style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '0.6vw', 
          background: 'rgba(255, 255, 255, 0.05)', 
          border: '1px solid rgba(255, 255, 255, 0.12)', 
          padding: '0.5vw 1.2vw', 
          borderRadius: '10px', 
          color: '#e2e8f0', 
          fontWeight: 700, 
          fontSize: '0.95vw', 
          margin: '0' 
        }}>
          <GraduationCap size={18} style={{ color: '#38bdf8' }}/> Filière : Ingénierie Informatique et Réseaux (EMSI)
        </motion.p>
      </motion.div>

      {/* 3. Metadata Cards at Bottom */}
      <motion.div custom={6} variants={fadeUp} className="title-meta" style={{ 
        width: '94%', 
        maxWidth: '1150px', 
        display: 'grid', 
        gridTemplateColumns: '1fr 1.35fr 1.15fr', 
        gap: '1.2vw', 
        zIndex: 2, 
        marginTop: 'auto',
        marginBottom: '0.4vw'
      }}>
        {/* Card 1: Réalisé par */}
        <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(56, 189, 248, 0.25)', backdropFilter: 'blur(12px)', borderRadius: '12px', padding: '0.7vw 1vw', textAlign: 'left' }}>
          <small style={{ display: 'flex', alignItems: 'center', gap: '0.4vw', color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.68vw', marginBottom: '0.3vw' }}>
            <User size={14} /> Réalisé par
          </small>
          <strong style={{ display: 'block', color: '#ffffff', fontSize: '1.05vw', fontWeight: 800 }}>Mohamed AZZAM</strong>
          <span style={{ fontSize: '0.72vw', color: '#94a3b8', fontWeight: 500, marginTop: '0.1vw', display: 'block' }}>Élève Ingénieur (IIR)</span>
        </div>
        
        {/* Card 2: Encadré par */}
        <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(56, 189, 248, 0.25)', backdropFilter: 'blur(12px)', borderRadius: '12px', padding: '0.7vw 1vw', textAlign: 'left' }}>
          <small style={{ display: 'flex', alignItems: 'center', gap: '0.4vw', color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.68vw', marginBottom: '0.3vw' }}>
            <UserCheck size={14} /> Encadré par
          </small>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2vw' }}>
            <span style={{ color: '#f1f5f9', fontSize: '0.78vw', fontWeight: 700 }}>
              Mme. Zineb MACHROUH <em style={{ fontStyle: 'normal', color: '#94a3b8', fontWeight: 500 }}>(Académique EMSI)</em>
            </span>
            <span style={{ color: '#f1f5f9', fontSize: '0.78vw', fontWeight: 700 }}>
              M. Soufiane RSIOUI & Mme. Oumaima FARAJI <em style={{ fontStyle: 'normal', color: '#94a3b8', fontWeight: 500 }}>(AXA GBS)</em>
            </span>
          </div>
        </div>

        {/* Card 3: Membres du Jury */}
        <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(56, 189, 248, 0.25)', backdropFilter: 'blur(12px)', borderRadius: '12px', padding: '0.7vw 1vw', textAlign: 'left' }}>
          <small style={{ display: 'flex', alignItems: 'center', gap: '0.4vw', color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.68vw', marginBottom: '0.3vw' }}>
            <Users size={14} /> Membres du Jury
          </small>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2vw' }}>
            <span style={{ color: '#f1f5f9', fontSize: '0.78vw', fontWeight: 700 }}>
              Président : <em style={{ fontStyle: 'normal', color: '#94a3b8', fontWeight: 500 }}>Pr. [Nom du Président]</em>
            </span>
            <span style={{ color: '#f1f5f9', fontSize: '0.78vw', fontWeight: 700 }}>
              Examinateur : <em style={{ fontStyle: 'normal', color: '#94a3b8', fontWeight: 500 }}>Pr. [Nom de l&apos;Examinateur]</em>
            </span>
          </div>
        </div>
      </motion.div>

      <div className="title-page-no" style={{ background: '#0b66d5' }}>{String(n).padStart(2, '0')}</div>
    </section>
  );
}
