'use client';

import { useSyncExternalStore } from 'react';
import { motion } from 'framer-motion';
import { Shell } from '../Presentation';
import type { SlideProps } from '../Presentation';

const emptySubscribe = () => () => {};

export default function ZeroTrustSlide({ n }: SlideProps) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!isMounted) {
    return <div className="p-6 text-slate-500">Chargement de la conclusion...</div>;
  }

  return (
    <Shell
      section="CONCLUSION"
      pulseLabel="Conclusion"
      title=""
      n={n}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '85%',
        textAlign: 'center'
      }}>
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: '4.8vw',
            fontWeight: 900,
            color: '#00008f',
            margin: 0,
            letterSpacing: '0.02em',
            textTransform: 'uppercase'
          }}
        >
          Conclusion
        </motion.h1>
      </div>
    </Shell>
  );
}
