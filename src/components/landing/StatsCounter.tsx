'use client';

import CountUp from 'react-countup';
import { ScrollReveal } from './ScrollReveal';

export interface StatItem {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

interface StatsCounterProps {
  stats: StatItem[];
}

export function StatsCounter({ stats }: StatsCounterProps) {
  return (
    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
      {stats.map((stat, i) => (
        <ScrollReveal key={i} delay={i * 0.15} direction="up">
          <div className="text-center">
            <CountUp
              end={stat.end}
              prefix={stat.prefix}
              suffix={stat.suffix}
              duration={2.5}
              enableScrollSpy
              scrollSpyOnce
              scrollSpyDelay={i * 200}
            >
              {({ countUpRef }) => (
                <span
                  ref={countUpRef}
                  className="text-4xl font-extrabold text-accent-400 sm:text-5xl"
                />
              )}
            </CountUp>
            <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-slate-400">
              {stat.label}
            </p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
