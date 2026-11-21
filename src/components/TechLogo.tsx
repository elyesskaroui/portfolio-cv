import {
  ArrowLeftRight,
  Boxes,
  BrainCircuit,
  Cpu,
  Gauge,
  MessageSquareText,
  ScanSearch,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import type { ConceptIcon, SkillElement } from '@/data/content';

/** Thin line icons for concepts that have no official brand mark. */
const CONCEPT: Record<ConceptIcon, LucideIcon> = {
  bloc: Boxes,
  getx: Gauge,
  websocket: ArrowLeftRight,
  scraping: ScanSearch,
  iot: Cpu,
  groq: Zap,
  ml: BrainCircuit,
  prompt: MessageSquareText,
};

/**
 * Official logo (self-hosted SVG from public/logos) or, for concepts, a line
 * icon in the same ink as the text. Purely decorative: the name is always
 * rendered next to it.
 */
export const TechLogo = ({ element, size }: { element: SkillElement; size: number }) => {
  if (element.logo) {
    return (
      <img
        src={element.logo}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        draggable={false}
        className="block select-none object-contain"
        style={{ width: size, height: size }}
      />
    );
  }
  const Icon = CONCEPT[element.icon ?? 'iot'];
  return <Icon size={size} strokeWidth={1.4} aria-hidden="true" className="text-foreground" />;
};
