import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Shell } from '../Presentation';
import type { SlideProps } from '../Presentation';

import oneTrustLogin from '../../../public/One-trust-login.png';
import dashboardOnetrust from '../../../public/Dashboard-onetrust.png';
import labelguardOverview from '../../../public/Labelguard-overview.png';
import addAnalyseRule from '../../../public/add&analyse-rule.png';
import monitoringTools1 from '../../../public/monitoring-tools1.png';

const Icons = {
  Tag: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2H2v10l11 11 10-10L12 2z"/>
      <circle cx="7" cy="7" r="1.5"/>
    </svg>
  ),
  Globe: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10z"/>
    </svg>
  ),
  Usb: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 10h12v11a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V10z"/>
      <path d="M9 10V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6"/>
      <rect x="9" y="6" width="2" height="2"/>
      <rect x="13" y="6" width="2" height="2"/>
    </svg>
  ),
  Mail: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  ),
  Clock: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Terminal: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5"/>
      <line x1="12" y1="19" x2="20" y2="19"/>
    </svg>
  ),
  Zap: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Download: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  FileText: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  Layout: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <line x1="3" y1="9" x2="21" y2="9"/>
      <line x1="9" y1="21" x2="9" y2="9"/>
    </svg>
  ),
  Search: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  Shield: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Sparkles: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"/>
    </svg>
  ),
  Maximize: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
    </svg>
  )
};

interface Scenario {
  id: number;
  time: number;
  timeStr: string;
  title: string;
  subtitle: string;
  badge: string;
  IconComponent: React.ComponentType;
  color: string;
  lightBg: string;
  borderColor: string;
}

const DEMO_SCENARIOS: Scenario[] = [
  {
    id: 1,
    time: 34,
    timeStr: '0:34',
    title: 'Premier scénario : Détection des fichiers secrets (Autolabeling)',
    subtitle: 'Marquage automatique et classification en temps réel',
    badge: 'Autolabeling',
    IconComponent: Icons.Tag,
    color: '#00008f',
    lightBg: '#f0f4ff',
    borderColor: '#3b82f6',
  },
  {
    id: 2,
    time: 73,
    timeStr: '1:13',
    title: 'Deuxième scénario : Détection d\'upload',
    subtitle: 'Interception et blocage des flux web',
    badge: 'Upload Web',
    IconComponent: Icons.Globe,
    color: '#6366f1',
    lightBg: '#f5f3ff',
    borderColor: '#8b5cf6',
  },
  {
    id: 3,
    time: 95,
    timeStr: '1:35',
    title: 'Troisième scénario : Détection USB',
    subtitle: 'Contrôle des supports amovibles',
    badge: 'Support USB',
    IconComponent: Icons.Usb,
    color: '#d97706',
    lightBg: '#fffbeb',
    borderColor: '#f59e0b',
  },
  {
    id: 4,
    time: 127,
    timeStr: '2:07',
    title: 'Quatrième scénario : Détection Exchange',
    subtitle: 'Protection des e-mails & pièces jointes',
    badge: 'Exchange Mail',
    IconComponent: Icons.Mail,
    color: '#dc2626',
    lightBg: '#fef2f2',
    borderColor: '#ef4444',
  },
];

const PENTEST_SCENARIOS: Scenario[] = [
  {
    id: 1,
    time: 9,
    timeStr: '0:09',
    title: 'Premier scénario : Lancement d’un écouteur (Multi Handler) dans Metasploit',
    subtitle: 'Configuration & démarrage de la session d\'écoute Metasploit',
    badge: 'Multi Handler',
    IconComponent: Icons.Terminal,
    color: '#00008f',
    lightBg: '#f0f4ff',
    borderColor: '#3b82f6',
  },
  {
    id: 2,
    time: 18,
    timeStr: '0:18',
    title: 'Deuxième scénario : Exécution du payload',
    subtitle: 'Déclenchement du payload offensif sur la cible',
    badge: 'Payload Exec',
    IconComponent: Icons.Zap,
    color: '#dc2626',
    lightBg: '#fef2f2',
    borderColor: '#ef4444',
  },
  {
    id: 3,
    time: 31,
    timeStr: '0:31',
    title: 'Troisième scénario : Téléchargement du fichier Secret',
    subtitle: 'Exfiltration & récupération des données confidentielles',
    badge: 'Téléchargement',
    IconComponent: Icons.Download,
    color: '#d97706',
    lightBg: '#fffbeb',
    borderColor: '#f59e0b',
  },
  {
    id: 4,
    time: 32,
    timeStr: '0:32',
    title: 'Quatrième scénario : Ouverture du fichier secret dans la machine distante',
    subtitle: 'Accès & consultation du contenu sensible sur l\'hôte distant',
    badge: 'Machine Distante',
    IconComponent: Icons.FileText,
    color: '#6366f1',
    lightBg: '#f5f3ff',
    borderColor: '#8b5cf6',
  },
];

const SOC_SCENARIOS: Scenario[] = [
  {
    id: 1,
    time: 27,
    timeStr: '0:27',
    title: 'Premier scénario : Détection des Payloads Exécutés',
    subtitle: 'Analyse & détection des payloads exécutés sur la machine',
    badge: 'Détection Payloads',
    IconComponent: Icons.Zap,
    color: '#00008f',
    lightBg: '#f0f4ff',
    borderColor: '#3b82f6',
  },
  {
    id: 2,
    time: 52,
    timeStr: '0:52',
    title: 'Deuxième scénario : Requête DQL Sauvegardée',
    subtitle: 'Exécution de la requête DQL retournant toutes les alertes DLP',
    badge: 'Query DQL',
    IconComponent: Icons.Search,
    color: '#6366f1',
    lightBg: '#f5f3ff',
    borderColor: '#8b5cf6',
  },
  {
    id: 3,
    time: 80,
    timeStr: '1:20',
    title: 'Troisième scénario : Dashboard Personnalisé',
    subtitle: 'Supervision & tableau de bord personnalisé du SOC',
    badge: 'Dashboard SOC',
    IconComponent: Icons.Layout,
    color: '#10b981',
    lightBg: '#ecfdf5',
    borderColor: '#10b981',
  },
];

const PLATFORM_SCENARIOS: Scenario[] = [
  {
    id: 1,
    time: 0,
    timeStr: '0:00',
    title: 'Premier scénario : Solution 1 — LabelGuard',
    subtitle: 'Génération algorithmique synthétique & validation Purview',
    badge: 'LabelGuard',
    IconComponent: Icons.Shield,
    color: '#00008f',
    lightBg: '#f0f4ff',
    borderColor: '#3b82f6',
  },
  {
    id: 2,
    time: 24,
    timeStr: '0:24',
    title: 'Deuxième scénario : Solution 2 — OneTrust Tracker',
    subtitle: 'Analyse comparative des règles CM11 & recommandation IA Locale (Ollama)',
    badge: 'OneTrust Tracker',
    IconComponent: Icons.Sparkles,
    color: '#7c3aed',
    lightBg: '#f5f3ff',
    borderColor: '#8b5cf6',
  },
  {
    id: 3,
    time: 70,
    timeStr: '1:10',
    title: 'Troisième scénario : Solution 3 — DLP Monitoring Tools',
    subtitle: 'Traitement, démasquage automatique & restitution des alertes SOC',
    badge: 'DLP Monitoring',
    IconComponent: Icons.Layout,
    color: '#10b981',
    lightBg: '#ecfdf5',
    borderColor: '#10b981',
  },
];

export default function DemoDlpSlide({ n }: SlideProps) {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1);

  const phaseRef = useRef(phase);
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);
  const isScrolling = useRef(false);

  const containerRef1 = useRef<HTMLDivElement>(null);
  const containerRef2 = useRef<HTMLDivElement>(null);
  const containerRef3 = useRef<HTMLDivElement>(null);
  const containerRef4 = useRef<HTMLDivElement>(null);

  const togglePlaybackSpeed = () => {
    setPlaybackRate((prev) => {
      const next = prev === 1 ? 2 : 1;
      [videoRef1, videoRef2, videoRef3, videoRef4].forEach((ref) => {
        if (ref.current) ref.current.playbackRate = next;
      });
      return next;
    });
  };

  const enterFullscreen = (containerRef: React.RefObject<HTMLDivElement | null>) => {
    if (!document.fullscreenElement && containerRef.current?.requestFullscreen) {
      containerRef.current.requestFullscreen().catch(() => {});
    }
  };

  const toggleFullscreen = (containerRef: React.RefObject<HTMLDivElement | null>) => {
    enterFullscreen(containerRef);
  };

  // Phase 1 (Simulation DLP) Video State
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const splashTimerRef1 = useRef<NodeJS.Timeout | null>(null);

  const [currentTime1, setCurrentTime1] = useState(0);
  const [duration1, setDuration1] = useState(0);
  const [isPlaying1, setIsPlaying1] = useState(false);
  const [showSplash1, setShowSplash1] = useState(false);
  const [splashScenario1, setSplashScenario1] = useState<Scenario | null>(null);
  const [prevScenarioId1, setPrevScenarioId1] = useState<number | null>(null);

  const activeScenario1 = DEMO_SCENARIOS.slice().reverse().find((s) => currentTime1 >= s.time) || null;
  const activeScenarioId1 = activeScenario1?.id ?? null;

  // Adjust splash state synchronously during render when scenario changes (React recommended pattern)
  if (activeScenarioId1 !== prevScenarioId1) {
    setPrevScenarioId1(activeScenarioId1);
    if (activeScenarioId1 !== null && activeScenarioId1 !== 4 && activeScenario1) {
      setSplashScenario1(activeScenario1);
      setShowSplash1(true);
    } else {
      setShowSplash1(false);
    }
  }

  useEffect(() => {
    if (showSplash1) {
      if (splashTimerRef1.current) clearTimeout(splashTimerRef1.current);
      splashTimerRef1.current = setTimeout(() => {
        setShowSplash1(false);
      }, 2000);
    }
    return () => {
      if (splashTimerRef1.current) clearTimeout(splashTimerRef1.current);
    };
  }, [showSplash1]);

  // Phase 2 (Pentest) Video State
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const splashTimerRef2 = useRef<NodeJS.Timeout | null>(null);

  const [currentTime2, setCurrentTime2] = useState(0);
  const [duration2, setDuration2] = useState(0);
  const [isPlaying2, setIsPlaying2] = useState(false);
  const [showSplash2, setShowSplash2] = useState(false);
  const [splashScenario2, setSplashScenario2] = useState<Scenario | null>(null);
  const [prevScenarioId2, setPrevScenarioId2] = useState<number | null>(null);

  const activeScenario2 = PENTEST_SCENARIOS.slice().reverse().find((s) => currentTime2 >= s.time) || null;
  const activeScenarioId2 = activeScenario2?.id ?? null;

  if (activeScenarioId2 !== prevScenarioId2) {
    setPrevScenarioId2(activeScenarioId2);
    if (activeScenarioId2 !== null && activeScenarioId2 !== 4 && activeScenario2) {
      setSplashScenario2(activeScenario2);
      setShowSplash2(true);
    } else {
      setShowSplash2(false);
    }
  }

  useEffect(() => {
    if (showSplash2) {
      if (splashTimerRef2.current) clearTimeout(splashTimerRef2.current);
      splashTimerRef2.current = setTimeout(() => {
        setShowSplash2(false);
      }, 2000);
    }
    return () => {
      if (splashTimerRef2.current) clearTimeout(splashTimerRef2.current);
    };
  }, [showSplash2]);

  // Phase 3 (Supervision SOC) Video State
  const videoRef3 = useRef<HTMLVideoElement>(null);
  const splashTimerRef3 = useRef<NodeJS.Timeout | null>(null);

  const [currentTime3, setCurrentTime3] = useState(0);
  const [duration3, setDuration3] = useState(0);
  const [isPlaying3, setIsPlaying3] = useState(false);
  const [showSplash3, setShowSplash3] = useState(false);
  const [splashScenario3, setSplashScenario3] = useState<Scenario | null>(null);
  const [prevScenarioId3, setPrevScenarioId3] = useState<number | null>(null);

  const activeScenario3 = SOC_SCENARIOS.slice().reverse().find((s) => currentTime3 >= s.time) || null;
  const activeScenarioId3 = activeScenario3?.id ?? null;

  if (activeScenarioId3 !== prevScenarioId3) {
    setPrevScenarioId3(activeScenarioId3);
    if (activeScenarioId3 !== null && activeScenario3) {
      setSplashScenario3(activeScenario3);
      setShowSplash3(true);
    } else {
      setShowSplash3(false);
    }
  }

  useEffect(() => {
    if (showSplash3) {
      if (splashTimerRef3.current) clearTimeout(splashTimerRef3.current);
      splashTimerRef3.current = setTimeout(() => {
        setShowSplash3(false);
      }, 2000);
    }
    return () => {
      if (splashTimerRef3.current) clearTimeout(splashTimerRef3.current);
    };
  }, [showSplash3]);

  // Phase 4 (Platforms) Video State
  const videoRef4 = useRef<HTMLVideoElement>(null);
  const splashTimerRef4 = useRef<NodeJS.Timeout | null>(null);

  const [currentTime4, setCurrentTime4] = useState(0);
  const [duration4, setDuration4] = useState(0);
  const [isPlaying4, setIsPlaying4] = useState(false);
  const [showSplash4, setShowSplash4] = useState(false);
  const [splashScenario4, setSplashScenario4] = useState<Scenario | null>(null);
  const [prevScenarioId4, setPrevScenarioId4] = useState<number | null>(null);

  const activeScenario4 = PLATFORM_SCENARIOS.slice().reverse().find((s) => currentTime4 >= s.time) || null;
  const activeScenarioId4 = activeScenario4?.id ?? null;

  if (activeScenarioId4 !== prevScenarioId4) {
    setPrevScenarioId4(activeScenarioId4);
    if (activeScenarioId4 !== null && activeScenario4) {
      setSplashScenario4(activeScenario4);
      setShowSplash4(true);
    } else {
      setShowSplash4(false);
    }
  }

  useEffect(() => {
    if (showSplash4) {
      if (splashTimerRef4.current) clearTimeout(splashTimerRef4.current);
      splashTimerRef4.current = setTimeout(() => {
        setShowSplash4(false);
      }, 2000);
    }
    return () => {
      if (splashTimerRef4.current) clearTimeout(splashTimerRef4.current);
    };
  }, [showSplash4]);

  // Pause non-active phase videos automatically when switching phases
  useEffect(() => {
    if (phase !== 0 && videoRef1.current && !videoRef1.current.paused) {
      videoRef1.current.pause();
      setIsPlaying1(false);
    }
    if (phase !== 1 && videoRef2.current && !videoRef2.current.paused) {
      videoRef2.current.pause();
      setIsPlaying2(false);
    }
    if (phase !== 2 && videoRef3.current && !videoRef3.current.paused) {
      videoRef3.current.pause();
      setIsPlaying3(false);
    }
    if (phase !== 3 && videoRef4.current && !videoRef4.current.paused) {
      videoRef4.current.pause();
      setIsPlaying4(false);
    }

    let activeContainer: HTMLDivElement | null = null;
    if (phase === 0) activeContainer = containerRef1.current;
    else if (phase === 1) activeContainer = containerRef2.current;
    else if (phase === 2) activeContainer = containerRef3.current;
    else if (phase === 3) activeContainer = containerRef4.current;

    if (activeContainer && document.fullscreenElement) {
      activeContainer.requestFullscreen().catch(() => {});
    }
  }, [phase]);

  const safeSeekAndPlay = (
    video: HTMLVideoElement | null,
    setIsPlaying: (playing: boolean) => void,
    setCurrentTime: (time: number) => void,
    targetTime: number
  ) => {
    if (!video) return;
    try {
      video.currentTime = targetTime;
      video.playbackRate = playbackRate;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Safely catch video play interruptions
          });
      }
      setCurrentTime(targetTime);
    } catch {
      // Gracefully catch potential DOMException during rapid seek
    }
  };

  const handleSeekTo1 = (timeInSeconds: number) => safeSeekAndPlay(videoRef1.current, setIsPlaying1, setCurrentTime1, timeInSeconds);
  const handleSeekTo2 = (timeInSeconds: number) => safeSeekAndPlay(videoRef2.current, setIsPlaying2, setCurrentTime2, timeInSeconds);
  const handleSeekTo3 = (timeInSeconds: number) => safeSeekAndPlay(videoRef3.current, setIsPlaying3, setCurrentTime3, timeInSeconds);
  const handleSeekTo4 = (timeInSeconds: number) => safeSeekAndPlay(videoRef4.current, setIsPlaying4, setCurrentTime4, timeInSeconds);

  const handleTabNextScenario = (isShift: boolean) => {
    const currentPhase = phaseRef.current;
    let scenarios: Scenario[] = [];
    let currentTime = 0;
    let seekFn: (t: number) => void = () => {};

    if (currentPhase === 0) {
      scenarios = DEMO_SCENARIOS;
      currentTime = videoRef1.current?.currentTime ?? 0;
      seekFn = handleSeekTo1;
    } else if (currentPhase === 1) {
      scenarios = PENTEST_SCENARIOS;
      currentTime = videoRef2.current?.currentTime ?? 0;
      seekFn = handleSeekTo2;
    } else if (currentPhase === 2) {
      scenarios = SOC_SCENARIOS;
      currentTime = videoRef3.current?.currentTime ?? 0;
      seekFn = handleSeekTo3;
    } else if (currentPhase === 3) {
      scenarios = PLATFORM_SCENARIOS;
      currentTime = videoRef4.current?.currentTime ?? 0;
      seekFn = handleSeekTo4;
    }

    if (!scenarios.length) return;

    if (!isShift) {
      const next = scenarios.find((s) => s.time > currentTime + 1.5);
      if (next) {
        seekFn(next.time);
      } else {
        seekFn(scenarios[0].time);
      }
    } else {
      const prevList = scenarios.filter((s) => s.time < currentTime - 1.5);
      if (prevList.length > 0) {
        seekFn(prevList[prevList.length - 1].time);
      } else {
        seekFn(scenarios[scenarios.length - 1].time);
      }
    }
  };

  // Auto-restore container fullscreen if browser drops out of fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        let container: HTMLDivElement | null = null;
        const currentPhase = phaseRef.current;
        if (currentPhase === 0) container = containerRef1.current;
        else if (currentPhase === 1) container = containerRef2.current;
        else if (currentPhase === 2) container = containerRef3.current;
        else if (currentPhase === 3) container = containerRef4.current;

        if (container && container.requestFullscreen) {
          container.requestFullscreen().catch(() => {});
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Capture wheel and keyboard events for internal phase navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 18) return;
      if (isScrolling.current) return;

      if (e.deltaY > 0) {
        if (phaseRef.current < 3) {
          e.stopPropagation();
          e.stopImmediatePropagation();
          isScrolling.current = true;
          setPhase((p) => (p + 1) as 0 | 1 | 2 | 3);
          setTimeout(() => { isScrolling.current = false; }, 400);
        }
      } else if (e.deltaY < 0) {
        if (phaseRef.current > 0) {
          e.stopPropagation();
          e.stopImmediatePropagation();
          isScrolling.current = true;
          setPhase((p) => (p - 1) as 0 | 1 | 2 | 3);
          setTimeout(() => { isScrolling.current = false; }, 400);
        }
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        let container: HTMLDivElement | null = null;
        const currentPhase = phaseRef.current;
        if (currentPhase === 0) container = containerRef1.current;
        else if (currentPhase === 1) container = containerRef2.current;
        else if (currentPhase === 2) container = containerRef3.current;
        else if (currentPhase === 3) container = containerRef4.current;

        if (container && !document.fullscreenElement) {
          container.requestFullscreen().catch(() => {});
        }
        return;
      }

      if (e.key === 'v' || e.key === 'V') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        togglePlaybackSpeed();
        return;
      }

      if (e.key === 'Tab') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        handleTabNextScenario(e.shiftKey);
        return;
      }

      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        const currentPhase = phaseRef.current;
        let activeVideo: HTMLVideoElement | null = null;
        if (currentPhase === 0) activeVideo = videoRef1.current;
        else if (currentPhase === 1) activeVideo = videoRef2.current;
        else if (currentPhase === 2) activeVideo = videoRef3.current;
        else if (currentPhase === 3) activeVideo = videoRef4.current;

        if (activeVideo) {
          if (activeVideo.paused) {
            activeVideo.play().catch(() => {});
          } else {
            activeVideo.pause();
          }
        }
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (phaseRef.current < 3) {
          e.stopPropagation();
          e.stopImmediatePropagation();
          setPhase((p) => (p + 1) as 0 | 1 | 2 | 3);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (phaseRef.current > 0) {
          e.stopPropagation();
          e.stopImmediatePropagation();
          setPhase((p) => (p - 1) as 0 | 1 | 2 | 3);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { capture: true });
    window.addEventListener('keydown', handleKey, { capture: true });

    return () => {
      window.removeEventListener('wheel', handleWheel, { capture: true });
      window.removeEventListener('keydown', handleKey, { capture: true });
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const titles = [
    'Simulation Opérationnelle DLP',
    'Validation Offensive (Pentest)',
    'Supervision SOC et Centralisation',
    'Démonstration des Outils Métier'
  ];

  const kickers = [
    'DÉMONSTRATION • PHASE 1/4',
    'DÉMONSTRATION • PHASE 2/4',
    'DÉMONSTRATION • PHASE 3/4',
    'DÉMONSTRATION • PHASE 4/4'
  ];

  const socImages = [
    { src: oneTrustLogin, title: 'Portail de Connexion Administrateur' },
    { src: dashboardOnetrust, title: 'Tableau de Bord des KPIs' },
    { src: labelguardOverview, title: 'Inventaire Fichiers' },
    { src: addAnalyseRule, title: 'Gestionnaire de Règles' },
  ];

  return (
    <Shell section="DÉMONSTRATION" kicker={kickers[phase]} title={titles[phase]} n={n} dense>
      <div className="demo-slide-layout" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% + 1vw)', width: '100%', marginTop: '-0.8vw' }}>
        
        {/* Top 4-Phase Selector Pills & Speed Multiplier Button */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', marginBottom: '6px', zIndex: 20 }}>
          {[
            { id: 0, label: '1. Simulation DLP', color: '#00008f' },
            { id: 1, label: '2. Validation Pentest', color: '#dc2626' },
            { id: 2, label: '3. Supervision SOC', color: '#0b66d5' },
            { id: 3, label: '4. Plateformes', color: '#7c3aed' }
          ].map((p) => {
            const isActive = phase === p.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  const pId = p.id as 0 | 1 | 2 | 3;
                  setPhase(pId);
                  let container: HTMLDivElement | null = null;
                  if (pId === 0) container = containerRef1.current;
                  else if (pId === 1) container = containerRef2.current;
                  else if (pId === 2) container = containerRef3.current;
                  else if (pId === 3) container = containerRef4.current;
                  if (container && !document.fullscreenElement) {
                    container.requestFullscreen().catch(() => {});
                  }
                }}
                style={{
                  padding: '2px 14px',
                  borderRadius: '16px',
                  border: `1.5px solid ${isActive ? p.color : '#cbd5e1'}`,
                  background: isActive ? `${p.color}12` : '#fff',
                  color: isActive ? p.color : '#64748b',
                  fontSize: '0.7vw',
                  fontWeight: isActive ? 800 : 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? `0 2px 8px ${p.color}25` : 'none'
                }}
              >
                {p.label}
              </button>
            );
          })}

          {/* Speed Toggle Badge (Key V) */}
          <button
            onClick={togglePlaybackSpeed}
            style={{
              padding: '2px 12px',
              borderRadius: '16px',
              border: `1.5px solid ${playbackRate === 2 ? '#0b66d5' : '#cbd5e1'}`,
              background: playbackRate === 2 ? '#eff6ff' : '#ffffff',
              color: playbackRate === 2 ? '#0b66d5' : '#475569',
              fontSize: '0.7vw',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: playbackRate === 2 ? '0 2px 8px rgba(11, 102, 213, 0.2)' : 'none',
              marginLeft: '8px'
            }}
          >
            <span>{playbackRate === 2 ? '⏩ Vitesse 2.0x' : '▶ Vitesse 1.0x'}</span>
            <span style={{ fontSize: '0.58vw', background: playbackRate === 2 ? '#0b66d5' : '#cbd5e1', color: '#ffffff', padding: '0.08vw 0.3vw', borderRadius: '4px' }}>
              Touche V
            </span>
          </button>
        </div>

        {/* Permanently Mounted & Pre-Decoded Dynamic Phase Containers (No lag / 60 FPS GPU hardware acceleration) */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          
          {/* PHASE 0 : SIMULATION DLP */}
          <motion.div
            animate={{
              opacity: phase === 0 ? 1 : 0,
              y: phase === 0 ? 0 : phase > 0 ? -25 : 25,
              pointerEvents: phase === 0 ? 'auto' : 'none'
            }}
            transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              willChange: 'transform, opacity'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
              <div
                ref={containerRef1}
                className="demo-video-container"
                style={{
                  border: '1px solid #d7e5f7',
                  borderRadius: '14px',
                  background: '#fff',
                  overflow: 'hidden',
                  padding: '6px 8px',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  position: 'relative',
                  boxShadow: '0 4px 20px rgba(11, 43, 93, 0.05)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', borderBottom: '1px solid #eef3fb', paddingBottom: '3px', gap: '8px', flexWrap: 'wrap' }}>
                  <h3 style={{ margin: 0, fontSize: '0.85vw', color: '#0b2b5d', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: isPlaying1 ? '#10b981' : '#9ca3af' }} />
                    Démonstration Opérationnelle DLP
                  </h3>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    {DEMO_SCENARIOS.map((sc) => {
                      const isActive = activeScenario1?.id === sc.id;
                      const IconComponent = sc.IconComponent;
                      return (
                        <button
                          key={sc.id}
                          onClick={() => handleSeekTo1(sc.time)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            padding: '2px 9px',
                            borderRadius: '14px',
                            border: `1.5px solid ${isActive ? sc.borderColor : '#e2e8f0'}`,
                            background: isActive ? sc.lightBg : '#f8fafc',
                            color: isActive ? sc.color : '#475569',
                            fontSize: '0.68vw',
                            fontWeight: isActive ? 700 : 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            whiteSpace: 'nowrap',
                            boxShadow: isActive ? `0 2px 8px ${sc.borderColor}25` : 'none'
                          }}
                        >
                          <IconComponent />
                          <span style={{ fontWeight: 800 }}>{sc.timeStr}</span>
                          <span>{sc.badge}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      onClick={togglePlaybackSpeed}
                      title="Appuyez sur la touche V pour basculer la vitesse (1.0x / 2.0x)"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        border: `1.5px solid ${playbackRate === 2 ? '#0b66d5' : '#cbd5e1'}`,
                        background: playbackRate === 2 ? '#0b66d5' : '#ffffff',
                        color: playbackRate === 2 ? '#ffffff' : '#0b2b5d',
                        fontSize: '0.68vw',
                        fontWeight: 800,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: playbackRate === 2 ? '0 0 10px rgba(11, 102, 213, 0.4)' : 'none'
                      }}
                    >
                      <span>{playbackRate === 2 ? '⚡ 2.0x' : '▶ 1.0x'}</span>
                      <span style={{ fontSize: '0.55vw', background: playbackRate === 2 ? 'rgba(255,255,255,0.3)' : '#e2e8f0', color: playbackRate === 2 ? '#ffffff' : '#475569', padding: '1px 4px', borderRadius: '4px' }}>
                        V
                      </span>
                    </button>
                    <span style={{ fontSize: '0.68vw', fontWeight: 600, color: '#52657d', background: '#f0f4f8', padding: '2px 8px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Icons.Clock />
                      {formatTime(currentTime1)} / {formatTime(duration1 || 0)}
                    </span>
                    <button
                      onClick={() => toggleFullscreen(containerRef1)}
                      title="Afficher en Plein Écran avec Scénarios & Animations"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: '#00008f',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '3px 10px',
                        fontSize: '0.68vw',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 2px 6px rgba(0, 0, 143, 0.25)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Icons.Maximize />
                      <span>Plein Écran</span>
                    </button>
                  </div>
                </div>

                <div style={{ flex: 1, position: 'relative', background: '#000', borderRadius: '10px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <video
                    ref={videoRef1}
                    src="/DLP-DEMO-final.mp4"
                    preload="metadata"
                    controls
                    controlsList="nofullscreen noremoteplayback"
                    disablePictureInPicture
                    onTimeUpdate={() => {
                      if (videoRef1.current && Math.abs(videoRef1.current.currentTime - currentTime1) >= 0.5) {
                        setCurrentTime1(videoRef1.current.currentTime);
                      }
                    }}
                    onLoadedMetadata={() => {
                      if (videoRef1.current) setDuration1(videoRef1.current.duration);
                    }}
                    onPlay={() => setIsPlaying1(true)}
                    onPause={() => setIsPlaying1(false)}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                  />

                  <AnimatePresence>
                    {activeScenario1 && !showSplash1 && (
                      <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          left: '10px',
                          pointerEvents: 'none',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          zIndex: 10
                        }}
                      >
                        <div
                          style={{
                            background: 'rgba(11, 23, 44, 0.92)',
                            backdropFilter: 'blur(12px)',
                            border: `1.5px solid ${activeScenario1.borderColor}`,
                            borderRadius: '10px',
                            padding: '6px 14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            boxShadow: `0 8px 24px rgba(0, 0, 0, 0.4), 0 0 15px ${activeScenario1.borderColor}30`,
                            maxWidth: '80%'
                          }}
                        >
                          <div style={{ color: activeScenario1.borderColor, display: 'flex', alignItems: 'center' }}>
                            {(() => {
                              const IconComponent = activeScenario1.IconComponent;
                              return <IconComponent />;
                            })()}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ fontSize: '0.6vw', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 800, color: activeScenario1.borderColor, background: 'rgba(255,255,255,0.1)', padding: '1px 5px', borderRadius: '4px' }}>
                                SCÉNARIO ACTIF • {activeScenario1.timeStr}
                              </span>
                            </div>
                            <div style={{ color: '#fff', fontSize: '0.85vw', fontWeight: 700, lineHeight: 1.2 }}>
                              {activeScenario1.title}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {showSplash1 && splashScenario1 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: '-40%', x: '-50%' }}
                        animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
                        exit={{ opacity: 0, scale: 0.9, y: '-60%', x: '-50%' }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          zIndex: 30,
                          pointerEvents: 'none',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          maxWidth: '85%'
                        }}
                      >
                        <div
                          style={{
                            background: 'rgba(6, 17, 38, 0.95)',
                            backdropFilter: 'blur(20px)',
                            border: `2px solid ${splashScenario1.borderColor}`,
                            borderRadius: '16px',
                            padding: '18px 32px',
                            textAlign: 'center',
                            boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${splashScenario1.borderColor}60`,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '8px',
                              background: `${splashScenario1.borderColor}25`,
                              border: `1px solid ${splashScenario1.borderColor}60`,
                              color: splashScenario1.borderColor,
                              padding: '4px 14px',
                              borderRadius: '20px',
                              fontSize: '0.72vw',
                              fontWeight: 800,
                              textTransform: 'uppercase',
                              letterSpacing: '0.08em'
                            }}
                          >
                            <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: splashScenario1.borderColor }} />
                            LANCEMENT DU SCÉNARIO • {splashScenario1.timeStr}
                          </div>

                          <h2 style={{ margin: 0, color: '#fff', fontSize: '1.25vw', fontWeight: 800, letterSpacing: '-0.01em', lineHeight: 1.25 }}>
                            {splashScenario1.title}
                          </h2>

                          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.82vw', fontWeight: 500 }}>
                            {splashScenario1.subtitle}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>

          {/* PHASE 1 : VALIDATION PENTEST */}
          <motion.div
            animate={{
              opacity: phase === 1 ? 1 : 0,
              y: phase === 1 ? 0 : phase > 1 ? -25 : 25,
              pointerEvents: phase === 1 ? 'auto' : 'none'
            }}
            transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              willChange: 'transform, opacity'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
              <div
                ref={containerRef2}
                className="demo-video-container"
                style={{
                  border: '1px solid #d7e5f7',
                  borderRadius: '14px',
                  background: '#fff',
                  overflow: 'hidden',
                  padding: '6px 8px',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  position: 'relative',
                  boxShadow: '0 4px 20px rgba(11, 43, 93, 0.05)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', borderBottom: '1px solid #eef3fb', paddingBottom: '3px', gap: '8px', flexWrap: 'wrap' }}>
                  <h3 style={{ margin: 0, fontSize: '0.85vw', color: '#0b2b5d', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: isPlaying2 ? '#ef4444' : '#9ca3af' }} />
                    Validation Offensive (Pentest Metasploit)
                  </h3>

                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    {PENTEST_SCENARIOS.map((sc) => {
                      const isActive = activeScenario2?.id === sc.id;
                      const IconComponent = sc.IconComponent;
                      return (
                        <button
                          key={sc.id}
                          onClick={() => handleSeekTo2(sc.time)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            padding: '2px 9px',
                            borderRadius: '14px',
                            border: `1.5px solid ${isActive ? sc.borderColor : '#e2e8f0'}`,
                            background: isActive ? sc.lightBg : '#f8fafc',
                            color: isActive ? sc.color : '#475569',
                            fontSize: '0.68vw',
                            fontWeight: isActive ? 700 : 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            whiteSpace: 'nowrap',
                            boxShadow: isActive ? `0 2px 8px ${sc.borderColor}25` : 'none'
                          }}
                        >
                          <IconComponent />
                          <span style={{ fontWeight: 800 }}>{sc.timeStr}</span>
                          <span>{sc.badge}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      onClick={togglePlaybackSpeed}
                      title="Appuyez sur la touche V pour basculer la vitesse (1.0x / 2.0x)"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        border: `1.5px solid ${playbackRate === 2 ? '#dc2626' : '#cbd5e1'}`,
                        background: playbackRate === 2 ? '#dc2626' : '#ffffff',
                        color: playbackRate === 2 ? '#ffffff' : '#0b2b5d',
                        fontSize: '0.68vw',
                        fontWeight: 800,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: playbackRate === 2 ? '0 0 10px rgba(220, 38, 38, 0.4)' : 'none'
                      }}
                    >
                      <span>{playbackRate === 2 ? '⚡ 2.0x' : '▶ 1.0x'}</span>
                      <span style={{ fontSize: '0.55vw', background: playbackRate === 2 ? 'rgba(255,255,255,0.3)' : '#e2e8f0', color: playbackRate === 2 ? '#ffffff' : '#475569', padding: '1px 4px', borderRadius: '4px' }}>
                        V
                      </span>
                    </button>
                    <span style={{ fontSize: '0.68vw', fontWeight: 600, color: '#52657d', background: '#f0f4f8', padding: '2px 8px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Icons.Clock />
                      {formatTime(currentTime2)} / {formatTime(duration2 || 0)}
                    </span>
                    <button
                      onClick={() => toggleFullscreen(containerRef2)}
                      title="Afficher en Plein Écran avec Scénarios & Animations"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: '#dc2626',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '3px 10px',
                        fontSize: '0.68vw',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 2px 6px rgba(220, 38, 38, 0.25)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Icons.Maximize />
                      <span>Plein Écran</span>
                    </button>
                  </div>
                </div>

                <div style={{ flex: 1, position: 'relative', background: '#000', borderRadius: '10px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  {/* Floating Speed Indicator Badge inside Fullscreen Video Container */}
                  <div
                    onClick={togglePlaybackSpeed}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      zIndex: 20,
                      background: playbackRate === 2 ? 'rgba(220, 38, 38, 0.9)' : 'rgba(15, 23, 42, 0.8)',
                      backdropFilter: 'blur(8px)',
                      border: `1.5px solid ${playbackRate === 2 ? '#fca5a5' : 'rgba(255, 255, 255, 0.25)'}`,
                      borderRadius: '16px',
                      padding: '3px 9px',
                      color: '#ffffff',
                      fontSize: '0.68vw',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>{playbackRate === 2 ? '⚡ Vitesse 2.0x' : '▶ Vitesse 1.0x'}</span>
                    <span style={{ fontSize: '0.55vw', background: 'rgba(255, 255, 255, 0.25)', padding: '1px 4px', borderRadius: '4px' }}>
                      [V]
                    </span>
                  </div>
                  <video
                    ref={videoRef2}
                    src="/Phase Pentest -Final.mp4"
                    preload="metadata"
                    controls
                    controlsList="nofullscreen noremoteplayback"
                    disablePictureInPicture
                    onTimeUpdate={() => {
                      if (videoRef2.current && Math.abs(videoRef2.current.currentTime - currentTime2) >= 0.5) {
                        setCurrentTime2(videoRef2.current.currentTime);
                      }
                    }}
                    onLoadedMetadata={() => {
                      if (videoRef2.current) setDuration2(videoRef2.current.duration);
                    }}
                    onPlay={() => setIsPlaying2(true)}
                    onPause={() => setIsPlaying2(false)}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                  />

                  <AnimatePresence>
                    {activeScenario2 && !showSplash2 && (
                      <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          left: '10px',
                          pointerEvents: 'none',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          zIndex: 10
                        }}
                      >
                        <div
                          style={{
                            background: 'rgba(11, 23, 44, 0.92)',
                            backdropFilter: 'blur(12px)',
                            border: `1.5px solid ${activeScenario2.borderColor}`,
                            borderRadius: '10px',
                            padding: '6px 14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            boxShadow: `0 8px 24px rgba(0, 0, 0, 0.4), 0 0 15px ${activeScenario2.borderColor}30`,
                            maxWidth: '80%'
                          }}
                        >
                          <div style={{ color: activeScenario2.borderColor, display: 'flex', alignItems: 'center' }}>
                            {(() => {
                              const IconComponent = activeScenario2.IconComponent;
                              return <IconComponent />;
                            })()}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ fontSize: '0.6vw', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 800, color: activeScenario2.borderColor, background: 'rgba(255,255,255,0.1)', padding: '1px 5px', borderRadius: '4px' }}>
                                SCÉNARIO PENTEST • {activeScenario2.timeStr}
                              </span>
                            </div>
                            <div style={{ color: '#fff', fontSize: '0.85vw', fontWeight: 700, lineHeight: 1.2 }}>
                              {activeScenario2.title}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {showSplash2 && splashScenario2 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: '-40%', x: '-50%' }}
                        animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
                        exit={{ opacity: 0, scale: 0.9, y: '-60%', x: '-50%' }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          zIndex: 30,
                          pointerEvents: 'none',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          maxWidth: '85%'
                        }}
                      >
                        <div
                          style={{
                            background: 'rgba(6, 17, 38, 0.95)',
                            backdropFilter: 'blur(20px)',
                            border: `2px solid ${splashScenario2.borderColor}`,
                            borderRadius: '16px',
                            padding: '18px 32px',
                            textAlign: 'center',
                            boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${splashScenario2.borderColor}60`,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '8px',
                              background: `${splashScenario2.borderColor}25`,
                              border: `1px solid ${splashScenario2.borderColor}60`,
                              color: splashScenario2.borderColor,
                              padding: '4px 14px',
                              borderRadius: '20px',
                              fontSize: '0.72vw',
                              fontWeight: 800,
                              textTransform: 'uppercase',
                              letterSpacing: '0.08em'
                            }}
                          >
                            <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: splashScenario2.borderColor }} />
                            PHASES DE PENTEST • {splashScenario2.timeStr}
                          </div>

                          <h2 style={{ margin: 0, color: '#fff', fontSize: '1.25vw', fontWeight: 800, letterSpacing: '-0.01em', lineHeight: 1.25 }}>
                            {splashScenario2.title}
                          </h2>

                          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.82vw', fontWeight: 500 }}>
                            {splashScenario2.subtitle}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>

          {/* PHASE 2 : SUPERVISION SOC */}
          <motion.div
            animate={{
              opacity: phase === 2 ? 1 : 0,
              y: phase === 2 ? 0 : 25,
              pointerEvents: phase === 2 ? 'auto' : 'none'
            }}
            transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              willChange: 'transform, opacity'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
              <div
                ref={containerRef3}
                className="demo-video-container"
                style={{
                  border: '1px solid #d7e5f7',
                  borderRadius: '14px',
                  background: '#fff',
                  overflow: 'hidden',
                  padding: '6px 8px',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  position: 'relative',
                  boxShadow: '0 4px 20px rgba(11, 43, 93, 0.05)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', borderBottom: '1px solid #eef3fb', paddingBottom: '3px', gap: '8px', flexWrap: 'wrap' }}>
                  <h3 style={{ margin: 0, fontSize: '0.85vw', color: '#0b2b5d', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: isPlaying3 ? '#0b66d5' : '#9ca3af' }} />
                    Supervision SOC & Centralisation
                  </h3>

                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    {SOC_SCENARIOS.map((sc) => {
                      const isActive = activeScenario3?.id === sc.id;
                      const IconComponent = sc.IconComponent;
                      return (
                        <button
                          key={sc.id}
                          onClick={() => handleSeekTo3(sc.time)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            padding: '2px 9px',
                            borderRadius: '14px',
                            border: `1.5px solid ${isActive ? sc.borderColor : '#e2e8f0'}`,
                            background: isActive ? sc.lightBg : '#f8fafc',
                            color: isActive ? sc.color : '#475569',
                            fontSize: '0.68vw',
                            fontWeight: isActive ? 700 : 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            whiteSpace: 'nowrap',
                            boxShadow: isActive ? `0 2px 8px ${sc.borderColor}25` : 'none'
                          }}
                        >
                          <IconComponent />
                          <span style={{ fontWeight: 800 }}>{sc.timeStr}</span>
                          <span>{sc.badge}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      onClick={togglePlaybackSpeed}
                      title="Appuyez sur la touche V pour basculer la vitesse (1.0x / 2.0x)"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        border: `1.5px solid ${playbackRate === 2 ? '#0b66d5' : '#cbd5e1'}`,
                        background: playbackRate === 2 ? '#0b66d5' : '#ffffff',
                        color: playbackRate === 2 ? '#ffffff' : '#0b2b5d',
                        fontSize: '0.68vw',
                        fontWeight: 800,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: playbackRate === 2 ? '0 0 10px rgba(11, 102, 213, 0.4)' : 'none'
                      }}
                    >
                      <span>{playbackRate === 2 ? '⚡ 2.0x' : '▶ 1.0x'}</span>
                      <span style={{ fontSize: '0.55vw', background: playbackRate === 2 ? 'rgba(255,255,255,0.3)' : '#e2e8f0', color: playbackRate === 2 ? '#ffffff' : '#475569', padding: '1px 4px', borderRadius: '4px' }}>
                        V
                      </span>
                    </button>
                    <span style={{ fontSize: '0.68vw', fontWeight: 600, color: '#52657d', background: '#f0f4f8', padding: '2px 8px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Icons.Clock />
                      {formatTime(currentTime3)} / {formatTime(duration3 || 0)}
                    </span>
                    <button
                      onClick={() => toggleFullscreen(containerRef3)}
                      title="Afficher en Plein Écran avec Scénarios & Animations"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: '#0b66d5',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '3px 10px',
                        fontSize: '0.68vw',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 2px 6px rgba(11, 102, 213, 0.25)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Icons.Maximize />
                      <span>Plein Écran</span>
                    </button>
                  </div>
                </div>

                <div style={{ flex: 1, position: 'relative', background: '#000', borderRadius: '10px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  {/* Floating Speed Indicator Badge inside Fullscreen Video Container */}
                  <div
                    onClick={togglePlaybackSpeed}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      zIndex: 20,
                      background: playbackRate === 2 ? 'rgba(11, 102, 213, 0.9)' : 'rgba(15, 23, 42, 0.8)',
                      backdropFilter: 'blur(8px)',
                      border: `1.5px solid ${playbackRate === 2 ? '#38bdf8' : 'rgba(255, 255, 255, 0.25)'}`,
                      borderRadius: '16px',
                      padding: '3px 9px',
                      color: '#ffffff',
                      fontSize: '0.68vw',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>{playbackRate === 2 ? '⚡ Vitesse 2.0x' : '▶ Vitesse 1.0x'}</span>
                    <span style={{ fontSize: '0.55vw', background: 'rgba(255, 255, 255, 0.25)', padding: '1px 4px', borderRadius: '4px' }}>
                      [V]
                    </span>
                  </div>
                  <video
                    ref={videoRef3}
                    src="/DLP-SOC.mp4"
                    preload="metadata"
                    controls
                    controlsList="nofullscreen noremoteplayback"
                    disablePictureInPicture
                    onTimeUpdate={() => {
                      if (videoRef3.current && Math.abs(videoRef3.current.currentTime - currentTime3) >= 0.5) {
                        setCurrentTime3(videoRef3.current.currentTime);
                      }
                    }}
                    onLoadedMetadata={() => {
                      if (videoRef3.current) setDuration3(videoRef3.current.duration);
                    }}
                    onPlay={() => setIsPlaying3(true)}
                    onPause={() => setIsPlaying3(false)}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                  />

                  <AnimatePresence>
                    {activeScenario3 && !showSplash3 && (
                      <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          left: '10px',
                          pointerEvents: 'none',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          zIndex: 10
                        }}
                      >
                        <div
                          style={{
                            background: 'rgba(11, 23, 44, 0.92)',
                            backdropFilter: 'blur(12px)',
                            border: `1.5px solid ${activeScenario3.borderColor}`,
                            borderRadius: '10px',
                            padding: '6px 14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            boxShadow: `0 8px 24px rgba(0, 0, 0, 0.4), 0 0 15px ${activeScenario3.borderColor}30`,
                            maxWidth: '80%'
                          }}
                        >
                          <div style={{ color: activeScenario3.borderColor, display: 'flex', alignItems: 'center' }}>
                            {(() => {
                              const IconComponent = activeScenario3.IconComponent;
                              return <IconComponent />;
                            })()}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ fontSize: '0.6vw', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 800, color: activeScenario3.borderColor, background: 'rgba(255,255,255,0.1)', padding: '1px 5px', borderRadius: '4px' }}>
                                SCÉNARIO SOC • {activeScenario3.timeStr}
                              </span>
                            </div>
                            <div style={{ color: '#fff', fontSize: '0.85vw', fontWeight: 700, lineHeight: 1.2 }}>
                              {activeScenario3.title}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {showSplash3 && splashScenario3 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: '-40%', x: '-50%' }}
                        animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
                        exit={{ opacity: 0, scale: 0.9, y: '-60%', x: '-50%' }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          zIndex: 30,
                          pointerEvents: 'none',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          maxWidth: '85%'
                        }}
                      >
                        <div
                          style={{
                            background: 'rgba(6, 17, 38, 0.95)',
                            backdropFilter: 'blur(20px)',
                            border: `2px solid ${splashScenario3.borderColor}`,
                            borderRadius: '16px',
                            padding: '18px 32px',
                            textAlign: 'center',
                            boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${splashScenario3.borderColor}60`,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '8px',
                              background: `${splashScenario3.borderColor}25`,
                              border: `1px solid ${splashScenario3.borderColor}60`,
                              color: splashScenario3.borderColor,
                              padding: '4px 14px',
                              borderRadius: '20px',
                              fontSize: '0.72vw',
                              fontWeight: 800,
                              textTransform: 'uppercase',
                              letterSpacing: '0.08em'
                            }}
                          >
                            <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: splashScenario3.borderColor }} />
                            SUPERVISION SOC • {splashScenario3.timeStr}
                          </div>

                          <h2 style={{ margin: 0, color: '#fff', fontSize: '1.25vw', fontWeight: 800, letterSpacing: '-0.01em', lineHeight: 1.25 }}>
                            {splashScenario3.title}
                          </h2>

                          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.82vw', fontWeight: 500 }}>
                            {splashScenario3.subtitle}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>

          {/* PHASE 3 : PLATEFORMES DÉVELOPPÉES */}
          <motion.div
            animate={{
              opacity: phase === 3 ? 1 : 0,
              y: phase === 3 ? 0 : 25,
              pointerEvents: phase === 3 ? 'auto' : 'none'
            }}
            transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              willChange: 'transform, opacity'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
              <div
                ref={containerRef4}
                className="demo-video-container"
                style={{
                  border: '1px solid #d7e5f7',
                  borderRadius: '14px',
                  background: '#fff',
                  overflow: 'hidden',
                  padding: '6px 8px',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  position: 'relative',
                  boxShadow: '0 4px 20px rgba(11, 43, 93, 0.05)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', borderBottom: '1px solid #eef3fb', paddingBottom: '3px', gap: '8px', flexWrap: 'wrap' }}>
                  <h3 style={{ margin: 0, fontSize: '0.85vw', color: '#0b2b5d', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: isPlaying4 ? '#7c3aed' : '#9ca3af' }} />
                    Démonstration des Plateformes Développées
                  </h3>

                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    {PLATFORM_SCENARIOS.map((sc) => {
                      const isActive = activeScenario4?.id === sc.id;
                      const IconComponent = sc.IconComponent;
                      return (
                        <button
                          key={sc.id}
                          onClick={() => handleSeekTo4(sc.time)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            padding: '2px 9px',
                            borderRadius: '14px',
                            border: `1.5px solid ${isActive ? sc.borderColor : '#e2e8f0'}`,
                            background: isActive ? sc.lightBg : '#f8fafc',
                            color: isActive ? sc.color : '#475569',
                            fontSize: '0.68vw',
                            fontWeight: isActive ? 700 : 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            whiteSpace: 'nowrap',
                            boxShadow: isActive ? `0 2px 8px ${sc.borderColor}25` : 'none'
                          }}
                        >
                          <IconComponent />
                          <span style={{ fontWeight: 800 }}>{sc.timeStr}</span>
                          <span>{sc.badge}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      onClick={togglePlaybackSpeed}
                      title="Appuyez sur la touche V pour basculer la vitesse (1.0x / 2.0x)"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        border: `1.5px solid ${playbackRate === 2 ? '#7c3aed' : '#cbd5e1'}`,
                        background: playbackRate === 2 ? '#7c3aed' : '#ffffff',
                        color: playbackRate === 2 ? '#ffffff' : '#0b2b5d',
                        fontSize: '0.68vw',
                        fontWeight: 800,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: playbackRate === 2 ? '0 0 10px rgba(124, 58, 237, 0.4)' : 'none'
                      }}
                    >
                      <span>{playbackRate === 2 ? '⚡ 2.0x' : '▶ 1.0x'}</span>
                      <span style={{ fontSize: '0.55vw', background: playbackRate === 2 ? 'rgba(255,255,255,0.3)' : '#e2e8f0', color: playbackRate === 2 ? '#ffffff' : '#475569', padding: '1px 4px', borderRadius: '4px' }}>
                        V
                      </span>
                    </button>
                    <span style={{ fontSize: '0.68vw', fontWeight: 600, color: '#52657d', background: '#f0f4f8', padding: '2px 8px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Icons.Clock />
                      {formatTime(currentTime4)} / {formatTime(duration4 || 0)}
                    </span>
                    <button
                      onClick={() => toggleFullscreen(containerRef4)}
                      title="Afficher en Plein Écran avec Scénarios & Animations"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: '#7c3aed',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '3px 10px',
                        fontSize: '0.68vw',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 2px 6px rgba(124, 58, 237, 0.25)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Icons.Maximize />
                      <span>Plein Écran</span>
                    </button>
                  </div>
                </div>

                <div style={{ flex: 1, position: 'relative', background: '#000', borderRadius: '10px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  {/* Floating Speed Indicator Badge inside Fullscreen Video Container */}
                  <div
                    onClick={togglePlaybackSpeed}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      zIndex: 20,
                      background: playbackRate === 2 ? 'rgba(124, 58, 237, 0.9)' : 'rgba(15, 23, 42, 0.8)',
                      backdropFilter: 'blur(8px)',
                      border: `1.5px solid ${playbackRate === 2 ? '#c4b5fd' : 'rgba(255, 255, 255, 0.25)'}`,
                      borderRadius: '16px',
                      padding: '3px 9px',
                      color: '#ffffff',
                      fontSize: '0.68vw',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>{playbackRate === 2 ? '⚡ Vitesse 2.0x' : '▶ Vitesse 1.0x'}</span>
                    <span style={{ fontSize: '0.55vw', background: 'rgba(255, 255, 255, 0.25)', padding: '1px 4px', borderRadius: '4px' }}>
                      [V]
                    </span>
                  </div>
                  <video
                    ref={videoRef4}
                    src="/Platform PFE.mp4"
                    preload="metadata"
                    controls
                    controlsList="nofullscreen noremoteplayback"
                    disablePictureInPicture
                    onTimeUpdate={() => {
                      if (videoRef4.current && Math.abs(videoRef4.current.currentTime - currentTime4) >= 0.5) {
                        setCurrentTime4(videoRef4.current.currentTime);
                      }
                    }}
                    onLoadedMetadata={() => {
                      if (videoRef4.current) setDuration4(videoRef4.current.duration);
                    }}
                    onPlay={() => setIsPlaying4(true)}
                    onPause={() => setIsPlaying4(false)}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                  />

                  <AnimatePresence>
                    {activeScenario4 && !showSplash4 && (
                      <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          left: '10px',
                          pointerEvents: 'none',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          zIndex: 10
                        }}
                      >
                        <div
                          style={{
                            background: 'rgba(11, 23, 44, 0.92)',
                            backdropFilter: 'blur(12px)',
                            border: `1.5px solid ${activeScenario4.borderColor}`,
                            borderRadius: '10px',
                            padding: '6px 14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            boxShadow: `0 8px 24px rgba(0, 0, 0, 0.4), 0 0 15px ${activeScenario4.borderColor}30`,
                            maxWidth: '80%'
                          }}
                        >
                          <div style={{ color: activeScenario4.borderColor, display: 'flex', alignItems: 'center' }}>
                            {(() => {
                              const IconComponent = activeScenario4.IconComponent;
                              return <IconComponent />;
                            })()}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ fontSize: '0.6vw', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 800, color: activeScenario4.borderColor, background: 'rgba(255,255,255,0.1)', padding: '1px 5px', borderRadius: '4px' }}>
                                SCÉNARIO PLATEFORME • {activeScenario4.timeStr}
                              </span>
                            </div>
                            <div style={{ color: '#fff', fontSize: '0.85vw', fontWeight: 700, lineHeight: 1.2 }}>
                              {activeScenario4.title}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {showSplash4 && splashScenario4 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: '-40%', x: '-50%' }}
                        animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
                        exit={{ opacity: 0, scale: 0.9, y: '-60%', x: '-50%' }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          zIndex: 30,
                          pointerEvents: 'none',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          maxWidth: '85%'
                        }}
                      >
                        <div
                          style={{
                            background: 'rgba(6, 17, 38, 0.95)',
                            backdropFilter: 'blur(20px)',
                            border: `2px solid ${splashScenario4.borderColor}`,
                            borderRadius: '16px',
                            padding: '18px 32px',
                            textAlign: 'center',
                            boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${splashScenario4.borderColor}60`,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '8px',
                              background: `${splashScenario4.borderColor}25`,
                              border: `1px solid ${splashScenario4.borderColor}60`,
                              color: splashScenario4.borderColor,
                              padding: '4px 14px',
                              borderRadius: '20px',
                              fontSize: '0.72vw',
                              fontWeight: 800,
                              textTransform: 'uppercase',
                              letterSpacing: '0.08em'
                            }}
                          >
                            <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: splashScenario4.borderColor }} />
                            PLATEFORMES DÉVELOPPÉES • {splashScenario4.timeStr}
                          </div>

                          <h2 style={{ margin: 0, color: '#fff', fontSize: '1.25vw', fontWeight: 800, letterSpacing: '-0.01em', lineHeight: 1.25 }}>
                            {splashScenario4.title}
                          </h2>

                          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.82vw', fontWeight: 500 }}>
                            {splashScenario4.subtitle}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Interactive Scroll Indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '4px', zIndex: 10 }}>
          <button
            onClick={() => {
              if (phase < 3) {
                setPhase((p) => (p + 1) as 0 | 1 | 2 | 3);
              }
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: phase < 3 ? 'pointer' : 'default',
              padding: 0
            }}
          >
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: phase === 3 ? 'rgba(16, 185, 129, 0.08)' : 'rgba(0, 0, 143, 0.05)',
                border: `1.5px solid ${phase === 3 ? 'rgba(16, 185, 129, 0.25)' : 'rgba(0, 0, 143, 0.15)'}`,
                color: phase === 3 ? '#047857' : '#00008f',
                padding: '2px 12px',
                borderRadius: '20px',
                fontSize: '0.68vw',
                fontWeight: 700
              }}
            >
              <span>
                {phase === 0 && 'Scroll vers le bas pour la Phase 2 (Validation Pentest)'}
                {phase === 1 && 'Scroll vers le bas pour la Phase 3 (Supervision SOC)'}
                {phase === 2 && 'Scroll vers le bas pour la Phase 4 (Plateformes)'}
                {phase === 3 && 'Scroll vers le bas pour la suite (Zero Trust)'}
              </span>
              <span style={{ fontSize: '0.78vw', fontWeight: 900 }}>↓</span>
            </motion.div>
          </button>
        </div>

      </div>
    </Shell>
  );
}
