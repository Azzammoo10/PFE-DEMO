'use client';

import { motion } from 'framer-motion';

export default function Volet5WazuhSocSchema() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      background: '#ffffff',
      border: '1.5px solid #cbd5e1',
      borderRadius: '16px',
      padding: '1vw 1.4vw',
      boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)',
      boxSizing: 'border-box',
      overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>

      {/* Main Diagram Area with SVG Flow Connections */}
      <div style={{
        flex: '1 1 0px',
        minHeight: 0,
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.1vw 0'
      }}>
        <svg
          viewBox="0 0 1000 375"
          style={{ width: '100%', height: '100%' }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Professional Blue Arrowhead Marker */}
            <marker
              id="flow-arrow-blue"
              viewBox="0 0 10 10"
              refX="7"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0b66d5" />
            </marker>

            {/* Professional Dark Arrowhead Marker */}
            <marker
              id="flow-arrow-dark"
              viewBox="0 0 10 10"
              refX="7"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#1e293b" />
            </marker>

            {/* Red Active Response Arrowhead Marker */}
            <marker
              id="flow-arrow-red"
              viewBox="0 0 10 10"
              refX="7"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#dc2626" />
            </marker>
          </defs>

          {/* ========================================================================= */}
          {/* 1. DATA FUSION TOP CONNECTOR ARCH & LABEL                                 */}
          {/* ========================================================================= */}
          <g>
            <rect x="305" y="2" width="115" height="22" rx="4" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
            <text x="362.5" y="17" fill="#0b66d5" fontSize="11.5" fontWeight="800" textAnchor="middle">
              Data Fusion
            </text>
            <path
              d="M 235 85 L 235 24 L 490 24 L 490 74"
              fill="none"
              stroke="#0b66d5"
              strokeWidth="2"
              strokeDasharray="4 3"
              markerEnd="url(#flow-arrow-blue)"
            />
          </g>

          {/* ========================================================================= */}
          {/* 2. LEFT COLUMN LOG SOURCES                                                */}
          {/* ========================================================================= */}

          {/* 1. Alertes DLP (JSON) */}
          <g>
            <rect x="25" y="66" width="210" height="42" rx="6" fill="#f8fafc" stroke="#0b66d5" strokeWidth="2" />
            <text x="130" y="86" fill="#0f172a" fontSize="13.5" fontWeight="800" textAnchor="middle">
              Alertes DLP <tspan fill="#0b66d5" fontSize="11.5" fontWeight="800">(JSON)</tspan>
            </text>
            <text x="130" y="99" fill="#64748b" fontSize="9.5" fontWeight="600" textAnchor="middle">
              Micro-Agents Python Endpoint
            </text>

            <path d="M 235 87 L 408 118" fill="none" stroke="#1e293b" strokeWidth="2" markerEnd="url(#flow-arrow-dark)" />
          </g>

          {/* 2. Windows Sysmon */}
          <g>
            <rect x="25" y="148" width="210" height="42" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="130" y="168" fill="#0f172a" fontSize="13.5" fontWeight="800" textAnchor="middle">
              Windows Sysmon
            </text>
            <text x="130" y="181" fill="#64748b" fontSize="9.5" fontWeight="600" textAnchor="middle">
              Processus &amp; Connexions Réseau
            </text>

            <path d="M 235 169 L 408 169" fill="none" stroke="#1e293b" strokeWidth="2" markerEnd="url(#flow-arrow-dark)" />
          </g>

          {/* 3. Windows Security Logs */}
          <g>
            <rect x="25" y="230" width="210" height="42" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="130" y="250" fill="#0f172a" fontSize="13.5" fontWeight="800" textAnchor="middle">
              Windows Security Logs
            </text>
            <text x="130" y="263" fill="#64748b" fontSize="9.5" fontWeight="600" textAnchor="middle">
              Authentifications &amp; Privilèges
            </text>

            <path d="M 235 251 L 408 220" fill="none" stroke="#1e293b" strokeWidth="2" markerEnd="url(#flow-arrow-dark)" />
          </g>

          {/* ========================================================================= */}
          {/* 3. CENTER: WAZUH MANAGER CORE (PRO CARD WITH OFFICIAL LOGO)               */}
          {/* ========================================================================= */}
          <g>
            {/* Flat Pro Container Card */}
            <rect
              x="410"
              y="76"
              width="160"
              height="186"
              rx="12"
              fill="#ffffff"
              stroke="#0b66d5"
              strokeWidth="2.5"
              filter="drop-shadow(0px 4px 16px rgba(11, 102, 213, 0.12))"
            />

            {/* Official Wazuh Logo Image */}
            <foreignObject x="465" y="90" width="50" height="50">
              <img
                src="/image copy 7.png"
                alt="Wazuh Logo"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </foreignObject>

            {/* Title & Subtitle */}
            <text x="490" y="162" fill="#0f172a" fontSize="14" fontWeight="900" textAnchor="middle">
              Wazuh Manager
            </text>
            <text x="490" y="178" fill="#0b66d5" fontSize="13" fontWeight="900" textAnchor="middle">
              Core
            </text>

            {/* Mini Capability Pill Badges */}
            <rect x="425" y="193" width="130" height="20" rx="4" fill="#f1f5f9" />
            <text x="490" y="207" fill="#334155" fontSize="9.5" fontWeight="800" textAnchor="middle">
              Règles XML &amp; Corrélation
            </text>

            <rect x="425" y="218" width="130" height="20" rx="4" fill="#f1f5f9" />
            <text x="490" y="232" fill="#334155" fontSize="9.5" fontWeight="800" textAnchor="middle">
              Moteur SIEM Centralisé
            </text>
          </g>

          {/* ========================================================================= */}
          {/* 4. ACTIVE RESPONSE BRANCH (CONNECTED DOWNWARDS)                            */}
          {/* ========================================================================= */}
          <path
            d="M 490 262 L 490 310"
            fill="none"
            stroke="#dc2626"
            strokeWidth="2.5"
            strokeDasharray="4 3"
            markerEnd="url(#flow-arrow-red)"
          />

          <g>
            <rect x="365" y="312" width="250" height="48" rx="8" fill="#fff1f2" stroke="#dc2626" strokeWidth="2" />
            <text x="490" y="331" fill="#991b1b" fontSize="12.5" fontWeight="900" textAnchor="middle">
              ⚡ Active Response (Automatisé)
            </text>
            <text x="490" y="347" fill="#be123c" fontSize="10.5" fontWeight="700" textAnchor="middle">
              Isolation Réseau VM &amp; Kill Process (&lt; 1.5s)
            </text>
          </g>

          {/* ========================================================================= */}
          {/* 5. OUTPUT CONNECTOR ARROW TO CONSOLE WAZUH DASHBOARD                      */}
          {/* ========================================================================= */}
          <path
            d="M 570 169 L 642 169"
            fill="none"
            stroke="#1e293b"
            strokeWidth="2.5"
            markerEnd="url(#flow-arrow-dark)"
          />

          {/* ========================================================================= */}
          {/* 6. RIGHT SIDE: CONSOLE WAZUH DASHBOARD                                     */}
          {/* ========================================================================= */}
          <text x="648" y="54" fill="#0f172a" fontSize="13" fontWeight="900">
            Console Wazuh (Dashboard &amp; MITRE ATT&amp;CK)
          </text>

          {/* Dashboard Container Box (Wazuh SOC Overview Image) */}
          <foreignObject x="648" y="66" width="325" height="236">
            <div style={{
              width: '100%',
              height: '100%',
              border: '1.5px solid #cbd5e1',
              borderRadius: '10px',
              overflow: 'hidden',
              background: '#ffffff',
              boxShadow: '0 4px 14px rgba(15, 23, 42, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img
                src="/wazuh-soc-dashboard-overview.png"
                alt="Wazuh SOC Dashboard Overview & MITRE ATT&CK"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          </foreignObject>
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* 7. BOTTOM BANNER SYNTHESIS NOTE (SIMPLE, CLEAR & UNCOLORED TEXT)          */}
      {/* ========================================================================= */}
      <div style={{
        flexShrink: 0,
        width: '100%',
        background: '#f8fafc',
        border: '1.5px solid #cbd5e1',
        borderRadius: '8px',
        padding: '0.35vw 0.8vw',
        marginTop: '0.2vw',
        boxSizing: 'border-box'
      }}>
        <p style={{
          margin: 0,
          fontSize: '0.8vw',
          fontWeight: 700,
          color: '#0f172a',
          lineHeight: 1.45
        }}>
          <strong>Apport du SIEM :</strong> Le DLP qualifie la fuite de données, <strong>Wazuh</strong> la corréle avec l&apos;activité système (Sysmon/PowerShell) pour transformer une alerte isolée en un incident de sécurité complet et déclencher l&apos;<strong>Active Response</strong>.
        </p>
      </div>

    </div>
  );
}
