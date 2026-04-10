'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Smartphone, Menu, X } from 'lucide-react';
import { NAVIGATION } from '@/lib/constants';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" aria-label="Valitse Liittymä — Etusivu">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-600">
            <Smartphone className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-slate-900">
            Valitse<span className="text-cyan-600"> Puhelin</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAVIGATION.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA button */}
        <div className="hidden lg:block">
          <Link
            href="/puhelinliittymat"
            className="rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cyan-700"
          >
            Vertaa liittymiä
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Sulje valikko' : 'Avaa valikko'}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="space-y-1 px-4 py-3">
            {NAVIGATION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-3 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/puhelinliittymat"
              className="mt-2 block rounded-lg bg-cyan-600 px-3 py-2.5 text-center text-base font-semibold text-white"
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
