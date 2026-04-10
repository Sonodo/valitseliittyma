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
  oppaat: {
    title: 'Oppaat',
    links: [
      { label: 'Liittymän vaihto', href: '/opas/puhelinliittyman-vaihto' },
      { label: 'Numeron siirto', href: '/opas/numeron-siirto' },
      { label: '5G-opas', href: '/opas/5g-opas' },
      { label: 'Halvin liittymä', href: '/halvin-puhelinliittyma' },
      { label: 'Paras 5G', href: '/paras-5g-liittyma' },
      { label: 'Blogi', href: '/blogi' },
    ],
  },
  tietoa: {
    title: 'Tietoa',
    links: [
      { label: 'Tietoa palvelusta', href: '/tietoa' },
      { label: 'Tietosuoja', href: '/tietosuoja' },
      { label: 'Käyttöehdot', href: '/kayttoehdot' },
    ],
  },
};

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2" aria-label="Valitse Liittymä — Etusivu">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-600">
                <Smartphone className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Valitse<span className="text-cyan-400"> Puhelin</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Monipuolinen puhelinliittymien ja laajakaistojen vertailupalvelu.
              Ilmainen ja puolueeton.
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
                      className="text-sm text-slate-400 transition-colors hover:text-white"
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
        <div className="mt-12 border-t border-slate-800 pt-8">
          <p className="mb-4 text-xs font-medium uppercase tracking-wider text-slate-500">
            Valitse-verkosto
          </p>
          <div className="flex flex-wrap gap-4">
            {VALITSE_SITES.map((site) => (
              <a
                key={site.url}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-400 transition-colors hover:text-cyan-400"
              >
                {site.name} — {site.description}
              </a>
            ))}
          </div>
        </div>

        {/* Other empire links */}
        <div className="mt-6">
          <p className="mb-4 text-xs font-medium uppercase tracking-wider text-slate-500">
            Muut palvelumme
          </p>
          <div className="flex flex-wrap gap-4">
            {EMPIRE_SITES.map((site) => (
              <a
                key={site.url}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-400 transition-colors hover:text-cyan-400"
              >
                {site.name}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-slate-800 pt-8">
          <p className="text-center text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Valitse Liittymä. Kaikki oikeudet pidätetään.
            Palvelu on käyttäjille ilmainen. Saatamme saada korvauksen, jos siirryt palvelumme kautta operaattorin sivuille.
          </p>
        </div>
      </div>
    </footer>
  );
}
