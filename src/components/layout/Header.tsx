'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Smartphone, Menu, X } from 'lucide-react';
import { NAVIGATION } from '@/lib/constants';
import { UserMenu } from '@/components/auth/UserMenu';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy/95 backdrop-blur-md border-b border-white/10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5" aria-label="Valitse Liittymä — Etusivu">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-600">
            <Smartphone className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">
            Valitse<span className="text-accent-400"> Liittymä</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAVIGATION.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA button + User menu */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <Link
              href="/puhelinliittymat"
              className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600 min-h-[44px] inline-flex items-center"
            >
              Vertaa liittymiä
            </Link>
          </div>
          <UserMenu />

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden rounded-lg p-2 text-slate-300 hover:bg-white/10 min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Sulje valikko' : 'Avaa valikko'}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu — slide-out dark panel */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-navy lg:hidden">
          <div className="space-y-1 px-4 py-3">
            {NAVIGATION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-3 py-2.5 text-base font-medium text-slate-300 hover:bg-white/10 hover:text-white min-h-[44px] flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/puhelinliittymat"
              className="mt-2 block rounded-lg bg-accent px-3 py-2.5 text-center text-base font-semibold text-white hover:bg-accent-600 min-h-[44px]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Vertaa liittymiä
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
