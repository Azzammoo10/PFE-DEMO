'use client';

export default function Volet2DlpManagerSchema() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      background: '#ffffff',
      border: '1.5px solid #cbd5e1',
      borderRadius: '16px',
      padding: '0.8vw 1vw',
      boxSizing: 'border-box',
      overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>

      {/* COMPLETE ARCHITECTURE SCHEMA INCLUDING SOC WAZUH INTEGRATION */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <svg
          viewBox="0 0 1150 460"
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
        >
          <defs>
            {/* Arrow Marker Definitions */}
            <marker id="arrowDark" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#1e293b" />
            </marker>
            <marker id="arrowBlue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0b66d5" />
            </marker>
            <marker id="arrowCyan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0284c7" />
            </marker>
            <marker id="arrowGreen" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#059669" />
            </marker>
          </defs>

          {/* ========================================================================= */}
          {/* 1. LEFT CONTAINER: ENDPOINT WINDOWS (AXA-AMS)                            */}
          {/* ========================================================================= */}

          {/* Outer Box */}
          <rect
            x="15" y="15" width="365" height="425" rx="6"
            fill="#edf2f7" stroke="#2d3748" strokeWidth="2.5"
          />

          {/* Top Title Bar */}
          <rect x="15" y="15" width="365" height="38" rx="5" fill="#2d3748" />
          <text x="197.5" y="39" fill="#ffffff" fontSize="14.5" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
            Endpoint Windows (AXA-AMS)
          </text>

          {/* Inner Subheader Box: Dossier agent/ */}
          <rect x="27" y="60" width="341" height="365" rx="3" fill="#f7fafc" stroke="#4a5568" strokeWidth="1.5" />
          <text x="37" y="80" fill="#1a202c" fontSize="12" fontWeight="700" fontFamily="monospace">
            Dossier : agent/ (Logique de Détection)
          </text>

          {/* ------------------------------------------------------------------------- */}
          {/* 5 PROBE BOXES (LEFT STACKED)                                             */}
          {/* ------------------------------------------------------------------------- */}

          {/* 1. file_scanner.py */}
          <rect x="42" y="95" width="145" height="42" rx="2" fill="#ffffff" stroke="#1a202c" strokeWidth="2" />
          <text x="114.5" y="121" fill="#1a202c" fontSize="11.5" fontWeight="700" fontFamily="monospace" textAnchor="middle">
            file_scanner.py
          </text>

          {/* 2. clipboard_monitor.py */}
          <rect x="42" y="155" width="145" height="42" rx="2" fill="#ffffff" stroke="#1a202c" strokeWidth="2" />
          <text x="114.5" y="181" fill="#1a202c" fontSize="10.5" fontWeight="700" fontFamily="monospace" textAnchor="middle">
            clipboard_monitor.py
          </text>

          {/* 3. usb_monitor.py */}
          <rect x="42" y="215" width="145" height="42" rx="2" fill="#ffffff" stroke="#1a202c" strokeWidth="2" />
          <text x="114.5" y="241" fill="#1a202c" fontSize="11.5" fontWeight="700" fontFamily="monospace" textAnchor="middle">
            usb_monitor.py
          </text>

          {/* 4. email_monitor.py */}
          <rect x="42" y="275" width="145" height="42" rx="2" fill="#ffffff" stroke="#1a202c" strokeWidth="2" />
          <text x="114.5" y="301" fill="#1a202c" fontSize="11.5" fontWeight="700" fontFamily="monospace" textAnchor="middle">
            email_monitor.py
          </text>

          {/* 5. network_monitor.py */}
          <rect x="42" y="335" width="145" height="42" rx="2" fill="#ffffff" stroke="#1a202c" strokeWidth="2" />
          <text x="114.5" y="361" fill="#1a202c" fontSize="11" fontWeight="700" fontFamily="monospace" textAnchor="middle">
            network_monitor.py
          </text>

          {/* ------------------------------------------------------------------------- */}
          {/* CENTRAL SENDER BOX: alert_sender.py                                      */}
          {/* ------------------------------------------------------------------------- */}
          <rect x="225" y="208" width="130" height="56" rx="2" fill="#ffffff" stroke="#1a202c" strokeWidth="2.5" />
          <text x="290" y="241" fill="#1a202c" fontSize="12.5" fontWeight="700" fontFamily="monospace" textAnchor="middle">
            alert_sender.py
          </text>

          {/* ------------------------------------------------------------------------- */}
          {/* ARROWS: 5 PROBES ➔ alert_sender.py                                        */}
          {/* ------------------------------------------------------------------------- */}
          <path d="M 187 116 L 290 116 L 290 208" fill="none" stroke="#1a202c" strokeWidth="1.8" markerEnd="url(#arrowDark)" />
          <path d="M 187 176 L 245 176 L 245 208" fill="none" stroke="#1a202c" strokeWidth="1.8" markerEnd="url(#arrowDark)" />
          <path d="M 187 236 L 225 236" fill="none" stroke="#1a202c" strokeWidth="1.8" markerEnd="url(#arrowDark)" />
          <path d="M 187 296 L 245 296 L 245 264" fill="none" stroke="#1a202c" strokeWidth="1.8" markerEnd="url(#arrowDark)" />
          <path d="M 187 356 L 290 356 L 290 264" fill="none" stroke="#1a202c" strokeWidth="1.8" markerEnd="url(#arrowDark)" />


          {/* ========================================================================= */}
          {/* 2. INTER-VM COMMUNICATION ARROW: HTTP POST /alert (Port 5000)             */}
          {/* ========================================================================= */}
          <line x1="355" y1="236" x2="500" y2="236" stroke="#0b66d5" strokeWidth="2.5" markerEnd="url(#arrowBlue)" />
          
          <rect x="375" y="208" width="105" height="30" rx="4" fill="#ffffff" stroke="#0b66d5" strokeWidth="1.5" />
          <text x="427.5" y="222" fill="#00008f" fontSize="11" fontWeight="800" fontFamily="monospace" textAnchor="middle">
            HTTP POST /alert
          </text>
          <text x="427.5" y="233" fill="#4a5568" fontSize="9.5" fontWeight="700" fontFamily="monospace" textAnchor="middle">
            (Port 5000)
          </text>

          {/* Smooth Traveling Packet */}
          <circle r="3.5" fill="#38bdf8">
            <animateMotion dur="1.8s" repeatCount="indefinite" path="M 355,236 L 500,236" />
          </circle>


          {/* ========================================================================= */}
          {/* 3. RIGHT CONTAINER: SERVEUR DLP/SOC (UBUNTU LINUX)                         */}
          {/* ========================================================================= */}

          {/* Outer Box */}
          <rect
            x="500" y="15" width="635" height="425" rx="6"
            fill="#edf2f7" stroke="#2d3748" strokeWidth="2.5"
          />

          {/* Top Title Bar */}
          <rect x="500" y="15" width="635" height="38" rx="5" fill="#2d3748" />
          <text x="817.5" y="39" fill="#ffffff" fontSize="14.5" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">
            Serveur DLP/SOC (Ubuntu Linux)
          </text>

          {/* Inner Subheader Box: Dossier manager/ */}
          <rect x="512" y="60" width="611" height="365" rx="3" fill="#f7fafc" stroke="#4a5568" strokeWidth="1.5" />
          <text x="522" y="80" fill="#1a202c" fontSize="12" fontWeight="700" fontFamily="monospace">
            Dossier : manager/ (Logique de Gouvernance)
          </text>

          {/* ------------------------------------------------------------------------- */}
          {/* COLUMN 1 INSIDE MANAGER: manager.py & dlp_addon.py                        */}
          {/* ------------------------------------------------------------------------- */}

          {/* 1. manager.py (API Flask) */}
          <rect x="528" y="208" width="130" height="56" rx="2" fill="#ffffff" stroke="#1a202c" strokeWidth="2.5" />
          <text x="593" y="233" fill="#1a202c" fontSize="12.5" fontWeight="700" fontFamily="monospace" textAnchor="middle">
            manager.py
          </text>
          <text x="593" y="249" fill="#059669" fontSize="10.5" fontWeight="700" fontFamily="monospace" textAnchor="middle">
            (API Flask)
          </text>

          {/* 2. dlp_addon.py (mitmproxy) WITH DOUBLE BORDER */}
          <rect x="523" y="315" width="140" height="56" rx="8" fill="none" stroke="#2b6cb0" strokeWidth="2" />
          <rect x="528" y="320" width="130" height="46" rx="5" fill="#ffffff" stroke="#2b6cb0" strokeWidth="2" />
          <text x="593" y="341" fill="#1a202c" fontSize="12" fontWeight="700" fontFamily="monospace" textAnchor="middle">
            dlp_addon.py
          </text>
          <text x="593" y="355" fill="#2b6cb0" fontSize="10.5" fontWeight="700" fontFamily="monospace" textAnchor="middle">
            (mitmproxy)
          </text>

          {/* Vertical Line Connecting manager.py to dlp_addon.py */}
          <line x1="593" y1="264" x2="593" y2="315" stroke="#2b6cb0" strokeWidth="2" />


          {/* ------------------------------------------------------------------------- */}
          {/* COLUMN 2 INSIDE MANAGER: RECTANGLES FOR LOGS & CONSOLE DLP                */}
          {/* ------------------------------------------------------------------------- */}

          {/* 1. logs/dlp.json (RECTANGLE BOX) */}
          <rect x="690" y="95" width="140" height="48" rx="4" fill="#ffffff" stroke="#1a202c" strokeWidth="2" />
          <text x="760" y="123" fill="#1a202c" fontSize="12" fontWeight="700" fontFamily="monospace" textAnchor="middle">
            logs/dlp.json
          </text>

          {/* 2. logs/labeled_files.json (RECTANGLE BOX) */}
          <rect x="690" y="175" width="140" height="48" rx="4" fill="#ffffff" stroke="#1a202c" strokeWidth="2" />
          <text x="760" y="196" fill="#1a202c" fontSize="10.5" fontWeight="700" fontFamily="monospace" textAnchor="middle">
            logs/labeled_files
          </text>
          <text x="760" y="210" fill="#1a202c" fontSize="10.5" fontWeight="700" fontFamily="monospace" textAnchor="middle">
            .json
          </text>

          {/* Lines from manager.py to Log Rectangles */}
          <path d="M 658 226 L 675 226 L 675 119 L 690 119" fill="none" stroke="#1a202c" strokeWidth="1.8" markerEnd="url(#arrowDark)" />
          <path d="M 658 246 L 675 246 L 675 199 L 690 199" fill="none" stroke="#1a202c" strokeWidth="1.8" markerEnd="url(#arrowDark)" />

          {/* 3. CONSOLE DLP / DASHBOARD WEB NODE */}
          <path d="M 658 256 L 675 256 L 675 310 L 690 310" fill="none" stroke="#0284c7" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrowCyan)" />
          
          <rect x="690" y="280" width="150" height="65" rx="6" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" />
          <rect x="690" y="280" width="150" height="22" rx="5" fill="#0284c7" />
          <text x="765" y="295" fill="#ffffff" fontSize="11" fontWeight="800" fontFamily="sans-serif" textAnchor="middle">
            CONSOLE DLP (Web)
          </text>
          <text x="765" y="318" fill="#0f172a" fontSize="10" fontWeight="800" fontFamily="sans-serif" textAnchor="middle">
            Dashboard SOC &amp; KPIs
          </text>
          <text x="765" y="333" fill="#0369a1" fontSize="9" fontWeight="700" fontFamily="monospace" textAnchor="middle">
            GET /alerts, /stats
          </text>


          {/* ========================================================================= */}
          {/* 4. SOC WAZUH NODE (INTEGRATED AS REQUESTED)                              */}
          {/* ========================================================================= */}

          {/* Line from logs/dlp.json to SOC WAZUH */}
          <path d="M 830 119 L 868 119 L 868 150 L 878 150" fill="none" stroke="#059669" strokeWidth="2" markerEnd="url(#arrowGreen)" />
          <text x="854" y="112" fill="#059669" fontSize="9.5" fontWeight="800" fontFamily="monospace">
            send_to_wazuh()
          </text>

          {/* SOC WAZUH BOX CONTAINER */}
          <g>
            {/* Outer Box */}
            <rect x="878" y="95" width="225" height="270" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="2.5" />
            
            {/* Header */}
            <rect x="878" y="95" width="225" height="32" rx="7" fill="#059669" />
            <text x="990.5" y="116" fill="#ffffff" fontSize="13" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.02em">
              4. SOC WAZUH
            </text>

            {/* Sub-header text */}
            <text x="990.5" y="145" fill="#065f46" fontSize="11" fontWeight="800" fontFamily="sans-serif" textAnchor="middle">
              Centralisation Logs &amp; SIEM
            </text>

            {/* Item 1: Log Transmis */}
            <rect x="890" y="158" width="201" height="46" rx="5" fill="#ffffff" stroke="#a7f3d0" strokeWidth="1.5" />
            <text x="900" y="175" fill="#059669" fontSize="10.5" fontWeight="800" fontFamily="sans-serif">
              Log Transmis :
            </text>
            <text x="900" y="192" fill="#047857" fontSize="10" fontWeight="700" fontFamily="monospace">
              /var/log/dlp/dlp.json
            </text>

            {/* Item 2: Corrélation SIEM */}
            <rect x="890" y="214" width="201" height="46" rx="5" fill="#ffffff" stroke="#a7f3d0" strokeWidth="1.5" />
            <text x="900" y="231" fill="#059669" fontSize="10.5" fontWeight="800" fontFamily="sans-serif">
              Corrélation SIEM :
            </text>
            <text x="900" y="248" fill="#0f172a" fontSize="9.5" fontWeight="700" fontFamily="sans-serif">
              Logs DLP poussés vers Wazuh SIEM
            </text>

            {/* Item 3: Active Response */}
            <rect x="890" y="270" width="201" height="82" rx="5" fill="#ffffff" stroke="#a7f3d0" strokeWidth="1.5" />
            <text x="900" y="287" fill="#059669" fontSize="10.5" fontWeight="800" fontFamily="sans-serif">
              Active Response :
            </text>
            <text x="900" y="304" fill="#0f172a" fontSize="9.5" fontWeight="700" fontFamily="sans-serif">
              • Isolation réseau sous &lt;1.5s
            </text>
            <text x="900" y="320" fill="#0f172a" fontSize="9.5" fontWeight="700" fontFamily="sans-serif">
              • Blocage du Reverse Shell
            </text>
            <text x="900" y="336" fill="#047857" fontSize="9" fontWeight="800" fontFamily="monospace">
              • Socket Unix UDP /var/ossec/...
            </text>
          </g>

        </svg>
      </div>

    </div>
  );
}
