'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Laptop, 
  Server, 
  Database, 
  FileText, 
  HardDrive, 
  Clipboard, 
  Mail, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  ArrowRight,
  LayoutDashboard,
  Bell,
  FolderCheck,
  Users,
  Sliders,
  Send,
  RefreshCw,
  Activity,
  Check,
  ShieldCheck
} from 'lucide-react';

export default function Volet2DlpManagerSchema() {
  const primaryBlue = '#0b66d5';
  const darkNavy = '#0f172a';
  const slateBorder = '#cbd5e1';

  // Pipeline Sequential Timeline Step: 1 -> 2 -> 3 -> 4
  const [pipelineStep, setPipelineStep] = useState<1 | 2 | 3 | 4>(1);

  // Console Dashboard Tabs for Column 3
  const consoleTabs = [
    { label: 'Dashboard', icon: LayoutDashboard, kpi: '14 Alertes (100% OK)' },
    { label: 'Alertes + Détails N+1', icon: Bell, kpi: 'Investiguer / Escalade' },
    { label: 'Classified Files', icon: FolderCheck, kpi: 'CONFIDENTIAL / SECRET' },
    { label: 'Section Teams (N+1)', icon: Users, kpi: 'Organigramme Résolu' },
    { label: 'Section Rules', icon: Sliders, kpi: 'Règles Actives' }
  ];

  // Auto-advance sequential 4-step pipeline every 2.4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setPipelineStep((prev) => (prev === 4 ? 1 : (prev + 1) as 1 | 2 | 3 | 4));
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      background: '#ffffff',
      color: darkNavy,
      border: `1.5px solid ${slateBorder}`,
      borderRadius: '16px',
      padding: '0.8vw 1.2vw',
      boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)',
      boxSizing: 'border-box',
      overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>

      {/* TOP PIPELINE TIMELINE STEP BAR (1 -> 2 -> 3 -> 4) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: '0.6vw',
        padding: '0.4vw 0.8vw',
        background: '#f8fafc',
        border: '1.5px solid #e2e8f0',
        borderRadius: '10px'
      }}>
        {[
          { num: 1, title: '1. Capture Sondes', color: '#0b66d5' },
          { num: 2, title: '2. Analyse rules.json', color: '#6366f1' },
          { num: 3, title: '3. Console DLP Web', color: '#0284c7' },
          { num: 4, title: '4. Ingestion SOC', color: '#059669' }
        ].map((st) => {
          const isActive = pipelineStep === st.num;
          return (
            <div
              key={st.num}
              onClick={() => setPipelineStep(st.num as 1 | 2 | 3 | 4)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4vw',
                cursor: 'pointer',
                opacity: isActive ? 1 : 0.6,
                transform: isActive ? 'scale(1.03)' : 'scale(1)',
                transition: 'all 0.25s ease'
              }}
            >
              <div style={{
                width: '1.4vw',
                height: '1.4vw',
                borderRadius: '50%',
                background: isActive ? st.color : '#cbd5e1',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75vw',
                fontWeight: 900,
                boxShadow: isActive ? `0 0 10px ${st.color}50` : 'none'
              }}>
                {isActive ? <Check size={12} strokeWidth={3} /> : st.num}
              </div>
              <span style={{
                fontSize: '0.8vw',
                fontWeight: isActive ? 900 : 700,
                color: isActive ? st.color : '#475569'
              }}>
                {st.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* MAIN 4-COLUMN SEQUENTIAL ARCHITECTURE GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.1fr 34px 1.25fr 34px 1.4fr 34px 0.9fr',
        alignItems: 'stretch',
        flex: 1,
        gap: '0.2vw'
      }}>

        {/* =================================================== */}
        {/* COLUMN 1: ENDPOINTS & SONDES (ANIMATED WHEN STEP 1) */}
        {/* =================================================== */}
        <motion.div
          animate={{
            borderColor: pipelineStep === 1 ? primaryBlue : slateBorder,
            boxShadow: pipelineStep === 1 ? '0 0 16px rgba(11, 102, 213, 0.2)' : '0 2px 8px rgba(0,0,0,0.02)'
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: pipelineStep === 1 ? '#f0f7ff' : '#f8fafc',
            border: '1.5px solid #cbd5e1',
            borderTop: `5px solid ${primaryBlue}`,
            borderRadius: '12px',
            padding: '0.8vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5vw', marginBottom: '0.5vw', paddingBottom: '0.4vw', borderBottom: '2px solid #e2e8f0' }}>
              <Laptop size={20} color={primaryBlue} />
              <div>
                <strong style={{ fontSize: '0.9vw', color: darkNavy, display: 'block', fontWeight: 900 }}>1. SONDES ENDPOINTS</strong>
                <span style={{ fontSize: '0.7vw', color: primaryBlue, fontFamily: 'monospace', fontWeight: 800 }}>Micro-Agents Python</span>
              </div>
            </div>

            {/* 4 PYTHON PROBES */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35vw' }}>
              {[
                { name: 'file_scanner.py', desc: 'watchdog I/O', icon: FileText },
                { name: 'usb_monitor.py', desc: 'psutil / USB', icon: HardDrive },
                { name: 'clipboard_monitor.py', desc: 'pyperclip', icon: Clipboard },
                { name: 'email_monitor.py', desc: 'Swaks', icon: Mail }
              ].map((probe, i) => {
                const Icon = probe.icon;
                const isProbeActive = pipelineStep === 1;
                return (
                  <motion.div
                    key={probe.name}
                    animate={{
                      borderColor: isProbeActive ? primaryBlue : '#cbd5e1',
                      background: isProbeActive ? '#ffffff' : '#f8fafc'
                    }}
                    transition={{ duration: 0.2, delay: i * 0.1 }}
                    style={{
                      padding: '0.35vw 0.5vw',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45vw',
                      fontSize: '0.78vw',
                      color: '#1e293b',
                      fontWeight: 600
                    }}
                  >
                    <Icon size={14} color={primaryBlue} />
                    <span><code>{probe.name}</code> ({probe.desc})</span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* HTTP POST TRANSMISSION BADGE */}
          <div style={{
            background: pipelineStep === 1 ? '#dbeafe' : '#eff6ff',
            border: `1.5px solid ${pipelineStep === 1 ? '#3b82f6' : '#bfdbfe'}`,
            borderRadius: '8px',
            padding: '0.4vw 0.55vw',
            position: 'relative',
            overflow: 'hidden',
            marginTop: '0.4vw'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4vw' }}>
              <Send size={14} color="#1e40af" />
              <span style={{ fontSize: '0.75vw', color: '#1e40af', fontWeight: 800 }}>
                {pipelineStep === 1 ? 'Envoi HTTP POST JSON...' : 'Transport HTTP POST JSON'}
              </span>
            </div>

            {pipelineStep === 1 && (
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  width: '40%',
                  background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent)'
                }}
              />
            )}
          </div>
        </motion.div>

        {/* CONNECTOR 1 -> 2 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <ArrowRight size={24} strokeWidth={3.5} color={pipelineStep === 1 ? primaryBlue : '#cbd5e1'} />
          {pipelineStep === 1 && (
            <motion.div
              animate={{ x: [-6, 6], opacity: [0.2, 1, 0.2] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              style={{
                fontSize: '0.55vw',
                fontWeight: 900,
                color: primaryBlue,
                background: '#eff6ff',
                padding: '1px 4px',
                borderRadius: '3px',
                border: '1px solid #93c5fd',
                marginTop: '4px'
              }}
            >
              JSON
            </motion.div>
          )}
        </div>

        {/* =================================================== */}
        {/* COLUMN 2: DLP MANAGER & RULES (ANIMATED WHEN STEP 2) */}
        {/* =================================================== */}
        <motion.div
          animate={{
            borderColor: pipelineStep === 2 ? '#6366f1' : slateBorder,
            boxShadow: pipelineStep === 2 ? '0 0 16px rgba(99, 102, 241, 0.2)' : '0 2px 8px rgba(0,0,0,0.02)'
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: pipelineStep === 2 ? '#f5f3ff' : '#f8fafc',
            border: '1.5px solid #cbd5e1',
            borderTop: '5px solid #6366f1',
            borderRadius: '12px',
            padding: '0.8vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5vw', marginBottom: '0.5vw', paddingBottom: '0.4vw', borderBottom: '2px solid #e2e8f0' }}>
              <Server size={20} color="#6366f1" />
              <div>
                <strong style={{ fontSize: '0.9vw', color: darkNavy, display: 'block', fontWeight: 900 }}>2. DLP MANAGER &amp; RÈGLES</strong>
                <span style={{ fontSize: '0.7vw', color: '#6366f1', fontFamily: 'monospace', fontWeight: 800 }}>API Flask &amp; rules.json</span>
              </div>
            </div>

            {/* ENGINE STATUS */}
            <div style={{ background: '#ffffff', padding: '0.35vw 0.5vw', borderRadius: '6px', border: '1px solid #cbd5e1', marginBottom: '0.4vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.78vw', color: darkNavy, fontWeight: 800 }}>
                Analyse &amp; Matrice :
              </span>
              <motion.div
                animate={{ rotate: pipelineStep === 2 ? 360 : 0 }}
                transition={{ repeat: pipelineStep === 2 ? Infinity : 0, duration: 1.5, ease: 'linear' }}
                style={{ display: 'flex' }}
              >
                <RefreshCw size={14} color="#6366f1" />
              </motion.div>
            </div>

            {/* 3 DECISION ACTIONS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35vw' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5vw',
                background: '#ecfdf5',
                padding: '0.35vw 0.5vw',
                borderRadius: '6px',
                border: '1.5px solid #a7f3d0',
                opacity: pipelineStep === 2 ? 1 : 0.75
              }}>
                <CheckCircle2 size={15} color="#059669" />
                <span style={{ fontSize: '0.78vw', color: '#065f46', fontWeight: 900 }}>ALLOW (200) : Autorisé</span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5vw',
                background: '#fffbeb',
                padding: '0.35vw 0.5vw',
                borderRadius: '6px',
                border: '1.5px solid #fde68a',
                opacity: pipelineStep === 2 ? 1 : 0.75
              }}>
                <AlertTriangle size={15} color="#d97706" />
                <span style={{ fontSize: '0.78vw', color: '#92400e', fontWeight: 900 }}>ALERT (200) : Alerte SOC</span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5vw',
                background: '#fef2f2',
                padding: '0.35vw 0.5vw',
                borderRadius: '6px',
                border: '1.5px solid #fecaca',
                opacity: pipelineStep === 2 ? 1 : 0.75
              }}>
                <XCircle size={15} color="#dc2626" />
                <span style={{ fontSize: '0.78vw', color: '#991b1b', fontWeight: 900 }}>BLOCK (403) : Mail N+1</span>
              </div>
            </div>
          </div>

          <div style={{ background: '#eef2ff', border: '1.5px solid #c7d2fe', borderRadius: '8px', padding: '0.4vw 0.55vw', textAlign: 'center', marginTop: '0.4vw' }}>
            <span style={{ fontSize: '0.75vw', color: '#3730a3', fontWeight: 800, display: 'block' }}>
              Parsing &amp; Matrice de Règles
            </span>
          </div>
        </motion.div>

        {/* CONNECTOR 2 -> 3 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <ArrowRight size={24} strokeWidth={3.5} color={pipelineStep === 2 ? '#6366f1' : '#cbd5e1'} />
        </div>

        {/* =================================================== */}
        {/* COLUMN 3: CONSOLE DLP (ANIMATED WHEN STEP 3)        */}
        {/* =================================================== */}
        <motion.div
          animate={{
            borderColor: pipelineStep === 3 ? '#0284c7' : slateBorder,
            boxShadow: pipelineStep === 3 ? '0 0 16px rgba(2, 132, 199, 0.2)' : '0 2px 8px rgba(0,0,0,0.02)'
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: pipelineStep === 3 ? '#f0f9ff' : '#f8fafc',
            border: '1.5px solid #cbd5e1',
            borderTop: '5px solid #0284c7',
            borderRadius: '12px',
            padding: '0.8vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5vw', marginBottom: '0.5vw', paddingBottom: '0.4vw', borderBottom: '2px solid #e2e8f0' }}>
              <LayoutDashboard size={20} color="#0284c7" />
              <div>
                <strong style={{ fontSize: '0.9vw', color: darkNavy, display: 'block', fontWeight: 900 }}>3. CONSOLE DLP (DASHBOARD)</strong>
                <span style={{ fontSize: '0.7vw', color: '#0284c7', fontFamily: 'monospace', fontWeight: 800 }}>Portail Web Opérationnel</span>
              </div>
            </div>

            {/* 5 CONSOLE TABS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3vw' }}>
              {consoleTabs.map((ct, idx) => {
                const Icon = ct.icon;
                const isTabActive = pipelineStep === 3 && idx === 0;
                return (
                  <div
                    key={ct.label}
                    style={{
                      padding: '0.35vw 0.5vw',
                      borderRadius: '6px',
                      border: `1px solid ${isTabActive ? '#0284c7' : '#cbd5e1'}`,
                      background: isTabActive ? '#0284c7' : '#ffffff',
                      color: isTabActive ? '#ffffff' : '#1e293b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4vw', fontSize: '0.78vw' }}>
                      <Icon size={14} color={isTabActive ? '#ffffff' : '#0284c7'} />
                      <strong style={{ color: isTabActive ? '#ffffff' : darkNavy }}>{ct.label}</strong>
                    </div>
                    {isTabActive && (
                      <span style={{ fontSize: '0.6vw', background: 'rgba(255,255,255,0.25)', color: '#ffffff', padding: '1px 5px', borderRadius: '4px', fontFamily: 'monospace', fontWeight: 800 }}>
                        ACTIF
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* DYNAMIC OPERATIONAL KPI PREVIEW */}
          <div style={{ background: '#f0f9ff', border: '1.5px solid #bae6fd', borderRadius: '8px', padding: '0.4vw 0.55vw', marginTop: '0.4vw', display: 'flex', alignItems: 'center', gap: '0.4vw' }}>
            <Activity size={14} color="#0369a1" />
            <span style={{ fontSize: '0.75vw', color: '#0369a1', fontWeight: 800 }}>
              14 Alertes DLP (100% analysées)
            </span>
          </div>
        </motion.div>

        {/* CONNECTOR 3 -> 4 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <ArrowRight size={24} strokeWidth={3.5} color={pipelineStep === 3 ? '#0284c7' : '#cbd5e1'} />
        </div>

        {/* =================================================== */}
        {/* COLUMN 4: SOC WAZUH (ANIMATED WHEN STEP 4)          */}
        {/* =================================================== */}
        <motion.div
          animate={{
            borderColor: pipelineStep === 4 ? '#059669' : slateBorder,
            boxShadow: pipelineStep === 4 ? '0 0 16px rgba(5, 150, 105, 0.2)' : '0 2px 8px rgba(0,0,0,0.02)'
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: pipelineStep === 4 ? '#ecfdf5' : '#f8fafc',
            border: '1.5px solid #cbd5e1',
            borderTop: '5px solid #059669',
            borderRadius: '12px',
            padding: '0.8vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5vw', marginBottom: '0.5vw', paddingBottom: '0.4vw', borderBottom: '2px solid #e2e8f0' }}>
              <Database size={20} color="#059669" />
              <div>
                <strong style={{ fontSize: '0.9vw', color: darkNavy, display: 'block', fontWeight: 900 }}>4. SOC WAZUH</strong>
                <span style={{ fontSize: '0.7vw', color: '#059669', fontFamily: 'monospace', fontWeight: 800 }}>Centralisation Logs</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35vw', marginTop: '0.3vw' }}>
              {/* LOG FILE STREAM */}
              <div style={{ background: '#ffffff', padding: '0.4vw 0.55vw', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.78vw', color: '#334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <strong style={{ color: '#059669', fontSize: '0.8vw' }}>Log Transmis :</strong>
                  {pipelineStep === 4 && (
                    <span style={{ fontSize: '0.6vw', color: '#059669', fontWeight: 900 }}>
                      ● STREAMING
                    </span>
                  )}
                </div>
                <span><code>/var/log/dlp/dlp.json</code></span>
              </div>

              {/* SIEM CORRELATION */}
              <div style={{ background: '#ffffff', padding: '0.4vw 0.55vw', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.78vw', color: '#334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4vw', marginBottom: '2px' }}>
                  <ShieldCheck size={14} color="#059669" />
                  <strong style={{ color: '#059669', fontSize: '0.8vw' }}>Corrélation SIEM</strong>
                </div>
                <span>Logs DLP poussés vers Wazuh SIEM</span>
              </div>
            </div>
          </div>

          <div style={{ background: '#ecfdf5', border: '1.5px solid #a7f3d0', borderRadius: '8px', padding: '0.4vw 0.55vw', textAlign: 'center', marginTop: '0.4vw' }}>
            <span style={{ fontSize: '0.75vw', color: '#065f46', fontWeight: 800, display: 'block' }}>
              (Détaillé au Volet 4/4)
            </span>
          </div>
        </motion.div>

      </div>

    </div>
  );
}
















