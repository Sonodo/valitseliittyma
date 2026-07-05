import type { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema } from '@/lib/schema';
import { SITE_NAME, DATA_REVIEWED_AT } from '@/lib/constants';
import { SITE_CONFIG } from '@/components/disclosure';

export const metadata: Metadata = {
  title: 'Sivuston ansainta — näin ansaitsemme rahaa',
  description: `Miten ${SITE_NAME} valitsee operaattorit, järjestää tarjoukset ja ansaitsee rahaa. Avoin selvitys palkkioista, järjestysalgoritmistä ja siitä mitä emme tee.`,
  alternates: { canonical: '/sivuston-ansainta' },
  robots: { index: true, follow: true },
};

export default function SivustonAnsaintaPage() {
  const breadcrumbLd = breadcrumbSchema([
    { name: 'Etusivu', url: '/' },
    { name: 'Sivuston ansainta', url: '/sivuston-ansainta' },
  ]);

  return (
    <div className="py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10">
          <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
            Toimituksen periaatteet
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Sivuston ansainta
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Tämä sivu kertoo avoimesti, miten {SITE_NAME} hankkii tietonsa,
            järjestää tarjoukset ja ansaitsee rahaa. Tavoitteemme on rehellinen,
            kuluttajan etua palveleva vertailu — ja haluamme näyttää tarkalleen,
            mitä se meiltä vaatii.
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900">Mistä tarjoajat tulevat</h2>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Keräämme operaattoreiden ja palveluntarjoajien tarjoukset suoraan
            heidän julkisilta sivuiltaan. Lisäksi käytämme rajatun joukon
            kumppaneita, joiden kanssa meillä on suora affiliate-sopimus
            Adtraction-verkoston kautta — heidän tarjouksensa päivittyvät
            kumppanin omasta järjestelmästä, joten hinta- ja ehtotiedot ovat
            tuoreimmat.
          </p>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Sisällytämme listalle <strong>kaikki Suomessa toimivat merkittävät
            operaattorit</strong> riippumatta siitä, onko meillä heidän kanssaan
            kaupallinen sopimus. Vertailusta jätetään pois ainoastaan
            operaattorit, joiden tiedot eivät ole julkisesti saatavilla, joiden
            tarjonta on rajattu hyvin pieneen alueeseen tai joiden palvelu on
            todettu kuluttajaviranomaisen toimesta sopimattomaksi.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900">Järjestysalgoritmi</h2>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Tarjoukset järjestetään <strong>oletuksena hinnan mukaan</strong>{' '}
            ({SITE_CONFIG.rankingCriteria}). Algoritmi <strong>ei</strong> ota
            huomioon sitä, saammeko tarjoajalta palkkion vai emme. Kahden
            samanhintaisen tarjouksen järjestys ratkaistaan sopimuksen
            pituudella (lyhyempi sitoutuminen ensin) ja lopuksi datamäärällä /
            nopeudella. Käyttäjä voi vaihtaa järjestysperusteen tai suodattaa
            hakuja vapaasti.
          </p>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Kumppani- ja ei-kumppanitarjoukset näkyvät vertailussa{' '}
            <strong>identtisellä tavalla</strong> — sama ulkoasu, sama
            järjestyslogiikka. Kumppanilinkkeihin lisätään tekninen{' '}
            <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">
              rel=&quot;sponsored&quot;
            </code>
            -merkintä hakukoneita varten, mutta käyttäjälle näkyvä korttien
            ulkoasu ei poikkea.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900">Mitä emme tee</h2>
          <ul className="mt-3 space-y-2 text-slate-700">
            <li className="flex gap-2">
              <span className="text-emerald-600">✓</span>
              <span>
                <strong>Emme nosta tarjouksia esiin palkkion suuruuden perusteella.</strong>{' '}
                Pay-for-placement on meille kielletty.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600">✓</span>
              <span>
                <strong>Emme piilota kilpailijoita.</strong> Listoilla on aina sekä
                kumppaniemme että ei-kumppaneiden tarjoukset, jos ne on saatavilla.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600">✓</span>
              <span>
                <strong>Emme kerää henkilötietojasi salaa.</strong> Klikkauksen
                yhteydessä lähetämme operaattorille vain ns. affiliate-tunnisteen
                ilman henkilökohtaisia tietoja.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600">✓</span>
              <span>
                <strong>Emme muokkaa hintatietoja.</strong> Hinnat näytetään
                sellaisina kuin operaattori ne julkaisee — myös silloin, kun
                kumppanin hinta olisi sille epäedullinen.
              </span>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900">Tietojen tarkistus</h2>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Kaikki hinnat tarkistetaan manuaalisesti operaattoreiden julkisilta
            sivuilta — sama käytäntö koskee kumppaneita ja muita tarjoajia.
            Viimeisin tarkistus on tehty {DATA_REVIEWED_AT}, ja päivämäärä kerrotaan
            avoimesti vertailusivuilla. Mikäli huomaat virheellisen hinnan, kerro
            siitä — pyrimme korjaamaan sen vuorokauden sisällä.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900">Mukana olevat ja pois jätetyt operaattorit</h2>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Vertailussa ovat mukana Suomen merkittävimmät operaattorit:
            Elisa, DNA, Telia, Moi Mobiili, Giga Mobiili, Oomi Mobiili ja Globetel
            sekä laajakaistaoperaattori Valoo.
          </p>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Pois on jätetty operaattorit, joiden tarjonta on alueellisesti hyvin
            rajattua (esimerkiksi yhden kunnan kaapeliverkkoyhtiöt) tai joiden
            hintatieto ei ole julkisesti saatavilla. Olemme avoimia laajentamaan
            vertailua — ota yhteyttä, jos kaipaat mukaan jotakin tarjoajaa.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900">Miten ansaitsemme rahaa</h2>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Saamme komission osasta kumppaneidemme kanssa solmituista sopimuksista.
            Tämä komissio ei vaikuta sinun maksamaasi hintaan eikä siihen,
            järjestetäänkö tarjous korkeammalle vai matalammalle. Ilman tätä
            tulonlähdettä emme voisi ylläpitää maksutonta vertailupalvelua.
          </p>
        </section>

        <section className="rounded-xl bg-slate-50 p-6">
          <h2 className="text-lg font-bold text-slate-900">Onko jotain epäselvää?</h2>
          <p className="mt-2 text-slate-700">
            Voit ottaa yhteyttä{' '}
            <Link href="/yhteystiedot" className="text-accent underline hover:text-accent-600">
              yhteystiedot-sivun
            </Link>{' '}
            kautta tai lukea lisää{' '}
            <Link href="/tietoa" className="text-accent underline hover:text-accent-600">
              palvelusta yleisesti
            </Link>
            .
          </p>
        </section>
      </article>
    </div>
  );
}
