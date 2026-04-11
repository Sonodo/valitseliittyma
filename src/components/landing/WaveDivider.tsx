'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface WaveDividerProps {
  color?: string;
  flip?: boolean;
  className?: string;
}

export function WaveDivider({ color = '#F8FAFC', flip = false, className = '' }: WaveDividerProps) {
  const prefersReducedMotion = useReducedMotion();

  const staticPath = 'M0,40 C240,100 480,0 720,50 C960,100 1200,20 1440,60 L1440,120 L0,120 Z';
  const staticPath2 = 'M0,60 C240,20 480,80 720,30 C960,80 1200,40 1440,70 L1440,120 L0,120 Z';

  return (
    <div className={`relative w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''} ${className}`}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="relative block w-full h-[60px] sm:h-[80px] lg:h-[100px]"
      >
        {prefersReducedMotion ? (
          <>
            <path fill={color} d={staticPath} />
            <path fill={color} opacity={0.5} d={staticPath2} />
          </>
        ) : (
          <>
            <motion.path
              fill={color}
              initial={{ d: staticPath }}
              animate={{
                d: [
                  'M0,40 C240,100 480,0 720,50 C960,100 1200,20 1440,60 L1440,120 L0,120 Z',
                  'M0,60 C240,20 480,100 720,40 C960,0 1200,80 1440,40 L1440,120 L0,120 Z',
                  'M0,50 C240,80 480,20 720,70 C960,30 1200,90 1440,50 L1440,120 L0,120 Z',
                  'M0,40 C240,100 480,0 720,50 C960,100 1200,20 1440,60 L1440,120 L0,120 Z',
                ],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.path
              fill={color}
              opacity={0.5}
              initial={{ d: staticPath2 }}
              animate={{
                d: [
                  'M0,60 C240,20 480,80 720,30 C960,80 1200,40 1440,70 L1440,120 L0,120 Z',
                  'M0,30 C240,70 480,10 720,60 C960,20 1200,70 1440,30 L1440,120 L0,120 Z',
                  'M0,50 C240,40 480,60 720,20 C960,70 1200,30 1440,60 L1440,120 L0,120 Z',
                  'M0,60 C240,20 480,80 720,30 C960,80 1200,40 1440,70 L1440,120 L0,120 Z',
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </>
        )}
      </svg>
    </div>
  );
}
