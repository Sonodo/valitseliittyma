import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { breadcrumbSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Liittymäsanasto — Mobiili- ja laajakaistatermit selitettyinä',
  description:
    'Liittymäsanasto: 5G, 4G LTE, mobiililaajakaista, kuitulaajakaista, MNP, eSIM, kantaverkkooperaattori, MVNO ja muut tärkeimmät käsitteet selkokielisesti.',
  alternates: { canonical: '/sanasto' },
  openGraph: {
    title: 'Liittymäsanasto — Valitse Liittymä',
    description:
      'Mobiili- ja laajakaistatermit selitettyinä selkokielisesti. 5G, 4G LTE, MVNO, MNP, eSIM ja muut.',
  },
};

interface Term {
  term: string;
  shortTerm?: string;
  definition: string;
  source?: string; // attribution where relevant
}

const terms: Term[] = [
  {
    term: '5G',
    definition:
      'Viidennen sukupolven matkaviestintäverkko, joka tarjoaa olennaisesti 4G-verkkoa nopeammat latausnopeudet (yleensä 200–1000 Mbit/s kuluttajaliittymissä) ja pienemmät viiveet. Suomessa 5G-verkkoa rakentavat Elisa, DNA ja Telia. 5G-liittymä tarvitsee toimiakseen 5G-yhteensopivan päätelaitteen ja 5G-kattavuuden alueella. Traficom seuraa 5G-verkon kattavuutta peittokartoilla.',
    source: 'Traficom',
  },
  {
    term: '4G LTE',
    shortTerm: '4G',
    definition:
      'Neljännen sukupolven matkaviestintäverkko (Long Term Evolution), joka kattaa Suomessa käytännössä koko maan. Tyypillinen latausnopeus kuluttajaliittymissä on 50–300 Mbit/s. 4G riittää sujuvaan suoratoistoon, videopuheluihin ja tavalliseen mobiilikäyttöön. Suurin osa Suomen budjettiliittymistä toimii 4G-verkossa.',
  },
  {
    term: 'Mobiililaajakaista',
    definition:
      'Internet-yhteys, joka muodostetaan matkaviestintäverkon yli (4G tai 5G) joko erillisellä reitittimellä tai SIM-kortilla varustetulla mokkulalla. Hyvä vaihtoehto alueille, joille kuitua ei ole vedetty, tai vuokra-asuntoihin, joissa ei haluta sitoutua kiinteään yhteyteen.',
  },
  {
    term: 'Kuitulaajakaista',
    shortTerm: 'Valokuitu',
    definition:
      'Optista valokuitukaapelia hyödyntävä laajakaistayhteys, joka tarjoaa korkeimmat latausnopeudet (yleensä 100–10 000 Mbit/s) ja erittäin pienen viiveen. Valokuitu vaatii rakennukseen vedetyn kuiduliittymän — saatavuus tarkistetaan operaattorin saatavuuskartasta tai osoitehausta.',
  },
  {
    term: 'Kupariliittymä',
    shortTerm: 'ADSL / VDSL',
    definition:
      'Vanhan puhelinkuparilinjan kautta toimiva laajakaistaliittymä. Suomessa kupariverkkoa puretaan operaattoreiden toimesta vaiheittain, ja monet liittymät korvataan 4G/5G-kotinetillä tai valokuidulla. Nopeudet jäävät yleensä alle 100 Mbit/s.',
  },
  {
    term: 'Datakatto',
    definition:
      'Kuukaudessa käytettävän datan yläraja gigatavuissa (esim. 50 Gt/kk). Datakaton ylityttyä yhteys joko hidastuu (yleisin malli) tai datasta veloitetaan lisämaksu. Useimmissa Suomen kuluttajaliittymissä on joko datakatto tai rajaton data.',
  },
  {
    term: 'Rajaton data',
    definition:
      'Liittymä, jossa kotimaan dataa voi käyttää ilman kiinteää gigarajaa. Liittymän maksiminopeus on määritelty erikseen (esim. 300 Mbit/s tai 1000 Mbit/s). Rajattomalla datalla nopeus pysyy samana koko kuukauden eikä kuukauden lopulla tule yllättävää hidastumista.',
  },
  {
    term: 'Latausnopeus',
    shortTerm: 'Download',
    definition:
      'Nopeus, jolla data siirtyy verkosta laitteeseesi (esim. videon katselu tai sivun lataus). Mitataan megabitteinä sekunnissa (Mbit/s). Tämä on yleensä se nopeus, joka näkyy liittymän tuotetiedoissa ensimmäisenä.',
  },
  {
    term: 'Lähetysnopeus',
    shortTerm: 'Upload',
    definition:
      'Nopeus, jolla data siirtyy laitteestasi verkkoon (esim. videopuhelut, kuvien lähetys, etätyö, pilvitallennus). Lähetysnopeus on yleensä pienempi kuin latausnopeus. Etätyössä ja sisällöntuotannossa kannattaa kiinnittää huomiota myös lähetysnopeuteen.',
  },
  {
    term: 'Viive (latenssi, ms)',
    definition:
      'Aika, joka kestää datapaketin matka laitteeltasi palvelimelle ja takaisin. Mitataan millisekunneissa (ms). Pieni viive on tärkeä esimerkiksi videopuheluissa ja verkkopelaamisessa. 5G-verkossa viive on tyypillisesti 10–30 ms, 4G-verkossa 30–60 ms ja kuituyhteydessä alle 10 ms.',
  },
  {
    term: 'eSIM',
    definition:
      'Sähköinen SIM-kortti, joka on sisäänrakennettu puhelimeen tai tablettiin. Liittymän voi aktivoida QR-koodilla ilman fyysistä SIM-korttia. Useimmat uudemmat puhelimet (iPhone XS ja uudemmat, monet Android-laitteet) tukevat eSIM-toimintoa. Kätevä matkustaessa, koska samaan laitteeseen voi tallentaa useita liittymiä.',
  },
  {
    term: 'Fyysinen SIM',
    definition:
      'Perinteinen muovinen SIM-kortti, joka asetetaan puhelimen SIM-paikkaan. Suomessa toimitetaan yleensä nano-SIM-koossa. Fyysisen SIM:n etu on, että sen voi siirtää helposti laitteesta toiseen.',
  },
  {
    term: 'Prepaid',
    definition:
      'Liittymä, joka maksetaan etukäteen. Käyttäjä lataa saldoa, jota kuluu puheluiden, viestien ja datan käytössä. Sopii esimerkiksi lapsille, satunnaiskäyttäjille ja matkailijoille. Suomessa prepaid-liittymät vaativat henkilöllisyyden todistamisen rekisteröinnin yhteydessä.',
  },
  {
    term: 'Jälkilaskutus',
    definition:
      'Tavallisin liittymämalli, jossa käyttäjä saa kuukausittaisen laskun käytöstä. Useimmat liittymät ovat kiinteähintaisia kuukausimaksullisia liittymiä, mutta joissain tapauksissa lisäpalveluista (esim. ulkomaanpuhelut tai ylimääräinen data) voidaan veloittaa erikseen.',
  },
  {
    term: 'Sopimusaika',
    definition:
      'Aika, jonka kuluttaja sitoutuu liittymään. Suomessa määräaikainen kuluttajasopimus saa olla enintään 24 kuukautta, ja ensimmäisen sopimusvuoden jälkeen sopimuksen voi yleensä irtisanoa. Toistaiseksi voimassa olevassa liittymässä ei ole sitoutumisaikaa, ja sen voi irtisanoa milloin tahansa.',
    source: 'KKV',
  },
  {
    term: 'Irtisanomisaika',
    definition:
      'Aika, joka kuluttajan on odotettava sopimuksen päättymistä irtisanomisilmoituksen jälkeen. Useimmilla operaattoreilla irtisanomisaika on kahdesta viikosta yhteen kuukauteen. Jos numero siirretään uudelle operaattorille, vanha sopimus päättyy automaattisesti numerosiirron yhteydessä.',
  },
  {
    term: 'MNP (Numeronsiirto)',
    shortTerm: 'MNP',
    definition:
      'Mobile Number Portability, eli oikeus siirtää oma matkapuhelinnumero operaattorilta toiselle. Suomessa numerosiirto on lakisääteinen oikeus ja maksuton kuluttajalle. Käytännössä uusi operaattori hoitaa numerosiirron ja vanhan liittymän irtisanomisen automaattisesti — siirto kestää tyypillisesti 1–5 arkipäivää.',
    source: 'Traficom',
  },
  {
    term: 'Kantaverkkooperaattori',
    shortTerm: 'MNO',
    definition:
      'Mobile Network Operator — operaattori, jolla on oma fyysinen matkaviestintäverkko Suomessa. Suomessa kolme kantaverkkooperaattoria ovat Telia, Elisa (Saunalahti) ja DNA. Kaikki muut Suomessa toimivat liittymät kulkevat näiden kolmen verkossa.',
  },
  {
    term: 'Virtuaalioperaattori (MVNO)',
    shortTerm: 'MVNO',
    definition:
      'Mobile Virtual Network Operator — operaattori, joka ei omista omaa matkaviestintäverkkoa, vaan vuokraa kapasiteettia kantaverkkooperaattorilta (MNO). Esimerkkejä Suomessa ovat Moi Mobiili (DNA:n verkossa), Globetel (Telian verkossa) ja Oomi Mobiili (Elisan verkossa). Verkon laatu on käytännössä sama kuin emo-operaattorilla, mutta hinnat ovat usein edullisempia.',
  },
  {
    term: 'Peittokartta',
    definition:
      'Kartta, joka näyttää operaattorin matkaviestintäverkon kattavuuden alueittain. Operaattorit julkaisevat omat peittokarttansa, ja Traficom kerää tiedon valvontatehtäviensä yhteydessä. Peittokartta on hyvä tarkistaa erityisesti maaseudulla ja 5G-liittymää harkittaessa.',
    source: 'Traficom',
  },
  {
    term: 'Estopalvelu',
    definition:
      'Operaattorin tarjoama palvelu, jolla voi estää tiettyjä puhelu- tai tekstiviestityyppejä. Yleisimmät estot ovat ulkomaanpuhelut, palvelunumerot (esim. 0700-, 0800-numerot) ja maksulliset tekstiviestit. Estopalvelu on lain mukaan oltava maksutta saatavilla.',
    source: 'KKV',
  },
  {
    term: 'EU-roaming',
    definition:
      'Mahdollisuus käyttää omaa liittymää muissa EU- ja ETA-maissa kotihinnoin (Roam Like At Home -periaate). Kotimaan datakuukausimäärästä on yleensä eroteltu erillinen EU-roaming-data-allokaatio (esim. 6–35 Gt/kk). Liittymän kohtuullisen käytön sääntö rajoittaa pitkäaikaista roaming-käyttöä.',
    source: 'EU-asetus 531/2012',
  },
];

export default function SanastoPage() {
  const definedTermSetSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': `${SITE_URL}/sanasto`,
    name: 'Liittymäsanasto — Valitse Liittymä',
    description:
      'Mobiili- ja laajakaistaliittymien keskeisten käsitteiden määritelmät selkokielisesti.',
    url: `${SITE_URL}/sanasto`,
    inLanguage: 'fi',
    hasDefinedTerm: terms.map((t) => ({
      '@type': 'DefinedTerm',
      '@id': `${SITE_URL}/sanasto#${slugify(t.term)}`,
      name: t.term,
      ...(t.shortTerm ? { alternateName: t.shortTerm } : {}),
      description: t.definition,
      inDefinedTermSet: `${SITE_URL}/sanasto`,
      inLanguage: 'fi',
    })),
  };

  const breadcrumbLd = breadcrumbSchema([
    { name: 'Etusivu', url: '/' },
    { name: 'Sanasto', url: '/sanasto' },
  ]);

  return (
    <div className="py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-cyan-600"
        >
          <ArrowLeft className="h-4 w-4" /> Etusivu
        </Link>

        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Liittymäsanasto
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Mobiili- ja laajakaistaliittymien keskeiset käsitteet selitettyinä selkokielisesti.
          Lähteinä on käytetty muun muassa Traficomin (Liikenne- ja viestintävirasto) ja
          Kilpailu- ja kuluttajaviraston (KKV) ohjeistuksia.
        </p>

        {/* Anchor index */}
        <nav aria-label="Termit" className="mt-8 flex flex-wrap gap-2">
          {terms.map((t) => (
            <a
              key={t.term}
              href={`#${slugify(t.term)}`}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-cyan-400 hover:text-cyan-700"
            >
              {t.term}
            </a>
          ))}
        </nav>

        <dl className="mt-12 space-y-8">
          {terms.map((t) => (
            <div key={t.term} id={slugify(t.term)} className="scroll-mt-24 border-l-4 border-cyan-200 pl-5">
              <dt className="text-xl font-bold text-slate-900">
                {t.term}
                {t.shortTerm && (
                  <span className="ml-2 text-sm font-medium text-slate-500">({t.shortTerm})</span>
                )}
              </dt>
              <dd className="mt-2 text-base leading-relaxed text-slate-700">
                {t.definition}
              </dd>
              {t.source && (
                <p className="mt-2 text-xs text-slate-500">
                  Lähde / valvonta: <span className="font-medium text-slate-700">{t.source}</span>
                </p>
              )}
            </div>
          ))}
        </dl>

        <div className="mt-16 rounded-xl bg-slate-50 p-6 text-sm text-slate-600 ring-1 ring-slate-200">
          <p>
            Sanasto on tarkoitettu kuluttajille selkeyttämään liittymävalintoja. Tarkimmat
            tekniset ja juridiset määritelmät löytyvät{' '}
            <a
              href="https://www.traficom.fi"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-cyan-700 hover:underline"
            >
              Traficomin
            </a>{' '}
            ja{' '}
            <a
              href="https://www.kkv.fi"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-cyan-700 hover:underline"
            >
              KKV:n
            </a>{' '}
            sivuilta.
          </p>
        </div>
      </div>
    </div>
  );
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
