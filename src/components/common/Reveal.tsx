import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Seconds to wait before this element animates in. */
  delay?: number;
  className?: string;
  /** Distance in px the element travels upward. */
  distance?: number;
  as?: 'div' | 'li' | 'article' | 'section' | 'header';
}

/**
 * Single scroll-reveal primitive used across every section, so timing and
 * easing stay identical site-wide instead of being re-invented per component.
 * Collapses to a plain fade when the user prefers reduced motion.
 */
export const Reveal = ({
  children,
  delay = 0,
  className,
  distance = 24,
  as = 'div',
}: RevealProps) => {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: prefersReducedMotion ? 0.2 : 0.7,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
};
