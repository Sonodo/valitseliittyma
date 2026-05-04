'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { DISCLOSURE_COPY } from './copy';

const STORAGE_KEY = 'disclosure_bar_dismissed';

interface SiteDisclosureBarProps {
  /** Where the "näin ansaitsemme rahaa" link points. Default /luotettavuus. */
  href?: string;
}

/**
 * Slim site-wide strip shown above hero on /vertailu pages.
 * One line, dismissible per session (sessionStorage).
 */
export function SiteDisclosureBar({ href = '/luotettavuus' }: SiteDisclosureBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem(STORAGE_KEY);
      if (!dismissed) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  function dismiss() {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* noop */
    }
    setVisible(false);
  }

  return (
    <div className="border-b border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-[13px] text-slate-600 sm:px-6 lg:px-8">
        <p className="leading-snug">
          {DISCLOSURE_COPY.barText} —{' '}
          <Link href={href} className="font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-700">
            {DISCLOSURE_COPY.barLinkText} →
          </Link>
        </p>
        <button
          type="button"
          aria-label="Sulje ilmoitus"
          onClick={dismiss}
          className="shrink-0 rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
