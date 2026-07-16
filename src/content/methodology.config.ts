import type { MethodologyConfig } from '@/components/methodology/types';
import { DATA_REVIEWED_AT } from '@/lib/constants';

const config: MethodologyConfig = {
  siteName: 'Valitse Liittymä',
  siteUrl: 'https://valitseliittyma.fi',
  lastReviewedAt: '2026-07-16',

  summary: [
    'Valitse Liittymä vertailee Suomen mobiili- ja laajakaistaliittymiä. Listaukset järjestetään oletuksena normaalin kuukausihinnan mukaan (edullisin ensin) — emme laske piilotettua painotettua yhdistelmäpistettä. Voit vaihtaa lajitteluperustetta (esim. datan määrä tai maksiminopeus) ja suodattaa tuloksia vapaasti.',
    'Näytämme liittymistä sekä normaalin listahinnan että operaattorin voimassa olevan kampanjahinnan erikseen. Järjestys perustuu aina normaalihintaan, jotta määräaikainen tarjous ei vääristä vertailua. Riippumaton mittausdata (Speedtest, Traficomin Bittimittari ja laatututkimus) näytetään liittymäkorteilla tiedoksi — se ei muuta järjestystä.',
    `Liittymäkohtaiset hinnat ja ehdot on tarkistettu viimeksi ${DATA_REVIEWED_AT} operaattorien julkisilta sivuilta. Vertailussa näytetään vain liittymiä, joiden hinnat voidaan todentaa julkisesta lähteestä — esimerkiksi suurten operaattorien osoitekohtaisesti hinnoitellut kuituliittymät eivät siksi ole listassa. Hinnat ja kampanjat voivat muuttua nopeasti — tarkista lopullinen hinta aina operaattorilta ennen tilausta.`,
  ],

  dataSources: [
    {
      name: 'Operaattorien julkiset hinnastot',
      type: 'Oma seuranta',
      refreshCadence: 'Kuukausittain (käsintarkistus)',
      description:
        'Liittymien hinnat, nopeudet ja ehdot tarkistetaan käsin operaattorien omilta sivuilta. Viimeisin tarkistuspäivä näytetään sivustolla.',
    },
    {
      name: 'Speedtest by Ookla — Suomi-aggregaatit',
      type: 'Mittausdata',
      refreshCadence: 'Puolivuosittain',
      url: 'https://www.speedtest.net/global-index/finland',
      description:
        'Speedtestin operaattorikohtaiset mitatut keskinopeudet Suomessa. Näytetään liittymäkorteilla vertailuarvona — ei vaikuta järjestykseen.',
    },
    {
      name: 'Traficom — Bittimittari ja laatututkimus',
      type: 'Mittausdata',
      refreshCadence: 'Traficomin julkaisujen mukaan',
      url: 'https://bittimittari.fi/',
      description:
        'Riippumaton viranomaistaustainen mittaus- ja laatuaineisto. Käytetään operaattoritason laatumerkintöihin liittymäkorteilla.',
    },
    {
      name: 'Traficom — Matkaviestinverkon liittymät',
      type: 'Viranomainen',
      refreshCadence: 'Puolivuosittain',
      url: 'https://www.traficom.fi/fi/tilastot',
      description:
        'Viralliset operaattorikohtaiset tilastot liittymämääristä ja markkinaosuuksista. Käytetään operaattorikuvauksissa.',
    },
  ],

  criteria: [
    {
      factor: 'Kuukausihinta (normaalihinta)',
      description:
        'Liittymän normaali listahinta ilman määräaikaisia kampanja-alennuksia. Operaattorin kampanjahinta näytetään erikseen kortilla.',
      role: 'Oletusjärjestys — listaus järjestetään tämän mukaan, edullisin ensin',
    },
    {
      factor: 'Datan määrä ja maksiminopeus',
      description:
        'Liittymään sisältyvä data (Gt tai rajaton) ja operaattorin ilmoittama maksiminopeus (Mbit/s).',
      role: 'Vaihtoehtoinen lajitteluperuste — valittavissa listauksessa',
    },
    {
      factor: 'Mitattu verkkonopeus',
      description:
        'Speedtestin ja Traficomin riippumattomista aineistoista poimittu operaattorin mitattu nopeustaso.',
      role: 'Vain tiedoksi — näytetään merkintänä kortilla, ei vaikuta järjestykseen',
    },
    {
      factor: 'Sopimusehdot ja ominaisuudet',
      description:
        'Määräaikaisuus, puheluiden ja viestien hinnoittelu, EU-roaming ja muut ominaisuudet.',
      role: 'Suodatus- ja vertailutieto — ei pisteytetä',
    },
    {
      factor: 'Kelpoisuus (todennettu hinta)',
      description:
        'Liittymän on oltava aidosti myynnissä ja sen hinnan todennettavissa julkisesta lähteestä.',
      role: 'Kelpoisuusehto — sovelletaan ennen järjestystä, ei osa lajittelua',
    },
  ],

  disclosure: {
    intro:
      'Valitse Liittymä on Sonodo-toiminimen ylläpitämä kuluttajille suunnattu liittymävertailu. Toimintamme rahoitetaan operaattorien kanssa solmituilla yhteistyösopimuksilla, mutta yhteistyö ei vaikuta sijoituksiin vertailussa.',
    howItWorks:
      'Saamme korvauksen, kun käyttäjä siirtyy vertailusta kumppanioperaattorille ja tilaa liittymän. Korvauksen taso ei muuta järjestystä — listaus järjestetään liittymien julkisten normaalihintojen mukaan.',
    safeguards: [
      'Listaus järjestetään aina objektiivisen mittarin mukaan (oletuksena normaali kuukausihinta) — ei koskaan korvauksen mukaan.',
      'Näytämme sekä normaalihinnan että kampanjahinnan; järjestys perustuu aina normaalihintaan.',
      'Mittausdata (Speedtest, Traficom) näytetään sellaisenaan lähteineen — sitä ei muokata kaupallisin perustein.',
      'Kaikki kumppanioperaattorien ulosmenevät linkit merkitään rel="sponsored".',
      'Vertailussa on mukana myös operaattoreita, joiden kanssa meillä ei ole kaupallista yhteistyötä.',
    ],
  },

  changelog: [
    {
      date: '2026-07-16',
      title: 'Menetelmäsivu yhdenmukaistettu todellisen järjestyslogiikan kanssa + hintadatan täysverifiointi',
      summary:
        'Aiempi painokerroin-taulukko (hinta 35 %, nopeus 30 %, ehdot 15 %, kuuluvuus 15 %, palaute 5 %) korvattiin kuvauksella todellisesta järjestyksestä: listaus järjestetään normaalin kuukausihinnan mukaan, ja mittausdata näytetään tiedoksi. Samalla kaikki liittymähinnat verifioitiin operaattorien sivuilta: uudistuneet mallistot (Elisa Huoleton, DNA Huoleton Plus, Telia Rajaton, Moi) päivitettiin, kampanjahinnat eroteltiin normaalihinnoista, ja liittymät joiden hintaa ei voi todentaa julkisesta lähteestä (mm. osoitekohtaisesti hinnoitellut kuituliittymät) poistettiin vertailusta.',
    },
    {
      date: '2026-06-04',
      title: 'Menetelmä-sivu julkaistu',
      summary:
        'Bittimittari- ja Speedtest H1 2025 -datan käyttö sekä Traficomin liittymä- ja kuuluvuustilastot dokumentoitu.',
    },
  ],

  contact: {
    href: 'mailto:feedback@valitseliittyma.fi',
    label: 'Lähetä palautetta',
  },
};

export default config;
