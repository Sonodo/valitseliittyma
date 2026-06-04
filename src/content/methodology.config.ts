import type { MethodologyConfig } from '@/components/methodology/types';

const config: MethodologyConfig = {
  siteName: 'Valitse Liittymä',
  siteUrl: 'https://valitseliittyma.fi',
  lastReviewedAt: '2026-06-04',

  summary: [
    'Valitse Liittymä vertailee Suomen mobiili- ja laajakaistaliittymiä. Pisteytys yhdistää Traficomin Bittimittari-mittausdatan, Speedtest H1 2025 -keskiarvot ja Traficomin matkaviestinverkon liittymä- ja kuuluvuustilastot.',
    'Liittymävertailussa nopeudet ja kuuluvuus arvioidaan postinumeroittain todellisten mittausten perusteella — emme luota pelkästään operaattorien ilmoittamiin maksiminopeuksiin.',
  ],

  dataSources: [
    {
      name: 'Traficom — Bittimittari',
      type: 'Mittausdata',
      refreshCadence: 'Päivittäin',
      url: 'https://bittimittari.fi/',
      description:
        'Riippumaton nopeusmittauspalvelu. Käytämme aggregoitua dataa operaattorien todellisten nopeuksien arvioinnissa postinumeroittain.',
    },
    {
      name: 'Speedtest by Ookla — H1 2025 Suomi',
      type: 'Mittausdata',
      refreshCadence: 'Puolivuosittain',
      url: 'https://www.speedtest.net/global-index/finland',
      description:
        'Speedtestin Suomi-aggregaatit operaattoreittain. Käytetään vertailuarvona kiinteissä ja mobiilissa.',
    },
    {
      name: 'Traficom — Matkaviestinverkon liittymät',
      type: 'Viranomainen',
      refreshCadence: 'Kvartaaleittain',
      url: 'https://www.traficom.fi/fi/tilastot',
      description:
        'Viralliset operaattorikohtaiset tilastot liittymämääristä, markkinaosuuksista ja teknologiajakaumasta (3G/4G/5G).',
    },
    {
      name: 'Traficom — Kuuluvuuskartta',
      type: 'Viranomainen',
      refreshCadence: 'Kvartaaleittain',
      url: 'https://kuuluvuuskartta.fi/',
      description:
        'Operaattorien ilmoittamat ja Traficomin tarkistamat verkon kuuluvuustiedot. Käytetään mobiililiittymien postinumerokohtaisessa vertailussa.',
    },
  ],

  weights: [
    {
      factor: 'Hinta',
      description: 'Kuukausimaksu € sisältäen avausmaksun jaettuna 24 kk:lle.',
      weight: 35,
    },
    {
      factor: 'Todellinen nopeus',
      description:
        'Bittimittari- ja Speedtest-aineistosta laskettu keskinopeus postinumeroalueella.',
      weight: 30,
    },
    {
      factor: 'Sopimusehdot',
      description:
        'Määräaikaisuus, datakatto, käyttörajoitukset ja roaming-ehdot.',
      weight: 15,
    },
    {
      factor: 'Kuuluvuus / verkon kattavuus',
      description:
        'Traficomin kuuluvuuskartan mukainen kattavuus (mobiili) tai saatavuus (laajakaista).',
      weight: 15,
    },
    {
      factor: 'Asiakaspalaute',
      description: 'Operaattorin julkiset palauteindeksit ja Traficomin valitustilastot.',
      weight: 5,
    },
  ],

  disclosure: {
    intro:
      'Valitse Liittymä on Sonodo Oy:n ylläpitämä kuluttajille suunnattu liittymävertailu. Toimintamme rahoitetaan operaattorien kanssa solmituilla yhteistyösopimuksilla, mutta yhteistyö ei vaikuta sijoituksiin vertailussa.',
    howItWorks:
      'Saamme korvauksen, kun käyttäjä siirtyy vertailusta operaattorille ja tilaa liittymän. Korvauksen taso ei muuta pisteytystä — pisteet lasketaan Traficomin Bittimittari- ja Speedtest-datasta dokumentoidulla kaavalla.',
    safeguards: [
      'Nopeudet perustuvat Bittimittarin ja Speedtestin mittausdataan, eivät operaattorin ilmoittamiin maksimeihin.',
      'Vertailu järjestetään aina kokonaispisteen mukaan, ei kaupallisen korvauksen mukaan.',
      'Kaikki ulosmenevät operaattorilinkit merkitään rel="sponsored".',
      'Painokertoimet ja niihin tehdyt muutokset dokumentoidaan tämän sivun Päivityshistoriassa.',
    ],
  },

  changelog: [
    {
      date: '2026-06-04',
      title: 'Menetelmä-sivu julkaistu',
      summary:
        'Bittimittari- ja Speedtest H1 2025 -datan käyttö, Traficomin liittymä- ja kuuluvuustilastot sekä painokertoimet (hinta 35 %, nopeus 30 %, ehdot 15 %, kuuluvuus 15 %, palaute 5 %) dokumentoitu.',
    },
  ],

  contact: {
    href: 'mailto:feedback@valitseliittyma.fi',
    label: 'Lähetä palautetta',
  },
};

export default config;