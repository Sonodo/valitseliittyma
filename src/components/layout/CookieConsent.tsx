'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const CONSENT_KEY = 'cookie_consent';

type ConsentState = 'pending' | 'granted' | 'denied';

function getStoredConsent(): ConsentState {
  if (typeof window === 'undefined') return 'pending';
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === 'granted' || stored === 'denied') return stored;
  return 'pending';
}

function updateGtagConsent(granted: boolean) {
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (!gtag) return;
  const state = granted ? 'granted' : 'denied';
  gtag('consent', 'update', {
    analytics_storage: state,
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
  });
}

function updateClarityConsent(granted: boolean, retries = 5) {
  const clarity = (window as unknown as { clarity?: (...args: unknown[]) => void }).clarity;
  if (!clarity) {
    if (retries > 0) setTimeout(() => updateClarityConsent(granted, retries - 1), 200);
    return;
  }
  clarity('consentv2', {
    analytics_storage: granted ? 'granted' : 'denied',
    ad_storage: 'denied',
  });
}

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>('pending');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = getStoredConsent();
    setConsent(stored);

    if (stored === 'granted') {
      updateGtagConsent(true);
      updateClarityConsent(true);
    } else if (stored === 'denied') {
      updateGtagConsent(false);
      updateClarityConsent(false);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'granted');
    setConsent('granted');
    updateGtagConsent(true);
    updateClarityConsent(true);
  };

  const reject = () => {
    localStorage.setItem(CONSENT_KEY, 'denied');
    setConsent('denied');
    updateGtagConsent(false);
    updateClarityConsent(false);
  };

  if (!mounted || consent !== 'pending') return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white p-4 shadow-lg sm:p-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-sm text-slate-600">
          Käytämme evästeitä parantaaksemme palvelua.{' '}
          <Link href="/tietosuoja" className="text-accent underline hover:text-accent-600">
            Lue lisää
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={reject}
            className="rounded-lg border border-slate-300 bg-white px-6 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 min-h-[44px]"
          >
            Hylkää
          </button>
          <button
            onClick={accept}
            className="rounded-lg bg-accent px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-600 min-h-[44px]"
          >
            Hyväksy
          </button>
        </div>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
