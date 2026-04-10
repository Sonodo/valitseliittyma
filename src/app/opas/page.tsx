import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Oppaat — Hyödylliset oppaat puhelinliittymistä',
  description:
    'Kattavat oppaat puhelinliittymän vaihtoon, numeron siirtoon ja 5G-verkkoihin. Lue asiantuntevat oppaamme ja tee parempia valintoja.',
  alternates: { canonical: '/opas' },
};

const guides = [
  {
    title: 'Puhelinliittymän vaihto',
    description:
      'Näin vaihdat operaattoria helposti. Vaiheet, aikataulut ja vinkit sujuvaan vaihtoon.',
    href: '/opas/puhelinliittyman-vaihto',
  },
  {
    title: 'Numeron siirto',
    description:
      'Opas numeronsiirrettävyyteen: miten numeron siirto toimii, kauanko se kestää ja mitä se maksaa.',
    href: '/opas/numeron-siirto',
  },
  {
    title: '5G-opas',
    description:
      'Mitä 5G on, miten se eroaa 4G:stä, missä 5G toimii Suomessa ja kannattaako sinun vaihtaa 5G-liittymään.',
    href: '/opas/5g-opas',
  },
];

export default function OpasIndexPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <BookOpen className="mx-auto mb-4 h-10 w-10 text-cyan-600" />
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Oppaat
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Hyödylliset oppaat puhelinliittymistä, numeron siirrosta ja
            mobiiliverkoista.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-cyan-200 hover:shadow-md"
            >
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-cyan-700">
                {guide.title}
              </h2>
              <p className="mt-2 text-sm text-slate-600">{guide.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cyan-600 group-hover:text-cyan-700">
                Lue opas <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
          <h2 className="text-xl font-bold text-slate-900">
            Etsitkö edullisinta liittymää?
          </h2>
          <p className="mt-2 text-slate-600">
            Vertaa kaikkia puhelinliittymiä ja löydä sinulle sopiva vaihtoehto.
          </p>
          <Link
            href="/puhelinliittymat"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-700"
          >
            Vertaa puhelinliittymiä
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
