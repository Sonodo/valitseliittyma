import Link from 'next/link';
import type { MethodologyConfig } from './types';

/**
 * MethodologyPage — server component rendering a complete /menetelma page.
 *
 * Accepts a site-specific MethodologyConfig and produces a scannable,
 * prose-heavy methodology page covering: summary, data sources, ranking
 * weights, site-wide affiliate disclosure, inline changelog, contact.
 *
 * No external repo/changelog links. No named contact person. No per-card
 * "Mainos" labels — disclosure is site-wide here.
 */
export default function MethodologyPage({ config }: { config: MethodologyConfig }) {
  const {
    siteName,
    siteUrl,
    summary,
    dataSources,
    weights,
    disclosure,
    changelog,
    contact,
    lastReviewedAt,
  } = config;

  const totalWeight = weights.reduce((sum, w) => sum + w.weight, 0);

  return (
    <article className="bg-background">
      {/* ─── Hero ─── */}
      <header className="bg-navy text-white">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent-400">
            {siteName}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Miten teemme rankingit
          </h1>
          <p className="mt-4 text-base text-white/70 sm:text-lg">
            Avoin kuvaus datalähteistä, painokertoimista ja kaupallisista suhteista.
            {lastReviewedAt && (
              <>
                {' '}
                <span className="text-white/50">
                  Viimeksi tarkistettu {formatDateFi(lastReviewedAt)}.
                </span>
              </>
            )}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* ─── 2. Yhteenveto ─── */}
        <Section id="yhteenveto" title="Yhteenveto">
          {summary.map((p, i) => (
            <p key={i} className="mt-4 text-base text-slate-700 sm:text-lg">
              {p}
            </p>
          ))}
        </Section>

        {/* ─── 3. Datalähteet ─── */}
        <Section id="datalahteet" title="Datalähteet">
          <p className="mt-4 text-base text-slate-700">
            Käytämme ensisijaisesti viranomais- ja toimialalähteitä. Alla on
            kaikki rankingiin vaikuttavat lähteet, niiden tyyppi ja
            päivitystiheys.
          </p>
          <ul className="mt-6 divide-y divide-slate-200 rounded-2xl bg-white ring-1 ring-slate-200/60">
            {dataSources.map((src) => (
              <li key={src.name} className="px-5 py-4 sm:px-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div className="flex-1">
                    <p className="text-base font-semibold text-slate-900">
                      {src.url ? (
                        <a
                          href={src.url}
                          className="hover:text-accent-700 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {src.name}
                        </a>
                      ) : (
                        src.name
                      )}
                    </p>
                    {src.description && (
                      <p className="mt-1 text-sm text-slate-600">{src.description}</p>
                    )}
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2 sm:ml-4">
                    <Tag>{src.type}</Tag>
                    <Tag tone="muted">Päivitys: {src.refreshCadence}</Tag>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        {/* ─── 4. Painokertoimet ─── */}
        <Section id="painokertoimet" title="Rankingin painokertoimet">
          <p className="mt-4 text-base text-slate-700">
            Lopullinen pisteytys on painotettu yhdistelmä alla olevista
            tekijöistä. Painot summautuvat sataan prosenttiin. Pyrimme
            mahdollisimman objektiiviseen ja toistettavaan laskentaan — kaava ja
            painot dokumentoidaan tällä sivulla.
          </p>
          <div className="mt-6 overflow-hidden rounded-2xl ring-1 ring-slate-200/60">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold sm:px-6">
                    Tekijä
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold sm:px-6">
                    Kuvaus
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-right font-semibold sm:px-6"
                  >
                    Paino
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {weights.map((w) => (
                  <tr key={w.factor}>
                    <th
                      scope="row"
                      className="px-4 py-4 font-semibold text-slate-900 sm:px-6"
                    >
                      {w.factor}
                    </th>
                    <td className="px-4 py-4 text-slate-600 sm:px-6">
                      {w.description}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-right font-mono text-slate-900 sm:px-6">
                      {w.weight} %
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50">
                <tr>
                  <th
                    scope="row"
                    colSpan={2}
                    className="px-4 py-3 text-right text-sm font-semibold text-slate-700 sm:px-6"
                  >
                    Yhteensä
                  </th>
                  <td className="whitespace-nowrap px-4 py-3 text-right font-mono text-sm font-semibold text-slate-900 sm:px-6">
                    {totalWeight} %
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          {totalWeight !== 100 && (
            <p className="mt-3 text-xs text-amber-700" role="note">
              Huom: painojen summa ei ole 100 %. Tämä on tarkoituksellinen
              välitulos, joka päivitetään lopulliseen julkaisuun.
            </p>
          )}
        </Section>

        {/* ─── 5. Kaupalliset suhteet ─── */}
        <Section id="kaupalliset-suhteet" title="Kaupalliset suhteet">
          <p className="mt-4 text-base text-slate-700">{disclosure.intro}</p>
          {disclosure.howItWorks && (
            <>
              <h3 className="mt-6 text-lg font-semibold text-slate-900">
                Miten yhteistyö toimii
              </h3>
              <p className="mt-2 text-base text-slate-700">{disclosure.howItWorks}</p>
            </>
          )}
          <h3 className="mt-6 text-lg font-semibold text-slate-900">
            Miten varmistamme puolueettomuuden
          </h3>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-base text-slate-700 marker:text-accent">
            {disclosure.safeguards.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-slate-600">
            Vertailupalvelumme noudattaa{' '}
            <a
              href="https://www.kkv.fi/kuluttaja-asiat/markkinointi-ja-mainonta/mainonnan-tunnistettavuus/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-700 underline hover:text-accent-800"
            >
              Kilpailu- ja kuluttajaviraston (KKV) ohjeita mainonnan
              tunnistettavuudesta
            </a>
            . Kaupallisia linkkejä merkitään teknisesti{' '}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">
              rel=&quot;sponsored&quot;
            </code>{' '}
            -attribuutilla, eivätkä yhteistyöt vaikuta yksittäisten tarjoajien
            sijoitukseen vertailussa.
          </p>
        </Section>

        {/* ─── 6. Päivityshistoria ─── */}
        <Section id="paivityshistoria" title="Päivityshistoria">
          <p className="mt-4 text-base text-slate-700">
            Listaamme tällä sivulla menetelmään ja datalähteisiin tehdyt
            muutokset päivätyssä järjestyksessä. Uusin merkintä ensin.
          </p>
          <ol className="mt-6 space-y-5 border-l-2 border-slate-200 pl-5">
            {changelog.map((entry, i) => (
              <li key={`${entry.date}-${i}`} className="relative">
                <span
                  className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full bg-accent ring-4 ring-background"
                  aria-hidden="true"
                />
                <p className="text-sm font-mono font-semibold text-slate-500">
                  {formatDateFi(entry.date)}
                </p>
                <p className="mt-1 text-base font-semibold text-slate-900">
                  {entry.title}
                </p>
                <p className="mt-1 text-sm text-slate-700">{entry.summary}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* ─── 7. Ota yhteyttä ─── */}
        <Section id="ota-yhteytta" title="Ota yhteyttä">
          <p className="mt-4 text-base text-slate-700">
            Löysitkö virheen, haluat ehdottaa uutta datalähdettä tai
            kyseenalaistaa painokertoimen? Otamme palautteen vakavasti.
          </p>
          <div className="mt-6">
            <Link
              href={contact.href}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-600 hover:shadow-accent/30 active:scale-[0.98]"
            >
              {contact.label}
            </Link>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Palvelun tuottaa {siteName} ({siteUrl.replace(/^https?:\/\//, '')}).
            Vastaamme arkipäivisin.
          </p>
        </Section>
      </div>
    </article>
  );
}

/* ─── Internal helpers ─── */

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-12 scroll-mt-24 first:mt-0">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Tag({
  children,
  tone = 'accent',
}: {
  children: React.ReactNode;
  tone?: 'accent' | 'muted';
}) {
  const toneClasses =
    tone === 'accent'
      ? 'bg-accent-50 text-accent-800 ring-accent-200'
      : 'bg-slate-100 text-slate-700 ring-slate-200';
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${toneClasses}`}
    >
      {children}
    </span>
  );
}

function formatDateFi(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat('fi-FI', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  }).format(d);
}