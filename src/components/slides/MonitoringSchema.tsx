'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  FileSpreadsheet,
  Copy,
  Upload,
  Cpu,
  Filter,
  ArrowRight,
  UserCheck,
  Zap
} from 'lucide-react';

export default function MonitoringSchema() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  // Sequence animation from start to end:
  // Steps 0..3 : FLUX 1 (Source 1 Exchange -> Action 1 -> Processing 1 -> Analyste DLP)
  // Steps 4..7 : FLUX 2 (Source 2 Excel -> Action 2 -> Processing 2 -> Analyste DLP)
  // Stops at step 7 when finished.
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => {
        if (prev >= 7) {
          clearInterval(interval);
          return 7;
        }
        return prev + 1;
      });
    }, 1300);
    return () => clearInterval(interval);
  }, []);

  const isAnimationFinished = activeStepIndex === 7;

  // Muted Executive Palette (Slate & Soft Navy Accent)
  const activeBorderColor = '#3b82f6';
  const inactiveBorderColor = '#cbd5e1';
  const topAccentColor = '#1e3a8a';
  const badgeBg = '#f1f5f9';
  const badgeText = '#0f172a';

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
      borderLeft: '1.5px solid #cbd5e1',
      borderRight: '1.5px solid #cbd5e1',
      borderTop: '1.5px solid #cbd5e1',
      borderBottom: '1.5px solid #cbd5e1',
      borderRadius: '12px',
      padding: '0.6vw 0.8vw',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>

      {/* 2-Branch Tree Grid Layout */}
      <div style={{
        display: 'grid',
        gridTemplateRows: '1fr 1fr',
        gridTemplateColumns: '1.1fr 0.15fr 1.1fr 0.15fr 1.4fr 0.18fr 1.2fr',
        alignItems: 'center',
        width: '100%',
        flex: 1,
        gap: '0.5vw 0.2vw',
        padding: '0.2vw 0'
      }}>

        {/* ========================================================================= */}
        {/* ROW 1: CHEMIN 1 (FLUX EXCHANGEMAIL - TEXTE BRUT)                         */}
        {/* ========================================================================= */}

        {/* R1 - COL 1: SOURCE 1 - EXCHANGE */}
        <motion.div
          onMouseEnter={() => setHoveredCard('c1-n1')}
          onMouseLeave={() => setHoveredCard(null)}
          animate={{
            y: (activeStepIndex === 0 || hoveredCard === 'c1-n1') ? -3 : 0,
            scale: (activeStepIndex === 0 || hoveredCard === 'c1-n1') ? 1.02 : 0.98,
            boxShadow: (activeStepIndex === 0 || hoveredCard === 'c1-n1')
              ? '0 8px 20px -2px rgba(59, 130, 246, 0.2)'
              : '0 2px 4px rgba(0, 0, 0, 0.02)',
            opacity: (isAnimationFinished || activeStepIndex === 0 || hoveredCard === 'c1-n1') ? 1 : 0.75
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            gridRow: 1,
            gridColumn: 1,
            background: (activeStepIndex === 0 || hoveredCard === 'c1-n1') ? '#f8fafc' : '#ffffff',
            borderLeft: (activeStepIndex === 0 || hoveredCard === 'c1-n1') ? `2px solid ${activeBorderColor}` : `1.5px solid ${inactiveBorderColor}`,
            borderRight: (activeStepIndex === 0 || hoveredCard === 'c1-n1') ? `2px solid ${activeBorderColor}` : `1.5px solid ${inactiveBorderColor}`,
            borderBottom: (activeStepIndex === 0 || hoveredCard === 'c1-n1') ? `2px solid ${activeBorderColor}` : `1.5px solid ${inactiveBorderColor}`,
            borderTop: `4px solid ${topAccentColor}`,
            borderRadius: '10px',
            padding: '0.6vw 0.6vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '96%',
            boxSizing: 'border-box'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25vw' }}>
              <span style={{ background: badgeBg, color: badgeText, border: '1px solid #cbd5e1', borderRadius: '4px', padding: '0.15vw 0.45vw', fontSize: '0.72vw', fontWeight: 900 }}>
                SOURCE 1
              </span>
              <Mail style={{ width: '1.2vw', height: '1.2vw', color: topAccentColor }} />
            </div>
            <h3 style={{ margin: 0, fontSize: '0.88vw', fontWeight: 900, color: '#0f172a' }}>
              Alerte Brute (Texte)
            </h3>
            <p style={{ margin: '0.1vw 0 0.3vw 0', fontSize: '0.72vw', fontWeight: 700, color: '#475569' }}>
              Messagerie Exchange DLP
            </p>
          </div>
          <div style={{ background: '#f8fafc', borderLeft: '1.5px solid #cbd5e1', borderRight: '1.5px solid #cbd5e1', borderTop: '1.5px solid #cbd5e1', borderBottom: '1.5px solid #cbd5e1', borderRadius: '5px', padding: '0.35vw 0.5vw', fontSize: '0.74vw', fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.35vw' }}>
            <Mail style={{ width: '1.0vw', height: '1.0vw', flexShrink: 0, color: topAccentColor }} />
            <span>Flux Email Exchange</span>
          </div>
        </motion.div>

        {/* R1 - COL 2: ARROW 1 */}
        <div style={{ gridRow: 1, gridColumn: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <motion.div
            animate={{
              x: (!isAnimationFinished && activeStepIndex === 0) ? [0, 4, 0] : 0,
              scale: activeStepIndex === 0 ? 1.2 : 1,
              opacity: (isAnimationFinished || activeStepIndex === 0) ? 1 : 0.5
            }}
            transition={{ repeat: (!isAnimationFinished && activeStepIndex === 0) ? Infinity : 0, duration: 1 }}
          >
            <ArrowRight style={{ width: '1.1vw', height: '1.1vw', color: (isAnimationFinished || activeStepIndex === 0) ? activeBorderColor : '#94a3b8' }} />
          </motion.div>
        </div>

        {/* R1 - COL 3: ACTION 1 - COPIER / COLLER */}
        <motion.div
          onMouseEnter={() => setHoveredCard('c1-n2')}
          onMouseLeave={() => setHoveredCard(null)}
          animate={{
            y: (activeStepIndex === 1 || hoveredCard === 'c1-n2') ? -3 : 0,
            scale: (activeStepIndex === 1 || hoveredCard === 'c1-n2') ? 1.02 : 0.98,
            boxShadow: (activeStepIndex === 1 || hoveredCard === 'c1-n2')
              ? '0 8px 20px -2px rgba(59, 130, 246, 0.2)'
              : '0 2px 4px rgba(0, 0, 0, 0.02)',
            opacity: (isAnimationFinished || activeStepIndex === 1 || hoveredCard === 'c1-n2') ? 1 : 0.75
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            gridRow: 1,
            gridColumn: 3,
            background: (activeStepIndex === 1 || hoveredCard === 'c1-n2') ? '#f8fafc' : '#ffffff',
            borderLeft: (activeStepIndex === 1 || hoveredCard === 'c1-n2') ? `2px solid ${activeBorderColor}` : `1.5px solid ${inactiveBorderColor}`,
            borderRight: (activeStepIndex === 1 || hoveredCard === 'c1-n2') ? `2px solid ${activeBorderColor}` : `1.5px solid ${inactiveBorderColor}`,
            borderBottom: (activeStepIndex === 1 || hoveredCard === 'c1-n2') ? `2px solid ${activeBorderColor}` : `1.5px solid ${inactiveBorderColor}`,
            borderTop: `4px solid ${topAccentColor}`,
            borderRadius: '10px',
            padding: '0.6vw 0.6vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '96%',
            boxSizing: 'border-box'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25vw' }}>
              <span style={{ background: badgeBg, color: badgeText, border: '1px solid #cbd5e1', borderRadius: '4px', padding: '0.15vw 0.45vw', fontSize: '0.72vw', fontWeight: 900 }}>
                USER ACTION
              </span>
              <Copy style={{ width: '1.2vw', height: '1.2vw', color: topAccentColor }} />
            </div>
            <h3 style={{ margin: 0, fontSize: '0.88vw', fontWeight: 900, color: '#0f172a' }}>
              Copier / Coller
            </h3>
            <p style={{ margin: '0.1vw 0 0.3vw 0', fontSize: '0.72vw', fontWeight: 700, color: '#475569' }}>
              Saisie par l&apos;analyste
            </p>
          </div>
          <div style={{ background: '#f8fafc', borderLeft: '1.5px solid #cbd5e1', borderRight: '1.5px solid #cbd5e1', borderTop: '1.5px solid #cbd5e1', borderBottom: '1.5px solid #cbd5e1', borderRadius: '5px', padding: '0.35vw 0.5vw', fontSize: '0.74vw', fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.35vw' }}>
            <Copy style={{ width: '1.0vw', height: '1.0vw', flexShrink: 0, color: topAccentColor }} />
            <span>Saisie Texte Brut</span>
          </div>
        </motion.div>

        {/* R1 - COL 4: ARROW 2 */}
        <div style={{ gridRow: 1, gridColumn: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <motion.div
            animate={{
              x: (!isAnimationFinished && activeStepIndex === 1) ? [0, 4, 0] : 0,
              scale: activeStepIndex === 1 ? 1.2 : 1,
              opacity: (isAnimationFinished || activeStepIndex === 1) ? 1 : 0.5
            }}
            transition={{ repeat: (!isAnimationFinished && activeStepIndex === 1) ? Infinity : 0, duration: 1 }}
          >
            <ArrowRight style={{ width: '1.1vw', height: '1.1vw', color: (isAnimationFinished || activeStepIndex === 1) ? activeBorderColor : '#94a3b8' }} />
          </motion.div>
        </div>

        {/* R1 - COL 5: PROCESSING 1 - CHEMIN 1 (PARSING TEXTUEL) */}
        <motion.div
          onMouseEnter={() => setHoveredCard('c1-n3')}
          onMouseLeave={() => setHoveredCard(null)}
          animate={{
            y: (activeStepIndex === 2 || hoveredCard === 'c1-n3') ? -3 : 0,
            scale: (activeStepIndex === 2 || hoveredCard === 'c1-n3') ? 1.02 : 0.98,
            boxShadow: (activeStepIndex === 2 || hoveredCard === 'c1-n3')
              ? '0 8px 20px -2px rgba(59, 130, 246, 0.2)'
              : '0 2px 4px rgba(0, 0, 0, 0.02)',
            opacity: (isAnimationFinished || activeStepIndex === 2 || hoveredCard === 'c1-n3') ? 1 : 0.75
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            gridRow: 1,
            gridColumn: 5,
            background: (activeStepIndex === 2 || hoveredCard === 'c1-n3') ? '#f8fafc' : '#ffffff',
            borderLeft: (activeStepIndex === 2 || hoveredCard === 'c1-n3') ? `2px solid ${activeBorderColor}` : `1.5px solid ${inactiveBorderColor}`,
            borderRight: (activeStepIndex === 2 || hoveredCard === 'c1-n3') ? `2px solid ${activeBorderColor}` : `1.5px solid ${inactiveBorderColor}`,
            borderBottom: (activeStepIndex === 2 || hoveredCard === 'c1-n3') ? `2px solid ${activeBorderColor}` : `1.5px solid ${inactiveBorderColor}`,
            borderTop: `4px solid ${topAccentColor}`,
            borderRadius: '10px',
            padding: '0.6vw 0.6vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '96%',
            boxSizing: 'border-box'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25vw' }}>
              <span style={{ background: badgeBg, color: badgeText, border: '1px solid #cbd5e1', borderRadius: '4px', padding: '0.15vw 0.45vw', fontSize: '0.72vw', fontWeight: 900 }}>
                PLATEFORME DLP TOOL
              </span>
              <Cpu style={{ width: '1.2vw', height: '1.2vw', color: topAccentColor }} />
            </div>
            <h3 style={{ margin: 0, fontSize: '0.88vw', fontWeight: 900, color: '#0f172a' }}>
              Chemin 1 : Parsing &amp; Extraction
            </h3>
            <p style={{ margin: '0.1vw 0 0.3vw 0', fontSize: '0.72vw', fontWeight: 700, color: '#475569' }}>
              Traitement automatique du texte
            </p>
          </div>
          <div style={{ background: '#f8fafc', borderLeft: '1.5px solid #cbd5e1', borderRight: '1.5px solid #cbd5e1', borderTop: '1.5px solid #cbd5e1', borderBottom: '1.5px solid #cbd5e1', borderRadius: '5px', padding: '0.35vw 0.5vw', fontSize: '0.74vw', fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.35vw' }}>
            <Cpu style={{ width: '1.0vw', height: '1.0vw', flexShrink: 0, color: topAccentColor }} />
            <span>Champs essentiels uniquement</span>
          </div>
        </motion.div>

        {/* R1 - COL 6: CONVERGENCE ARROW TOP */}
        <div style={{ gridRow: 1, gridColumn: 6, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <motion.div
            animate={{
              x: (!isAnimationFinished && activeStepIndex === 2) ? [0, 4, 0] : 0,
              scale: activeStepIndex === 2 ? 1.2 : 1,
              opacity: (isAnimationFinished || activeStepIndex === 2) ? 1 : 0.5
            }}
            transition={{ repeat: (!isAnimationFinished && activeStepIndex === 2) ? Infinity : 0, duration: 1 }}
          >
            <ArrowRight style={{ width: '1.1vw', height: '1.1vw', color: (isAnimationFinished || activeStepIndex === 2) ? activeBorderColor : '#94a3b8' }} />
          </motion.div>
        </div>


        {/* ========================================================================= */}
        {/* ROW 2: CHEMIN 2 (FLUX EXPORT LOG ANALYTICS - EXCEL)                       */}
        {/* ========================================================================= */}

        {/* R2 - COL 1: SOURCE 2 - EXCEL LOG ANALYTICS */}
        <motion.div
          onMouseEnter={() => setHoveredCard('c2-n1')}
          onMouseLeave={() => setHoveredCard(null)}
          animate={{
            y: (activeStepIndex === 4 || hoveredCard === 'c2-n1') ? -3 : 0,
            scale: (activeStepIndex === 4 || hoveredCard === 'c2-n1') ? 1.02 : 0.98,
            boxShadow: (activeStepIndex === 4 || hoveredCard === 'c2-n1')
              ? '0 8px 20px -2px rgba(59, 130, 246, 0.2)'
              : '0 2px 4px rgba(0, 0, 0, 0.02)',
            opacity: (isAnimationFinished || activeStepIndex === 4 || hoveredCard === 'c2-n1') ? 1 : 0.75
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            gridRow: 2,
            gridColumn: 1,
            background: (activeStepIndex === 4 || hoveredCard === 'c2-n1') ? '#f8fafc' : '#ffffff',
            borderLeft: (activeStepIndex === 4 || hoveredCard === 'c2-n1') ? `2px solid ${activeBorderColor}` : `1.5px solid ${inactiveBorderColor}`,
            borderRight: (activeStepIndex === 4 || hoveredCard === 'c2-n1') ? `2px solid ${activeBorderColor}` : `1.5px solid ${inactiveBorderColor}`,
            borderBottom: (activeStepIndex === 4 || hoveredCard === 'c2-n1') ? `2px solid ${activeBorderColor}` : `1.5px solid ${inactiveBorderColor}`,
            borderTop: `4px solid ${topAccentColor}`,
            borderRadius: '10px',
            padding: '0.6vw 0.6vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '96%',
            boxSizing: 'border-box'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25vw' }}>
              <span style={{ background: badgeBg, color: badgeText, border: '1px solid #cbd5e1', borderRadius: '4px', padding: '0.15vw 0.45vw', fontSize: '0.72vw', fontWeight: 900 }}>
                SOURCE 2
              </span>
              <FileSpreadsheet style={{ width: '1.2vw', height: '1.2vw', color: topAccentColor }} />
            </div>
            <h3 style={{ margin: 0, fontSize: '0.88vw', fontWeight: 900, color: '#0f172a' }}>
              Export Log Analytics
            </h3>
            <p style={{ margin: '0.1vw 0 0.3vw 0', fontSize: '0.72vw', fontWeight: 700, color: '#475569' }}>
              Fichier Excel (.xlsx)
            </p>
          </div>
          <div style={{ background: '#f8fafc', borderLeft: '1.5px solid #cbd5e1', borderRight: '1.5px solid #cbd5e1', borderTop: '1.5px solid #cbd5e1', borderBottom: '1.5px solid #cbd5e1', borderRadius: '5px', padding: '0.35vw 0.5vw', fontSize: '0.74vw', fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.35vw' }}>
            <FileSpreadsheet style={{ width: '1.0vw', height: '1.0vw', flexShrink: 0, color: topAccentColor }} />
            <span>Fichier Data Excel</span>
          </div>
        </motion.div>

        {/* R2 - COL 2: ARROW 1 */}
        <div style={{ gridRow: 2, gridColumn: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <motion.div
            animate={{
              x: (!isAnimationFinished && activeStepIndex === 4) ? [0, 4, 0] : 0,
              scale: activeStepIndex === 4 ? 1.2 : 1,
              opacity: (isAnimationFinished || activeStepIndex === 4) ? 1 : 0.5
            }}
            transition={{ repeat: (!isAnimationFinished && activeStepIndex === 4) ? Infinity : 0, duration: 1 }}
          >
            <ArrowRight style={{ width: '1.1vw', height: '1.1vw', color: (isAnimationFinished || activeStepIndex === 4) ? activeBorderColor : '#94a3b8' }} />
          </motion.div>
        </div>

        {/* R2 - COL 3: ACTION 2 - UPLOAD FICHIER */}
        <motion.div
          onMouseEnter={() => setHoveredCard('c2-n2')}
          onMouseLeave={() => setHoveredCard(null)}
          animate={{
            y: (activeStepIndex === 5 || hoveredCard === 'c2-n2') ? -3 : 0,
            scale: (activeStepIndex === 5 || hoveredCard === 'c2-n2') ? 1.02 : 0.98,
            boxShadow: (activeStepIndex === 5 || hoveredCard === 'c2-n2')
              ? '0 8px 20px -2px rgba(59, 130, 246, 0.2)'
              : '0 2px 4px rgba(0, 0, 0, 0.02)',
            opacity: (isAnimationFinished || activeStepIndex === 5 || hoveredCard === 'c2-n2') ? 1 : 0.75
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            gridRow: 2,
            gridColumn: 3,
            background: (activeStepIndex === 5 || hoveredCard === 'c2-n2') ? '#f8fafc' : '#ffffff',
            borderLeft: (activeStepIndex === 5 || hoveredCard === 'c2-n2') ? `2px solid ${activeBorderColor}` : `1.5px solid ${inactiveBorderColor}`,
            borderRight: (activeStepIndex === 5 || hoveredCard === 'c2-n2') ? `2px solid ${activeBorderColor}` : `1.5px solid ${inactiveBorderColor}`,
            borderBottom: (activeStepIndex === 5 || hoveredCard === 'c2-n2') ? `2px solid ${activeBorderColor}` : `1.5px solid ${inactiveBorderColor}`,
            borderTop: `4px solid ${topAccentColor}`,
            borderRadius: '10px',
            padding: '0.6vw 0.6vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '96%',
            boxSizing: 'border-box'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25vw' }}>
              <span style={{ background: badgeBg, color: badgeText, border: '1px solid #cbd5e1', borderRadius: '4px', padding: '0.15vw 0.45vw', fontSize: '0.72vw', fontWeight: 900 }}>
                USER ACTION
              </span>
              <Upload style={{ width: '1.2vw', height: '1.2vw', color: topAccentColor }} />
            </div>
            <h3 style={{ margin: 0, fontSize: '0.88vw', fontWeight: 900, color: '#0f172a' }}>
              Upload du Fichier
            </h3>
            <p style={{ margin: '0.1vw 0 0.3vw 0', fontSize: '0.72vw', fontWeight: 700, color: '#475569' }}>
              Importation dans l&apos;outil
            </p>
          </div>
          <div style={{ background: '#f8fafc', borderLeft: '1.5px solid #cbd5e1', borderRight: '1.5px solid #cbd5e1', borderTop: '1.5px solid #cbd5e1', borderBottom: '1.5px solid #cbd5e1', borderRadius: '5px', padding: '0.35vw 0.5vw', fontSize: '0.74vw', fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.35vw' }}>
            <Upload style={{ width: '1.0vw', height: '1.0vw', flexShrink: 0, color: topAccentColor }} />
            <span>Import Direct Fichier</span>
          </div>
        </motion.div>

        {/* R2 - COL 4: ARROW 2 */}
        <div style={{ gridRow: 2, gridColumn: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <motion.div
            animate={{
              x: (!isAnimationFinished && activeStepIndex === 5) ? [0, 4, 0] : 0,
              scale: activeStepIndex === 5 ? 1.2 : 1,
              opacity: (isAnimationFinished || activeStepIndex === 5) ? 1 : 0.5
            }}
            transition={{ repeat: (!isAnimationFinished && activeStepIndex === 5) ? Infinity : 0, duration: 1 }}
          >
            <ArrowRight style={{ width: '1.1vw', height: '1.1vw', color: (isAnimationFinished || activeStepIndex === 5) ? activeBorderColor : '#94a3b8' }} />
          </motion.div>
        </div>

        {/* R2 - COL 5: PROCESSING 2 - CHEMIN 2 (NETTOYAGE & DÉDOUBLONNAGE) */}
        <motion.div
          onMouseEnter={() => setHoveredCard('c2-n3')}
          onMouseLeave={() => setHoveredCard(null)}
          animate={{
            y: (activeStepIndex === 6 || hoveredCard === 'c2-n3') ? -3 : 0,
            scale: (activeStepIndex === 6 || hoveredCard === 'c2-n3') ? 1.02 : 0.98,
            boxShadow: (activeStepIndex === 6 || hoveredCard === 'c2-n3')
              ? '0 8px 20px -2px rgba(59, 130, 246, 0.2)'
              : '0 2px 4px rgba(0, 0, 0, 0.02)',
            opacity: (isAnimationFinished || activeStepIndex === 6 || hoveredCard === 'c2-n3') ? 1 : 0.75
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            gridRow: 2,
            gridColumn: 5,
            background: (activeStepIndex === 6 || hoveredCard === 'c2-n3') ? '#f8fafc' : '#ffffff',
            borderLeft: (activeStepIndex === 6 || hoveredCard === 'c2-n3') ? `2px solid ${activeBorderColor}` : `1.5px solid ${inactiveBorderColor}`,
            borderRight: (activeStepIndex === 6 || hoveredCard === 'c2-n3') ? `2px solid ${activeBorderColor}` : `1.5px solid ${inactiveBorderColor}`,
            borderBottom: (activeStepIndex === 6 || hoveredCard === 'c2-n3') ? `2px solid ${activeBorderColor}` : `1.5px solid ${inactiveBorderColor}`,
            borderTop: `4px solid ${topAccentColor}`,
            borderRadius: '10px',
            padding: '0.6vw 0.6vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '96%',
            boxSizing: 'border-box'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25vw' }}>
              <span style={{ background: badgeBg, color: badgeText, border: '1px solid #cbd5e1', borderRadius: '4px', padding: '0.15vw 0.45vw', fontSize: '0.72vw', fontWeight: 900 }}>
                PLATEFORME DLP TOOL
              </span>
              <Filter style={{ width: '1.2vw', height: '1.2vw', color: topAccentColor }} />
            </div>
            <h3 style={{ margin: 0, fontSize: '0.88vw', fontWeight: 900, color: '#0f172a' }}>
              Chemin 2 : Nettoyage &amp; Dédoublonnage
            </h3>
            <p style={{ margin: '0.1vw 0 0.3vw 0', fontSize: '0.72vw', fontWeight: 700, color: '#475569' }}>
              Suppression des doublons
            </p>
          </div>
          <div style={{ background: '#f8fafc', borderLeft: '1.5px solid #cbd5e1', borderRight: '1.5px solid #cbd5e1', borderTop: '1.5px solid #cbd5e1', borderBottom: '1.5px solid #cbd5e1', borderRadius: '5px', padding: '0.35vw 0.5vw', fontSize: '0.74vw', fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.35vw' }}>
            <Filter style={{ width: '1.0vw', height: '1.0vw', flexShrink: 0, color: topAccentColor }} />
            <span>Fichier épuré (Champs obligatoires)</span>
          </div>
        </motion.div>

        {/* R2 - COL 6: CONVERGENCE ARROW BOTTOM */}
        <div style={{ gridRow: 2, gridColumn: 6, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <motion.div
            animate={{
              x: (!isAnimationFinished && activeStepIndex === 6) ? [0, 4, 0] : 0,
              scale: activeStepIndex === 6 ? 1.2 : 1,
              opacity: (isAnimationFinished || activeStepIndex === 6) ? 1 : 0.5
            }}
            transition={{ repeat: (!isAnimationFinished && activeStepIndex === 6) ? Infinity : 0, duration: 1 }}
          >
            <ArrowRight style={{ width: '1.1vw', height: '1.1vw', color: (isAnimationFinished || activeStepIndex === 6) ? activeBorderColor : '#94a3b8' }} />
          </motion.div>
        </div>


        {/* ========================================================================= */}
        {/* DESTINATION NODE: ANALYSTE DLP / SOC (CONVERGENCE SUR 2 RANGÉES)          */}
        {/* ========================================================================= */}
        <motion.div
          onMouseEnter={() => setHoveredCard('dest')}
          onMouseLeave={() => setHoveredCard(null)}
          animate={{
            scale: (activeStepIndex === 3 || activeStepIndex === 7 || hoveredCard === 'dest') ? 1.03 : 1,
            boxShadow: (activeStepIndex === 3 || activeStepIndex === 7 || hoveredCard === 'dest')
              ? '0 10px 24px rgba(16, 185, 129, 0.35), 0 0 14px rgba(16, 185, 129, 0.2)'
              : '0 3px 8px rgba(0, 0, 0, 0.03)',
            opacity: 1
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            gridRow: '1 / span 2',
            gridColumn: 7,
            background: (activeStepIndex === 3 || activeStepIndex === 7 || hoveredCard === 'dest') 
              ? 'linear-gradient(145deg, #f0fdf4 0%, #dcfce7 100%)' 
              : '#ffffff',
            borderLeft: (activeStepIndex === 3 || activeStepIndex === 7 || hoveredCard === 'dest') ? '2px solid #059669' : '1.5px solid #cbd5e1',
            borderRight: (activeStepIndex === 3 || activeStepIndex === 7 || hoveredCard === 'dest') ? '2px solid #059669' : '1.5px solid #cbd5e1',
            borderTop: (activeStepIndex === 3 || activeStepIndex === 7 || hoveredCard === 'dest') ? '2px solid #059669' : '1.5px solid #cbd5e1',
            borderBottom: (activeStepIndex === 3 || activeStepIndex === 7 || hoveredCard === 'dest') ? '2px solid #059669' : '1.5px solid #cbd5e1',
            borderRadius: '10px',
            padding: '0.6vw 0.6vw',
            color: '#0f172a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6vw',
            textAlign: 'center',
            height: '80%',
            alignSelf: 'center',
            boxSizing: 'border-box'
          }}
        >
          {/* Header & Avatar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: '2.5vw',
              height: '2.5vw',
              borderRadius: '50%',
              background: '#ecfdf5',
              borderLeft: '1.5px solid #a7f3d0',
              borderRight: '1.5px solid #a7f3d0',
              borderTop: '1.5px solid #a7f3d0',
              borderBottom: '1.5px solid #a7f3d0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '0.25vw'
            }}>
              <UserCheck style={{ width: '1.5vw', height: '1.5vw', color: '#059669' }} />
            </div>

            <h3 style={{ margin: 0, fontSize: '0.88vw', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.03em', color: '#064e3b' }}>
              ANALYSTE DLP
            </h3>
            <span style={{ fontSize: '0.72vw', fontWeight: 700, color: '#047857', marginTop: '0.08vw' }}>
              Envoi Alerte au N+1
            </span>
          </div>

          {/* Badges */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.4vw' }}>
            <div style={{ background: '#ecfdf5', borderLeft: '1px solid #a7f3d0', borderRight: '1px solid #a7f3d0', borderTop: '1px solid #a7f3d0', borderBottom: '1px solid #a7f3d0', borderRadius: '5px', padding: '0.3vw 0.45vw', fontSize: '0.72vw', fontWeight: 800, color: '#166534' }}>
              Escalade Rapide vers N+1 ✓
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
              borderLeft: '1px solid #6ee7b7',
              borderRight: '1px solid #6ee7b7',
              borderTop: '1px solid #6ee7b7',
              borderBottom: '1px solid #6ee7b7',
              borderRadius: '6px',
              padding: '0.35vw 0.45vw',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.3vw',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.25)'
            }}>
              <Zap style={{ width: '0.9vw', height: '0.9vw', color: '#ffffff' }} />
              <span style={{ fontSize: '0.78vw', fontWeight: 900, color: '#ffffff' }}>
                GAIN DE TEMPS
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
