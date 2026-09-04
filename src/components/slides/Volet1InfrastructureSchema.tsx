'use client';

import { useState } from 'react';
import { Lock, Zap } from 'lucide-react';

export default function Volet1InfrastructureSchema() {
  const [selectedVm, setSelectedVm] = useState<string>('ubuntu');

  const vms = [
    {
      id: 'ams',
      name: 'AXA AMS (.20)',
      type: 'Windows 11 LTSC',
      ip: '192.168.100.20',
      color: '#0b66d5',
      bgColor: '#eff6ff',
      borderColor: '#0b66d5',
      specs: [
        { label: 'Télémétrie DLP', val: 'HTTP POST :5000 ➔ Ubuntu' },
        { label: 'Règles DLP', val: 'HTTP GET / Response :5000' },
        { label: 'Rôle Métier', val: 'Poste Travail Finance / RH' }
      ]
    },
    {
      id: 'ubuntu',
      name: 'Ubuntu Server (.10)',
      type: 'Ubuntu Server 22.04',
      ip: '192.168.100.10',
      color: '#00008f',
      bgColor: '#eef2ff',
      borderColor: '#00008f',
      specs: [
        { label: 'DLP Manager', val: 'Flask REST API (Port 5000)' },
        { label: 'Logs DLP', val: '/var/log/dlp/dlp.json' },
        { label: 'Supervision SOC', val: 'Wazuh Manager Central' }
      ]
    },
    {
      id: 'go',
      name: 'AXA GBS (.30)',
      type: 'Windows 11 LTSC',
      ip: '192.168.100.30',
      color: '#0284c7',
      bgColor: '#f0f9ff',
      borderColor: '#0284c7',
      specs: [
        { label: 'Télémétrie DLP', val: 'HTTP POST :5000 ➔ Ubuntu' },
        { label: 'Règles DLP', val: 'HTTP GET / Response :5000' },
        { label: 'Rôle Métier', val: 'Poste Opérationnel / PII' }
      ]
    },
    {
      id: 'kali',
      name: 'Kali Linux (.50)',
      type: 'Kali Linux 2024',
      ip: '192.168.100.50',
      color: '#dc2626',
      bgColor: '#fff1f1',
      borderColor: '#dc2626',
      specs: [
        { label: 'Scénarios Pentest', val: 'Nmap, SCP Exfiltration, C2' },
        { label: 'Protocole Attack', val: 'SSH/SCP (Port 22), ICMP' },
        { label: 'Objectif Audit', val: 'Validation Détection & Response' }
      ]
    }
  ];

  const currentVmData = vms.find((v) => v.id === selectedVm) || vms[1];

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      border: '1.5px solid #cbd5e1',
      borderRadius: '16px',
      padding: '0.8vw 1.2vw',
      boxShadow: '0 8px 24px rgba(15, 23, 42, 0.04)',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      {/* Sleek Top Badge Only */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: '0.2vw'
      }}>
        <span style={{
          background: 'rgba(11, 102, 213, 0.08)',
          border: '1.5px solid rgba(11, 102, 213, 0.25)',
          color: '#0b66d5',
          fontSize: '0.65vw',
          fontWeight: 800,
          padding: '0.2vw 0.6vw',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3vw'
        }}>
          <Lock size={12} />
          Réseau Isolé
        </span>
      </div>

      {/* Main SVG Vector Network Canvas */}
      <div style={{
        position: 'relative',
        flex: 1,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.1vw 0'
      }}>
        <svg
          viewBox="0 0 1000 370"
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
        >
          <defs>
            <marker id="arrowHeadBlue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0b66d5" />
            </marker>
            <marker id="arrowHeadCyan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0284c7" />
            </marker>
            <marker id="arrowHeadRed" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#dc2626" />
            </marker>
            <marker id="arrowHeadGreen" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#059669" />
            </marker>

            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ========================================================================= */}
          {/* COMMUNICATION LINES: HTTP POST & HTTP GET / RESPONSE                      */}
          {/* ========================================================================= */}

          {/* 1. LEFT CANAL: AXA AMS (.20) <---> Ubuntu Server (.10) */}
          <line x1="200" y1="235" x2="390" y2="235" stroke="#0b66d5" strokeWidth="2.5" strokeDasharray="6 6" markerEnd="url(#arrowHeadBlue)" />
          <text x="295" y="226" fill="#0b66d5" fontSize="10" fontWeight="900" fontFamily="monospace" textAnchor="middle">
            HTTP POST :5000
          </text>
          <circle r="3.5" fill="#0b66d5" style={{ filter: 'drop-shadow(0 0 6px #38bdf8)' }}>
            <animateMotion dur="2.0s" repeatCount="indefinite" path="M 200,235 L 390,235" />
          </circle>

          <line x1="390" y1="265" x2="200" y2="265" stroke="#059669" strokeWidth="2.5" strokeDasharray="5 5" markerEnd="url(#arrowHeadGreen)" />
          <text x="295" y="278" fill="#059669" fontSize="10" fontWeight="900" fontFamily="monospace" textAnchor="middle">
            HTTP GET / Response :5000
          </text>
          <circle r="3.5" fill="#059669" style={{ filter: 'drop-shadow(0 0 6px #6ee7b7)' }}>
            <animateMotion dur="2.2s" repeatCount="indefinite" path="M 390,265 L 200,265" />
          </circle>

          {/* 2. RIGHT CANAL: AXA GBS (.30) <---> Ubuntu Server (.10) */}
          <line x1="800" y1="235" x2="610" y2="235" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="6 6" markerEnd="url(#arrowHeadCyan)" />
          <text x="705" y="226" fill="#0284c7" fontSize="10" fontWeight="900" fontFamily="monospace" textAnchor="middle">
            HTTP POST :5000
          </text>
          <circle r="3.5" fill="#0284c7" style={{ filter: 'drop-shadow(0 0 6px #38bdf8)' }}>
            <animateMotion dur="2.2s" repeatCount="indefinite" path="M 800,235 L 610,235" />
          </circle>

          <line x1="610" y1="265" x2="800" y2="265" stroke="#059669" strokeWidth="2.5" strokeDasharray="5 5" markerEnd="url(#arrowHeadGreen)" />
          <text x="705" y="278" fill="#059669" fontSize="10" fontWeight="900" fontFamily="monospace" textAnchor="middle">
            HTTP GET / Response :5000
          </text>
          <circle r="3.5" fill="#059669" style={{ filter: 'drop-shadow(0 0 6px #6ee7b7)' }}>
            <animateMotion dur="2.4s" repeatCount="indefinite" path="M 610,265 L 800,265" />
          </circle>

          {/* 3. TOP CANAL: Kali Linux (.50) ---> Ubuntu Server (.10) */}
          <line x1="500" y1="110" x2="500" y2="180" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="5 5" markerEnd="url(#arrowHeadRed)" />
          <text x="510" y="148" fill="#dc2626" fontSize="10" fontWeight="900" fontFamily="monospace">
            TCP :22 &amp; ICMP (Pentest)
          </text>
          <circle r="3.5" fill="#dc2626" style={{ filter: 'drop-shadow(0 0 6px #fca5a5)' }}>
            <animateMotion dur="2.0s" repeatCount="indefinite" path="M 500,110 L 500,180" />
          </circle>

          {/* 4. DIAGONAL CANAL: Kali Linux (.50) ---> AXA AMS (.20) */}
          <line x1="390" y1="100" x2="160" y2="200" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="5 5" markerEnd="url(#arrowHeadRed)" />
          <text x="245" y="140" fill="#dc2626" fontSize="9.5" fontWeight="900" fontFamily="monospace" transform="rotate(-23 245 140)">
            Pentest Kali ➔ AMS
          </text>
          <circle r="3.5" fill="#dc2626" style={{ filter: 'drop-shadow(0 0 6px #fca5a5)' }}>
            <animateMotion dur="2.2s" repeatCount="indefinite" path="M 390,100 L 160,200" />
          </circle>

          {/* ========================================================================= */}
          {/* OS CARDS                                                                  */}
          {/* ========================================================================= */}

          {/* 1. TOP NODE: KALI LINUX (192.168.100.50) */}
          <g onClick={() => setSelectedVm('kali')} style={{ cursor: 'pointer' }}>
            <rect x="390" y="20" width="220" height="90" rx="12" fill="#ffffff" stroke="#dc2626" strokeWidth={selectedVm === 'kali' ? "3" : "2"} filter="url(#softGlow)" />
            <rect x="390" y="20" width="8" height="90" rx="4" fill="#dc2626" />
            
            <image href="/logos/kali.png" x="542" y="28" width="54" height="54" preserveAspectRatio="xMidYMid meet" />

            <text x="408" y="48" fill="#0f172a" fontSize="13" fontWeight="900" fontFamily="sans-serif">Kali Linux (.50)</text>
            <text x="408" y="64" fill="#dc2626" fontSize="10.5" fontWeight="800" fontFamily="monospace">192.168.100.50</text>
            <text x="408" y="84" fill="#475569" fontSize="9.5" fontWeight="600" fontFamily="sans-serif">Validation Offensive</text>
          </g>

          {/* 2. LEFT NODE: AXA AMS (192.168.100.20) */}
          <g onClick={() => setSelectedVm('ams')} style={{ cursor: 'pointer' }}>
            <rect x="10" y="200" width="190" height="105" rx="12" fill="#ffffff" stroke="#0b66d5" strokeWidth={selectedVm === 'ams' ? "3" : "2"} filter="url(#softGlow)" />
            <rect x="10" y="200" width="8" height="105" rx="4" fill="#0b66d5" />
            
            <image href="/logos/windows.png" x="140" y="222" width="48" height="48" preserveAspectRatio="xMidYMid meet" />

            <text x="26" y="228" fill="#0f172a" fontSize="12.5" fontWeight="900" fontFamily="sans-serif">AXA AMS (.20)</text>
            <text x="26" y="244" fill="#0b66d5" fontSize="10" fontWeight="800" fontFamily="monospace">192.168.100.20</text>
            <text x="26" y="264" fill="#475569" fontSize="9" fontWeight="600" fontFamily="sans-serif">Windows 11 LTSC</text>
            <text x="26" y="282" fill="#64748b" fontSize="8" fontWeight="700" fontFamily="sans-serif">Sonde DLP + Agent Wazuh</text>
          </g>

          {/* 3. CENTER NODE: UBUNTU SERVER (192.168.100.10) */}
          <g onClick={() => setSelectedVm('ubuntu')} style={{ cursor: 'pointer' }}>
            <rect x="380" y="180" width="240" height="120" rx="16" fill="none" stroke="#00008f" strokeWidth="1.5" opacity="0.3" filter="url(#softGlow)" />
            <rect x="390" y="190" width="220" height="100" rx="14" fill="#eef2ff" stroke="#00008f" strokeWidth={selectedVm === 'ubuntu' ? "3" : "2.5"} />
            <rect x="390" y="190" width="8" height="100" rx="4" fill="#00008f" />

            <image href="/logos/ubuntu.png" x="544" y="210" width="52" height="52" preserveAspectRatio="xMidYMid meet" />

            <text x="408" y="218" fill="#00008f" fontSize="13.5" fontWeight="900" fontFamily="sans-serif">Ubuntu Server (.10)</text>
            <text x="408" y="234" fill="#0b66d5" fontSize="10.5" fontWeight="800" fontFamily="monospace">192.168.100.10</text>
            <text x="408" y="254" fill="#1e293b" fontSize="9.5" fontWeight="700" fontFamily="sans-serif">DLP Lab &amp; Manager Flask</text>
            <text x="408" y="270" fill="#475569" fontSize="9" fontWeight="600" fontFamily="sans-serif">Wazuh Manager SOC</text>
          </g>

          {/* 4. RIGHT NODE: AXA GBS (192.168.100.30) */}
          <g onClick={() => setSelectedVm('go')} style={{ cursor: 'pointer' }}>
            <rect x="800" y="200" width="190" height="105" rx="12" fill="#ffffff" stroke="#0284c7" strokeWidth={selectedVm === 'go' ? "3" : "2"} filter="url(#softGlow)" />
            <rect x="800" y="200" width="8" height="105" rx="4" fill="#0284c7" />

            <image href="/logos/windows.png" x="930" y="222" width="48" height="48" preserveAspectRatio="xMidYMid meet" />

            <text x="816" y="228" fill="#0f172a" fontSize="12.5" fontWeight="900" fontFamily="sans-serif">AXA GBS (.30)</text>
            <text x="816" y="244" fill="#0284c7" fontSize="10" fontWeight="800" fontFamily="monospace">192.168.100.30</text>
            <text x="816" y="264" fill="#475569" fontSize="9" fontWeight="600" fontFamily="sans-serif">Windows 11 LTSC</text>
            <text x="816" y="282" fill="#64748b" fontSize="8" fontWeight="700" fontFamily="sans-serif">Sonde DLP + Agent Wazuh</text>
          </g>
        </svg>
      </div>

      {/* Bottom Specs Details Panel */}
      <div style={{
        background: '#ffffff',
        border: `1.5px solid ${currentVmData.borderColor}`,
        borderRadius: '10px',
        padding: '0.45vw 0.9vw'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25vw' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4vw' }}>
            <Zap size={14} color={currentVmData.color} />
            <h4 style={{ margin: 0, fontSize: '0.8vw', fontWeight: 900, color: '#0f172a' }}>
              Spécifications Réseau de {currentVmData.name} ({currentVmData.type})
            </h4>
          </div>
          <span style={{ fontSize: '0.6vw', fontWeight: 700, color: currentVmData.color }}>
            Cliquer sur une machine pour inspecter ses caractéristiques
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5vw' }}>
          {currentVmData.specs.map((spec, idx) => (
            <div key={idx} style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              padding: '0.2vw 0.45vw'
            }}>
              <span style={{ fontSize: '0.56vw', color: '#64748b', fontWeight: 700, display: 'block' }}>
                {spec.label}
              </span>
              <strong style={{ fontSize: '0.64vw', color: '#0f172a', fontWeight: 800 }}>
                {spec.val}
              </strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
