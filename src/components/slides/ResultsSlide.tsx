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
      <div className="impact-layout">
        {cards.map(([title, metric, sub, list, Icon], i) => (
          <motion.div className="impact-card" key={title} custom={i} initial="hidden" animate="visible" variants={popIn}>
            <Icon size={38}/>
            <h3>{title}</h3>
            <strong>{metric}</strong>
            <em>{sub}</em>
            {list.map((x: string) => (
              <p key={x} style={{ margin: '6px 0', fontSize: '0.85vw', display: 'flex', gap: '6px', alignItems: 'start' }}>
                <CheckCircle2 size={14} style={{ flexShrink: 0, marginTop: '2px', color: '#0b5cab' }}/> {x}
              </p>
            ))}
          </motion.div>
        ))}
      </div>
      <motion.div className="impact-bottom emsi-thanks" custom={4} initial="hidden" animate="visible" variants={fadeUp} style={{ marginTop: '1.5vw' }}>
        <Trophy/> Un grand merci à l’EMSI, à l&apos;équipe AXA GBS ainsi qu&apos;aux membres du jury pour leur encadrement et leur attention.
      </motion.div>
    </Shell>
  );
}
