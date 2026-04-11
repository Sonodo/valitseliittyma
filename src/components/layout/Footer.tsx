import Link from 'next/link';
import { Smartphone } from 'lucide-react';
import { VALITSE_SITES, EMPIRE_SITES } from '@/lib/constants';

const footerSections = {
  palvelut: {
    title: 'Palvelut',
    links: [
      { label: 'Puhelinliittymät', href: '/puhelinliittymat' },
      { label: 'Laajakaista', href: '/laajakaista' },
      { label: 'Operaattorit', href: '/operaattorit' },
      { label: 'Vertaa liittymiä', href: '/vertaa' },
      { label: 'Liittymälaskuri', href: '/laskuri/liittymahinta' },
      { label: 'Datankulutuslaskuri', href: '/laskuri/datankulutus' },
    ],
  },
  operaattorit: {
    title: 'Operaattorit',
    links: [
      { label: 'Elisa', href: '/operaattorit/elisa' },
      { label: 'DNA', href: '/operaattorit/dna' },
      { label: 'Telia', href: '/operaattorit/telia' },
      { label: 'Moi Mobiili', href: '/operaattorit/moi' },
      { label: 'Giga Mobiili', href: '/operaattorit/giga' },
      { label: 'Oomi Mobiili', href: '/operaattorit/oomi' },
    ],
  },
  tietoa: {
    title: 'Tietoa',
    links: [
      { label: 'Oppaat', href: '/opas' },
      { label: 'Artikkelit', href: '/blogi' },
      { label: 'Tietoa palvelusta', href: '/tietoa' },
      { label: 'Tietosuoja', href: '/tietosuoja' },
      { label: 'Käyttöehdot', href: '/kayttoehdot' },
    ],
  },
};

export default function Footer() {
  return (
    <footer className="bg-navy" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Valitse Liittymä — Etusivu">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-600">
                <Smartphone className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Valitse<span className="text-accent-400"> Liittymä</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Monipuolinen puhelinliittymien ja laajakaistojen vertailupalvelu.
              Ilmainen ja kattava.
            </p>
          </div>

          {/* Link columns */}
          {Object.values(footerSections).map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-white">{section.title}</h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-accent-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Valitse network cross-links */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="mb-4 text-xs font-medium uppercase tracking-wider text-slate-500">
            Valitse-verkosto
          </p>
          <div className="flex flex-wrap gap-3">
            {VALITSE_SITES.map((site) => (
              <a
                key={site.url}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-400 transition-colors hover:border-accent/30 hover:text-accent-300"
              >
                {site.name}
              </a>
            ))}
          </div>
        </div>

        {/* Other empire links */}
        <div className="mt-6">
          <p className="mb-4 text-xs font-medium uppercase tracking-wider text-slate-500">
            Muut palvelumme
          </p>
          <div className="flex flex-wrap gap-3">
            {EMPIRE_SITES.map((site) => (
              <a
                key={site.url}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-400 transition-colors hover:text-accent-300"
              >
                {site.name}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center gap-4 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Valitse Liittymä. Kaikki oikeudet pidätetaan.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <Link href="/tietosuoja" className="hover:text-slate-300 transition-colors">Tietosuoja</Link>
            <Link href="/kayttoehdot" className="hover:text-slate-300 transition-colors">Käyttöehdot</Link>
            <Link href="/tietoa" className="hover:text-slate-300 transition-colors">Tietoa</Link>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-slate-600">
          Palvelu on käyttäjille ilmainen. Saatamme saada korvauksen, jos siirryt palvelumme kautta operaattorin sivuille.
        </p>
      </div>
    </footer>
  );
}
