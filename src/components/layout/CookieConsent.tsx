'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

function updateClarityConsent(granted: boolean) {
  const w = window as unknown as { clarity?: (...args: unknown[]) => void };
  if (!w.clarity) return;
  w.clarity('consentv2', {
    analytics_storage: granted ? 'granted' : 'denied',
    ad_storage: 'denied',
  });
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('analytics_consent');
    if (!consent) {
      setVisible(true);
    } else if (consent === 'granted' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
      });
    }
  }, []);

  const accept = () => {
    localStorage.setItem('analytics_consent', 'granted');
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
      });
    }
    updateClarityConsent(true);
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem('analytics_consent', 'denied');
    updateClarityConsent(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white p-4 shadow-lg sm:p-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-sm text-slate-600">
          Käytämme evästeitä parantaaksemme palvelua.{' '}
          <Link href="/tietosuoja" className="text-cyan-600 underline hover:text-cyan-700">
            Lue lisää
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={reject}
            className="rounded-lg border border-slate-300 bg-white px-6 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Hylkää
          </button>
          <button
            onClick={accept}
            className="rounded-lg bg-cyan-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-cyan-700"
          >
            Hyväksy
          </button>
        </div>
      </div>
    </div>
  );
}
