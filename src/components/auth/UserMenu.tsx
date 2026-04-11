'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Script from 'next/script';
import { LogIn, LogOut, User, ChevronDown } from 'lucide-react';

interface UserInfo {
  id: string;
  email: string;
  name: string | null;
  picture: string | null;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: Record<string, unknown>) => void;
          renderButton: (element: HTMLElement, config: Record<string, unknown>) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export function UserMenu() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showGoogleButton, setShowGoogleButton] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const googleButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
        setShowGoogleButton(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleCredentialResponse = useCallback(async (response: { credential: string }) => {
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.credential }),
      });
      const data = await res.json();
      if (data.user) {
        setUser(data.user);
        setShowGoogleButton(false);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  }, []);

  const initializeGoogle = useCallback(() => {
    if (window.google && !user) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        auto_select: false,
        itp_support: true,
      });
    }
  }, [handleCredentialResponse, user]);

  useEffect(() => {
    if (showGoogleButton && googleButtonRef.current && window.google) {
      window.google.accounts.id.renderButton(googleButtonRef.current, {
        type: 'standard',
        shape: 'rectangular',
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
        locale: 'fi',
        width: 250,
      });
    }
  }, [showGoogleButton]);

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    setDropdownOpen(false);
  }

  if (loading) {
    return <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />;
  }

  if (user) {
    return (
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 rounded-full p-1 hover:bg-white/10 transition-colors"
          aria-expanded={dropdownOpen}
        >
          {user.picture ? (
            <img
              src={user.picture}
              alt=""
              className="w-8 h-8 rounded-full"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
              <User className="w-4 h-4 text-accent-300" />
            </div>
          )}
          <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:block" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
            <div className="px-4 py-2 border-b border-slate-100">
              <p className="text-sm font-medium text-slate-900 truncate">{user.name}</p>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-colors min-h-[44px]"
            >
              <LogOut className="w-4 h-4" />
              Kirjaudu ulos
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className="relative">
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="lazyOnload"
        onLoad={initializeGoogle}
      />
      <button
        onClick={() => setShowGoogleButton(!showGoogleButton)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors min-h-[44px]"
      >
        <LogIn className="w-4 h-4" />
        <span className="hidden sm:inline">Kirjaudu</span>
      </button>

      {showGoogleButton && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-slate-200 p-4 z-50">
          <p className="text-xs text-slate-500 mb-3">Kirjaudu Valitse-tilillä</p>
          <div ref={googleButtonRef} />
        </div>
      )}
    </div>
  );
}
