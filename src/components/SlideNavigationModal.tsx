'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import type { Slide } from './Presentation';

type SlideNavigationModalProps = {
  isOpen: boolean;
  slides: Slide[];
  currentIndex: number;
  onSelectSlide: (index: number) => void;
  onClose: () => void;
};

export default function SlideNavigationModal({
  isOpen,
  slides,
  currentIndex,
  onSelectSlide,
  onClose
}: SlideNavigationModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2vw'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '90%',
            maxWidth: '900px',
            maxHeight: '88vh',
            background: '#0f172a',
            border: '1px solid #334155',
            borderRadius: '16px',
            padding: '1.4vw 1.8vw',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '1vw',
              borderBottom: '1px solid #1e293b',
              marginBottom: '1vw'
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2vw', fontWeight: 800, color: '#ffffff' }}>
                Aller à la slide...
              </h3>
              <span style={{ fontSize: '0.75vw', color: '#94a3b8', fontWeight: 500 }}>
                Cliquez sur une slide pour y revenir directement [Touche M ou Échap pour fermer]
              </span>
            </div>

            <button
              onClick={onClose}
              style={{
                background: '#1e293b',
                border: '1px solid #334155',
                color: '#94a3b8',
                borderRadius: '8px',
                padding: '0.3vw 0.7vw',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4vw',
                cursor: 'pointer',
                fontSize: '0.75vw',
                fontWeight: 600
              }}
            >
              <span>Fermer</span>
              <X size={14} />
            </button>
          </div>

          {/* Clean 2-Column List of Slides */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.6vw',
              overflowY: 'auto',
              maxHeight: '68vh',
              paddingRight: '0.3vw'
            }}
          >
            {slides.map((slide, idx) => {
              const isActive = idx === currentIndex;
              const numStr = String(idx + 1).padStart(2, '0');

              return (
                <div
                  key={idx}
                  onClick={() => onSelectSlide(idx)}
                  style={{
                    background: isActive ? '#1e293b' : '#182238',
                    border: isActive ? '1.5px solid #0b66d5' : '1px solid #1e293b',
                    borderRadius: '10px',
                    padding: '0.65vw 0.9vw',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.7vw', flex: 1, minWidth: 0 }}>
                    {/* Slide Number */}
                    <span
                      style={{
                        fontSize: '0.85vw',
                        fontWeight: 900,
                        color: isActive ? '#38bdf8' : '#64748b',
                        width: '1.8vw',
                        flexShrink: 0
                      }}
                    >
                      {numStr}
                    </span>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1vw', flex: 1, minWidth: 0 }}>
                      <span
                        style={{
                          fontSize: '0.58vw',
                          fontWeight: 700,
                          color: isActive ? '#38bdf8' : '#94a3b8',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}
                      >
                        {slide.section} {isActive && '• (ACTUELLE)'}
                      </span>
                      <span
                        style={{
                          color: isActive ? '#ffffff' : '#cbd5e1',
                          fontWeight: isActive ? 800 : 600,
                          fontSize: '0.82vw',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {slide.title}
                      </span>
                    </div>
                  </div>

                  <ArrowRight
                    size={14}
                    style={{
                      color: isActive ? '#38bdf8' : '#475569',
                      marginLeft: '0.4vw',
                      flexShrink: 0
                    }}
                  />
                </div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
