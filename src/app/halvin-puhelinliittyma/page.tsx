import type { Metadata } from 'next';
import Link from 'next/link';
import { mobilePlans, getCheapestPlans } from '@/data/mobile-plans';
import { operators } from '@/data/operators';
import { MobilePlanCard } from '@/components/ui/PlanCard';
import MethodologyBox from '@/components/ui/MethodologyBox';

export const metadata: Metadata = {
  title: 'Halvin puhelinliittymä 2026 — Edullisimmat liittymät vertailussa',
  description:
    'Löydä Suomen halvin puhelinliittymä. Vertailussa budjettioperaattorit Moi, Giga, Oomi ja isojen operaattoreiden edullisimmat liittymät.',
  alternates: { canonical: '/halvin-puhelinliittyma' },
};

export default function HalvinPuhelinliittymaPage() {
  // "Top 3 halvinta" now means: cheapest ≥5 Gt, cheapest ≥10 Gt, cheapest rajaton —
  // not three Globetel data-less plans. Fallback to overall cheapest if a tier is empty.
  const sortedByPrice = [...mobilePlans].sort((a, b) => a.monthlyPrice - b.monthlyPrice);
  const cheapestSmall =
    sortedByPrice.find(
      (p) => typeof p.dataAmount === 'number' && p.dataAmount >= 5 && p.dataAmount < 10,
    ) ??
    sortedByPrice.find((p) => typeof p.dataAmount === 'number' && p.dataAmount >= 5);
  const cheapestMedium = sortedByPrice.find(
    (p) => typeof p.dataAmount === 'number' && p.dataAmount >= 10,
  );
  const cheapestUnlimited = sortedByPrice.find((p) => p.dataAmount === 'unlimited');
  const top3 = [cheapestSmall, cheapestMedium, cheapestUnlimited]
    .filter((p): p is (typeof mobilePlans)[number] => Boolean(p))
    // De-duplicate in case the same plan fills two slots
    .filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i);
  // Ensure we show at least 3 cards
  while (top3.length < 3 && top3.length < sortedByPrice.length) {
    const next = sortedByPrice.find((p) => !top3.some((x) => x.id === p.id));
    if (!next) break;
    top3.push(next);
  }

  // Keep the legacy absolute-cheapest list for context under the guide
  void getCheapestPlans;

  const budgetPlans = mobilePlans
    .filter((p) => p.monthlyPrice < 15)
    .sort((a, b) => a.monthlyPrice - b.monthlyPrice);
  const unlimitedCheap = mobilePlans
    .filter((p) => p.dataAmount === 'unlimited')
    .sort((a, b) => a.monthlyPrice - b.monthlyPrice)
    .slice(0, 5);

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Halvin puhelinliittymä 2026
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Vertailemme puolestasi Suomen edullisimmat puhelinliittymät. Useimmissa vertailun
            liittymissä on rajaton puhe ja viestit Suomeen — erona on datamäärä, nopeus ja hinta.
          </p>
        </div>

        <MethodologyBox
          superlative="halvin"
          operatorCount={operators.length}
          planCount={mobilePlans.length}
          methodology="Liittymät on järjestetty perushinnan (€/kk ilman kampanja-alennuksia) mukaan. Top 3 -listalle valitaan halvin liittymä kolmelta datatasolta: ≥5 Gt, ≥10 Gt ja rajaton — jotta vertailuun ei valikoidu ainoastaan datattomia perusliittymiä."
        />

        {/* Top 3 cheapest */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            Halvimmat liittymät datatason mukaan
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {top3.map((plan) => (
              <MobilePlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </section>

        {/* Budget plans under 15€ */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            Kaikki liittymät alle 15 €/kk
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {budgetPlans.map((plan) => (
              <MobilePlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </section>

        {/* Cheapest unlimited */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            Halvimmat rajattomat liittymät
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {unlimitedCheap.map((plan) => (
              <MobilePlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </section>

        {/* Guide content */}
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="prose prose-slate max-w-none">
            <h2>Miten löydän halvimman liittymän?</h2>
            <p>
              Halvin liittymä löytyy tyypillisesti budjettioperaattoreilta eli MVNO-toimijoilta.
              Nämä operaattorit (Moi Mobiili, Giga Mobiili, Oomi Mobiili, Globetel) käyttävät isojen
              operaattoreiden verkkoja, joten verkkolaatu on käytännössä sama — mutta hinta on merkittävästi alhaisempi.
            </p>
            <h3>Vinkit säästämiseen</h3>
            <ul>
              <li>Arvioi realistisesti datantarpeesi — monelle riittää 5–10 Gt kuukaudessa</li>
              <li>MVNO-operaattorit ovat 20–40 % edullisempia kuin MNO-operaattorit</li>
              <li>Vältä määräaikaisia sopimuksia — toistaiseksi voimassa olevat ovat joustavampia</li>
              <li>Tarkista, sisältyykö liittymään turhia lisäpalveluita</li>
            </ul>
            <p>
              <Link href="/puhelinliittymat" className="text-cyan-600 hover:text-cyan-700">
                Katso kaikki liittymät ja suodata haluamillasi ehdoilla &rarr;
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
