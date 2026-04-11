'use client';

import { motion } from 'framer-motion';

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3';
}

export function AnimatedHeading({ text, className = '', delay = 0, as: Tag = 'h1' }: AnimatedHeadingProps) {
  const words = text.split(' ');
  const MotionTag = motion.create(Tag);

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          variants={{
            hidden: { opacity: 0, x: 30 },
            visible: {
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.6,
                delay: delay + i * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </MotionTag>
  );
}
