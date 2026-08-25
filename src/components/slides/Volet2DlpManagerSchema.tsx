'use client';

import { useState } from 'react';
import { 
  Server, 
  Lock, 
  Database, 
  Zap,
  HardDrive,
  Wifi,
  ClipboardList,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function Volet2DlpManagerSchema() {
  const [activeCategory, setActiveCategory] = useState<string>('storage');

  const probeCategories = [
    {
      id: 'storage',
      title: 'Surveillance Fichiers & USB',
      color: '#0b66d5',
      bgColor: '#eff6ff',
      icon: HardDrive,
      probes: [
        { name: 'filescanner.py', action: 'Détection & Blocage Fichiers Sensibles' },
        { name: 'usbmonitor.py', action: 'Contrôle & Alerte Médias Amovibles USB' }
      ]
    },
    {
      id: 'network',
      title: 'Surveillance Web & Email',
      color: '#dc2626',
      bgColor: '#fef2f2',
      icon: Wifi,
      probes: [
        { name: 'networkmonitor.py', action: 'Blocage Connexions & Exfiltration TCP' },
        { name: 'emailmonitor.py', action: 'Inspection SMTP & Pièces Jointes' }
      ]
    },
    {
      id: 'clipboard',
      title: 'Presse-papiers & Transport',
      color: '#059669',
      bgColor: '#ecfdf5',
      icon: ClipboardList,
      probes: [
        { name: 'clipboardmonitor.py', action: 'Audit Copie-Coller Données Sensibles' },
        { name: 'alertsender.py', action: 'Expédition Télémetrie HTTP POST :5000' }
      ]
    }
  ];

  const serverModules = [
    {
      id: 'manager',
      name: 'manager.py',
      role: 'Serveur API REST Flask (Port :5000)',
      action: 'Ingestion des alerte JSON & Hot Reload (/reload)',
      color: '#0b66d5',
      bgColor: '#eff6ff',
      icon: Server
    },
    {
      id: 'rules',
      name: 'rules.json',
      role: 'Catalogue Politiques DLP',
      action: 'Définition des 4 Niveaux : Public, Internal, Confidential, Secret',
      color: '#dc2626',
      bgColor: '#fef2f2',
      icon: Lock
    },
    {
      id: 'alertlogger',
      name: 'alertlogger.py',
      role: 'Journalisation Thread-Safe',
      action: 'Enregistrement /var/log/dlp/dlp.json (SOC Ready)',
      color: '#059669',
      bgColor: '#ecfdf5',
      icon: Database
    },
    {
      id: 'dlpaddon',
      name: 'dlpaddon.py',
      role: 'Mitmproxy HTTPS Addon',
      action: 'Déchiffrement TLS & Inspection Flux Cloud',
      color: '#d97706',
      bgColor: '#fffbeb',
      icon: Zap
    }
  ];

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      border: '1.5px solid #cbd5e1',
      borderRadius: '16px',
      padding: '1.2vw 1.6vw',
      boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      {/* 2-Column Clean & Spacious Grid */}
      <div style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: '1.05fr 0.95fr',
        gap: '1.5vw',
        alignItems: 'stretch'
      }}>
        {/* LEFT BLOCK: WINDOWS DLP AGENTS (3 PILLARS) */}
        <div style={{
          background: '#ffffff',
          border: '1.5px solid #0b66d5',
          borderRadius: '14px',
          padding: '1vw 1.2vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 4px 14px rgba(11, 102, 213, 0.05)'
        }}>
          {/* Block Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1.5px solid #eff6ff', paddingBottom: '0.5vw', marginBottom: '0.8vw' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6vw' }}>
              <img src="/logos/windows.png" alt="Windows Logo" style={{ width: '1.5vw', height: '1.5vw', objectFit: 'contain' }} />
              <div>
                <h4 style={{ margin: 0, fontSize: '0.95vw', fontWeight: 900, color: '#0b66d5', fontFamily: 'sans-serif' }}>
                  Agents DLP Windows (.20 &amp; .30)
                </h4>
                <p style={{ margin: 0, fontSize: '0.65vw', color: '#475569', fontWeight: 600 }}>
                  3 Piliers de surveillance locale &amp; détection autonome
                </p>
              </div>
            </div>
            <span style={{ fontSize: '0.65vw', background: '#eff6ff', color: '#0b66d5', fontWeight: 800, padding: '0.2vw 0.6vw', borderRadius: '6px' }}>
              6 Sondes Python
            </span>
          </div>

          {/* 3 Pillars Stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7vw', flex: 1, justifyContent: 'center' }}>
            {probeCategories.map((cat) => {
              const IconComp = cat.icon;
              const isSelected = activeCategory === cat.id;

              return (
                <div
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    background: isSelected ? cat.bgColor : '#ffffff',
                    borderTop: `1.5px solid ${isSelected ? cat.color : '#e2e8f0'}`,
                    borderRight: `1.5px solid ${isSelected ? cat.color : '#e2e8f0'}`,
                    borderBottom: `1.5px solid ${isSelected ? cat.color : '#e2e8f0'}`,
                    borderLeft: `4px solid ${cat.color}`,
                    borderRadius: '10px',
                    padding: '0.6vw 0.8vw',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? `0 4px 12px ${cat.color}15` : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3vw' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4vw' }}>
                      <IconComp size={16} color={cat.color} />
                      <strong style={{ fontSize: '0.82vw', color: '#0f172a', fontWeight: 900, fontFamily: 'sans-serif' }}>
                        {cat.title}
                      </strong>
                    </div>
                  </div>

                  {/* 2 Clean Probes inside pillar */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5vw', marginTop: '0.2vw' }}>
                    {cat.probes.map((p, idx) => (
                      <div key={idx} style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '0.35vw 0.5vw' }}>
                        <code style={{ fontSize: '0.7vw', color: cat.color, fontWeight: 900, fontFamily: 'monospace', display: 'block' }}>
                          {p.name}
                        </code>
                        <span style={{ fontSize: '0.6vw', color: '#334155', fontWeight: 700, display: 'block', marginTop: '0.15vw', fontFamily: 'sans-serif', lineHeight: 1.2 }}>
                          {p.action}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT BLOCK: DLP MANAGER SERVER (UBUNTU SERVER .10) */}
        <div style={{
          background: '#ffffff',
          border: '1.5px solid #00008f',
          borderRadius: '14px',
          padding: '1vw 1.2vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 4px 14px rgba(0, 0, 143, 0.05)'
        }}>
          {/* Block Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1.5px solid #eef2ff', paddingBottom: '0.5vw', marginBottom: '0.8vw' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6vw' }}>
              <img src="/logos/ubuntu.png" alt="Ubuntu Logo" style={{ width: '1.5vw', height: '1.5vw', objectFit: 'contain' }} />
              <div>
                <h4 style={{ margin: 0, fontSize: '0.95vw', fontWeight: 900, color: '#00008f', fontFamily: 'sans-serif' }}>
                  DLP Manager Server (Ubuntu .10:5000)
                </h4>
                <p style={{ margin: 0, fontSize: '0.65vw', color: '#475569', fontWeight: 600 }}>
                  Serveur Flask central &amp; gestionnaire des politiques
                </p>
              </div>
            </div>
            <span style={{ fontSize: '0.65vw', background: '#eef2ff', color: '#00008f', fontWeight: 800, padding: '0.2vw 0.6vw', borderRadius: '6px' }}>
              Core Manager
            </span>
          </div>

          {/* 4 Server Modules Stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55vw', flex: 1, justifyContent: 'center' }}>
            {serverModules.map((m) => {
              const IconComp = m.icon;
              return (
                <div
                  key={m.id}
                  style={{
                    background: m.bgColor,
                    borderTop: `1.5px solid ${m.color}30`,
                    borderRight: `1.5px solid ${m.color}30`,
                    borderBottom: `1.5px solid ${m.color}30`,
                    borderLeft: `4px solid ${m.color}`,
                    borderRadius: '8px',
                    padding: '0.45vw 0.75vw',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4vw' }}>
                      <IconComp size={15} color={m.color} />
                      <strong style={{ fontSize: '0.78vw', color: '#0f172a', fontFamily: 'monospace', fontWeight: 900 }}>
                        {m.name}
                      </strong>
                    </div>
                    <span style={{ fontSize: '0.62vw', color: m.color, fontWeight: 800, fontFamily: 'sans-serif' }}>
                      {m.role}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.6vw', color: '#475569', fontWeight: 700, display: 'block', marginTop: '0.15vw', fontFamily: 'sans-serif' }}>
                    {m.action}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
