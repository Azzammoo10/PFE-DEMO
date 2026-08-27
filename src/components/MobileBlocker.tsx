'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileBlocker() {
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
      const isMobileUA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      
      // Block mobile phones in both portrait and landscape, or any small screen
      const isPortraitMobile = window.innerWidth <= 850 && window.innerHeight > window.innerWidth;
      const isLandscapeMobile = window.innerHeight <= 600 || (isMobileUA && Math.max(window.innerWidth, window.innerHeight) <= 1024);
      const isTouchMobilePhone = isMobileUA && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

      setIsMobileDevice(isMobileUA || isPortraitMobile || isLandscapeMobile || isTouchMobilePhone);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  if (!isMobileDevice) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="mobile-blocker-minimal"
        style={{ fontFamily: "'Plus Jakarta Sans', Arial, sans-serif" }}
      >
        {/* Ambient Radial Lighting */}
        <div className="radial-ambient-glow" />

        <motion.div
          initial={{ scale: 0.92, y: 15, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="minimal-content-container"
        >
          {/* Top Pill Badge */}
          <div className="minimal-badge" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <span className="live-dot" />
            Soutenance PFE • EMSI / AXA
          </div>

          {/* 3D Animated Laptop Opening Scene */}
          <div className="laptop-3d-scene">
            <div className="laptop-3d-wrapper">
              <motion.div
                className="laptop-lid"
                animate={{
                  rotateX: [-85, 0, 0, -85],
                  rotateY: [0, -8, 8, 0],
                  scale: [0.95, 1, 1, 0.95],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: [0.25, 1, 0.35, 1],
                  times: [0, 0.25, 0.75, 1],
                }}
              >
                <div className="laptop-camera" />
                <div className="laptop-display-screen">
                  <motion.div 
                    className="laptop-slide-content"
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 5, repeat: Infinity, repeatDelay: 1, times: [0.15, 0.25, 0.75, 0.85] }}
                  >
                    <div className="laptop-slide-header">
                      <span className="laptop-brand" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>DLP-LAB</span>
                      <span className="laptop-page" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>01/15</span>
                    </div>

                    <div className="laptop-slide-grid">
                      <div className="laptop-card-box">
                        <div className="mini-bar-pulse" />
                      </div>
                      <div className="laptop-card-box highlight">
                        <div className="mini-line-full" />
                        <div className="mini-line-half" />
                      </div>
                    </div>

                    <div className="laptop-footer-bar" />
                  </motion.div>
                </div>
              </motion.div>

              <div className="laptop-base">
                <div className="laptop-notch" />
                <div className="laptop-keyboard">
                  <div className="keyboard-row" />
                  <div className="keyboard-row" />
                </div>
                <div className="laptop-trackpad" />
              </div>

              <div className="laptop-glow-shadow" />
            </div>
          </div>

          {/* Minimal Typography */}
          <h1 className="minimal-title" style={{ fontFamily: "'Plus Jakarta Sans', Arial, sans-serif" }}>
            Veuillez utiliser un Ordinateur
          </h1>
          <p className="minimal-subtitle" style={{ fontFamily: "'Plus Jakarta Sans', Arial, sans-serif" }}>
            Cette présentation de soutenance <strong>PFE DLP-LAB</strong> est exclusivement réservée aux écrans d&apos;<strong>Ordinateurs (PC / Mac)</strong>. Les téléphones mobiles (portrait & paysage) ne sont pas autorisés.
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
