/**
 * Homepage FAQ — shared between server (FAQPage JSON-LD)
 * and client (visible accordion).
 *
 * Each entry must have a single, complete answer — kept short enough to
 * read aloud by AI assistants (Google SGE, ChatGPT search).
 */

import { DATA_REVIEWED_AT } from '@/lib/constants';

export interface FaqItem {
  q: string;
  a: string;
}

export const HOMEPAGE_FAQ: FaqItem[] = [
  {
    q: 'Miksi vertailla mobiililiittymiä?',
    a: 'Suomessa toimii kolme kantaverkkooperaattoria (Elisa, DNA, Telia) ja useita virtuaalioperaattoreita. Hinnat samalla datamäärällä ja samalla verkolla voivat erota 10–25 €/kk. Vertailu auttaa löytämään saman verkon ja saman datamäärän edullisemmin — useimmat suomalaiset säästävät vaihtaessaan.',
  },
  {
    q: 'Mikä on edullisin puhelinliittymä juuri nyt?',
    a: `Edullisin liittymä riippuu siitä, paljonko dataa tarvitset. Pieneen käyttöön (1–10 Gt/kk) löytyy liittymiä alle 8 €/kk; rajaton 5G alkaa noin 25–30 €/kk. Vertaile hinnat sivuiltamme — liittymätiedot on tarkistettu ${DATA_REVIEWED_AT}, ja lopullinen hinta kannattaa aina varmistaa operaattorilta.`,
  },
  {
    q: 'Voiko oman puhelinnumeron siirtää uudelle operaattorille?',
    a: 'Kyllä. Numeronsiirto (MNP, Mobile Number Portability) on Suomessa lakisääteinen oikeus ja kuluttajalle maksuton. Tilaat uuden liittymän haluamaltasi operaattorilta ja pyydät numerosiirron — uusi operaattori hoitaa vanhan liittymän irtisanomisen automaattisesti. Siirto kestää tyypillisesti 1–5 arkipäivää.',
  },
  {
    q: 'Toimiiko 5G kotonani?',
    a: '5G-kattavuus laajenee Suomessa nopeasti, ja Elisa, DNA ja Telia kattavat jo suurimman osan kaupungeista ja taajamista. Tarkista oma osoitteesi operaattorin peittokartalta ennen 5G-liittymän tilaamista. Jos 5G ei ole vielä saatavilla, 4G LTE -liittymä toimii samalla SIM-kortilla.',
  },
  {
    q: 'Miten irtisanon nykyisen liittymäni?',
    a: 'Jos siirrät numeron uudelle operaattorille, vanha sopimus päättyy automaattisesti numerosiirron yhteydessä — sinun ei tarvitse irtisanoa erikseen. Jos haluat lopettaa liittymän kokonaan ilman uutta tilausta, ota yhteyttä nykyiseen operaattoriisi. Toistaiseksi voimassa olevat sopimukset voi yleensä irtisanoa kahden viikon irtisanomisajalla.',
  },
  {
    q: 'Mitä eroa on kantaverkkooperaattorilla ja virtuaalioperaattorilla?',
    a: 'Kantaverkkooperaattorit (MNO) — Elisa, DNA ja Telia — omistavat oman matkaviestintäverkon Suomessa. Virtuaalioperaattorit (MVNO) kuten Moi Mobiili, Globetel ja Oomi vuokraavat kapasiteettia näiltä kolmelta. Verkon laatu on käytännössä sama kuin emo-operaattorilla, mutta hinnat ovat usein edullisempia, koska MVNO:t kilpailevat hinnalla eivätkä lisäpalveluilla.',
  },
  {
    q: 'Onko liittymissä vielä määräaikaisia sopimuksia?',
    a: 'Suurin osa Suomen kuluttajaliittymistä on toistaiseksi voimassa eli ilman sitoutumisaikaa. Joitain kampanjahintoja sidotaan 12–24 kuukauden määräaikaan. Lain mukaan kuluttajan määräaikainen sopimus saa olla enintään 24 kuukautta, ja yli 12 kuukauden sopimuksen voi yleensä irtisanoa ensimmäisen vuoden jälkeen. Tarkista ehdot ennen tilausta.',
  },
];
