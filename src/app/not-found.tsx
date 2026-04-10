import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
      <h1 className="text-6xl font-extrabold text-slate-900">404</h1>
      <p className="mt-4 text-xl text-slate-600">Sivua ei löytynyt</p>
      <p className="mt-2 text-slate-500">
        Etsimääsi sivua ei ole olemassa tai se on siirretty.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-cyan-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-700"
      >
        Palaa etusivulle
      </Link>
      <div className="mt-8 text-center">
        <p className="mb-3 text-sm font-medium text-slate-700">Tai kokeile näitä:</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/puhelinliittymat" className="text-sm text-cyan-600 hover:text-cyan-700 hover:underline">
            Puhelinliittymät
          </Link>
          <Link href="/laajakaista" className="text-sm text-cyan-600 hover:text-cyan-700 hover:underline">
            Laajakaista
          </Link>
          <Link href="/operaattorit" className="text-sm text-cyan-600 hover:text-cyan-700 hover:underline">
            Operaattorit
          </Link>
          <Link href="/blogi" className="text-sm text-cyan-600 hover:text-cyan-700 hover:underline">
            Blogi
          </Link>
        </div>
      </div>
    </div>
  );
}
