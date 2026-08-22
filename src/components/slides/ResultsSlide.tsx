import { Globe, Brain, Sliders, CheckCircle2, Trophy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Shell, fadeUp, popIn } from '../Presentation';
import type { SlideProps } from '../Presentation';

type CardItem = [string, string, string, string[], LucideIcon];

export default function ResultsSlide({ n }: SlideProps) {
  const cards: CardItem[] = [
    [
      'DLP au niveau Proxy',
      'Inspection réseau',
      'Modèle inspiré de Skyhigh',
      [
        'Inspection des flux Web en temps réel',
        'Détection des données sensibles avant leur sortie',
        'Blocage ou alerte selon la politique DLP',
      ],
      Globe,
    ],
    [
      'Analyse Comportementale',
      'Détection intelligente',
      'Analyse des activités utilisateurs',
      [
        'Détection des comportements inhabituels',
        'Profilage progressif des utilisateurs',
        'Calcul d’un score de risque contextuel',
      ],
      Brain,
    ],
    [
      'Plateforme DLP Centrale',
      'Détection & Monitoring',
      'Gestion unifiée des règles',
      [
        'Centralisation des alertes et des événements',
        'Supervision en temps réel',
        'Suivi et gestion des règles DLP',
      ],
      Sliders,
    ],
  ];
  return (
    <Shell section="PERSPECTIVES" title="Perspectives d'évolution" n={n}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', padding: '0.5vw 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.4vw', width: '100%', alignItems: 'stretch' }}>
          {cards.map(([title, metric, sub, list, Icon], i) => (
            <motion.div className="impact-card" key={title} custom={i} initial="hidden" animate="visible" variants={popIn} style={{ height: 'auto', minHeight: '26vw' }}>
              <Icon size={38}/>
              <h3>{title}</h3>
              <strong>{metric}</strong>
              <em>{sub}</em>
              {list.map((x: string) => (
                <p key={x} style={{ margin: '6px 0', fontSize: '0.82vw', display: 'flex', gap: '6px', alignItems: 'start' }}>
                  <CheckCircle2 size={14} style={{ flexShrink: 0, marginTop: '2px', color: '#0b5cab' }}/> {x}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </Shell>
  );
}
