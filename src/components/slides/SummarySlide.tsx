import { Building2, AlertTriangle, Target, Network, Code2, CheckCircle2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Shell, popIn } from '../Presentation';
import type { SlideProps } from '../Presentation';

type PlanItem = [string, string, string, LucideIcon, string];

export default function SummarySlide({ n }: SlideProps) {
  const items: PlanItem[] = [
    ['01', 'Contexte & Enjeux', 'Présentation AXA GBS & fondements de la DLP', Building2, 'blue'],
    ['02', 'Problématique & Objectifs', 'Défis de fuite de données et objectifs clés du projet', AlertTriangle, 'orange'],
    ['03', 'Méthodologie & Démarche', 'Cadrage projet et méthodologie d\'ingénierie', Target, 'purple'],
    ['04', 'Conception & Architecture', 'Architecture DLP Hybride (Sondes Windows & API Flask)', Network, 'green'],
    ['05', 'Réalisation & Démonstration', 'Mise en œuvre technique, supervision SOC & démo', Code2, 'cyan'],
    ['06', 'Conclusion & Perspectives', 'Bilan Zero Trust, perspectives d\'évolution & remerciements', CheckCircle2, 'navy'],
  ];
  return (
    <Shell section="SOMMAIRE" title="Plan de la soutenance" n={n}>
      <div className="agenda-list agenda-rich agenda-colorful">
        {items.map(([num, label, desc, Icon, color], i) => (
          <motion.div className={`agenda-row ${color}`} key={label} custom={i} initial="hidden" animate="visible" variants={popIn}>
            <strong>{num}</strong>
            <span>{label}<em>{desc}</em></span>
            <Icon size={28}/>
          </motion.div>
        ))}
      </div>
    </Shell>
  );
}
