import { Operator } from '@/types';

export const operators: Operator[] = [
  // === MAJOR NETWORK OPERATORS (MNO) ===
  {
    id: 'elisa',
    name: 'Elisa',
    slug: 'elisa',
    brand: 'Saunalahti',
    description:
      'Suomen suurin teleoperaattori, joka palvelee kuluttajia Saunalahti-brändillä. Elisa tunnetaan kattavasta 5G-verkosta, luotettavista palveluista ja monipuolisesta liittymävalikoimasta. Markkinajohtaja noin 37 % markkinaosuudella.',
    founded: 1882,
    website: 'https://www.elisa.fi',
    type: 'MNO',
    marketShare: 37,
    color: '#5C2D91',
    pros: [
      'Suomen laajin 5G-verkko',
      'Luotettava ja nopea verkko',
      'Monipuolinen liittymävalikoima',
      'Hyvä asiakaspalvelu',
      'Elisa Viihde -palvelu',
    ],
    cons: [
      'Kalliimpi kuin budjettioperaattorit',
      'Määräaikaiset tarjoukset voivat nousta',
      'Lisäpalvelut voivat nostaa hintaa',
    ],
  },
  {
    id: 'dna',
    name: 'DNA',
    slug: 'dna',
    description:
      'Suomen kolmanneksi suurin teleoperaattori noin 27 % markkinaosuudella. DNA tunnetaan kilpailukykyisistä hinnoista, hyvästä 5G-kattavuudesta ja selkeistä liittymäpaketeista. Osa Telenor-konsernia.',
    founded: 2001,
    website: 'https://www.dna.fi',
    type: 'MNO',
    marketShare: 27,
    color: '#00A651',
    pros: [
      'Kilpailukykyiset hinnat',
      'Hyvä 5G-kattavuus',
      'Selkeät liittymäpaketit',
      'DNA TV ja viihdepalvelut',
      'Nopea laajakaista',
    ],
    cons: [
      'Pienemmät kaupungit voivat olla heikommin katettuja',
      'Asiakaspalvelun ruuhkat',
    ],
  },
  {
    id: 'telia',
    name: 'Telia',
    slug: 'telia',
    description:
      'Telia Finland on osa pohjoismaista Telia Company -konsernia. Noin 30 % markkinaosuudella se on Suomen toiseksi suurin operaattori. Tunnetaan laadukkaasta verkosta, yrityspuolen palveluista ja Telia TV:stä.',
    founded: 2002,
    website: 'https://www.telia.fi',
    type: 'MNO',
    marketShare: 30,
    color: '#990AE3',
    pros: [
      'Laadukas verkko',
      'Hyvät yrityspuolen palvelut',
      'Telia TV mukana monissa liittymissä',
      'Vahva pohjoismainen taustayhtiö',
      'Kattava 5G',
    ],
    cons: [
      'Hieman kalliimpi kuin DNA',
      'Liittymävalikoima voi olla sekava',
    ],
  },
  // === MVNO / BUDGET OPERATORS ===
  {
    id: 'moi',
    name: 'Moi Mobiili',
    slug: 'moi',
    description:
      'Moi Mobiili on suomalainen budjettioperaattori, joka toimii DNA:n verkossa. Tunnettu yksinkertaisista ja edullisista liittymistä ilman turhia lisäpalveluita. Kaikki hallitaan sovelluksella.',
    founded: 2016,
    website: 'https://www.moi.fi',
    type: 'MVNO',
    network: 'DNA',
    color: '#FF6B00',
    pros: [
      'Kilpailukykyinen hinnoittelu',
      'Yksinkertainen — ei piilokustannuksia',
      'Helppo hallinta sovelluksella',
      'Ei määräaikaisuutta',
      'DNA:n luotettava verkko',
    ],
    cons: [
      'Ei omaa verkkoa — riippuvainen DNA:sta',
      'Rajallinen asiakaspalvelu (chat-painotteinen)',
      'Ei viihdepalveluita',
    ],
  },
  {
    id: 'giga',
    name: 'Giga Mobiili',
    slug: 'giga',
    description:
      'Giga Mobiili on Gigantin (elektroniikkaketju) lanseeraama virtuaalioperaattori. Toimii DNA:n 4G- ja 5G-verkossa. Liittymät myydään Gigantin myymälöissä ja verkkokaupassa selkeällä hinnoittelulla ilman piilokustannuksia.',
    founded: 2025,
    website: 'https://gigamobiili.fi',
    type: 'MVNO',
    network: 'DNA',
    color: '#00C2FF',
    pros: [
      'Selkeä hinnoittelu ilman piilokustannuksia',
      'DNA:n luotettava 4G- ja 5G-verkko',
      'Pohjoismainen roaming sisältyy',
      'Saatavilla Gigantin myymälöissä',
    ],
    cons: [
      'Uusi toimija — kokemuksia vähän',
      'Suppea liittymävalikoima (4 liittymää)',
      'Ei halvimpia perusliittymiä — hinnat alkaen ~22 €/kk',
    ],
  },
  {
    id: 'oomi',
    name: 'Oomi Mobiili',
    slug: 'oomi',
    description:
      'Oomi Mobiili on energiayhtiö Oomin lanseeraama matkapuhelinpalvelu. Tarjoaa liittymiä erityisesti Oomin sähköasiakkaille keskittämisetuna: sähkölaskusta saa alennusta liittymien määrän mukaan. Toimii Elisan verkossa.',
    founded: 2025,
    website: 'https://oomi.fi/mobiili',
    type: 'MVNO',
    network: 'Elisa',
    color: '#F7941D',
    pros: [
      'Elisan kattava 4G- ja 5G-verkko',
      'Keskittämisetu: alennusta sähkölaskuun (30–96 €/vuosi)',
      'Energiayhtiön luotettavuus',
      'Selkeä hinnoittelu',
    ],
    cons: [
      'Suppea liittymävalikoima (2 liittymää)',
      'Uusi toimija — lanseerattu joulukuussa 2025',
      'Ei omia viihdepalveluita',
      'Ei edullisimpia perusliittymiä',
    ],
  },
  {
    id: 'globetel',
    name: 'Globetel',
    slug: 'globetel',
    description:
      'Globetel on kansainvälisiin puheluihin ja edullisiin liittymiin erikoistunut operaattori. Toimii Telian verkossa ja tarjoaa kilpailukykyisiä hintoja erityisesti ulkomaille soittaville. Yksi Suomen pitkäaikaisimmista virtuaalioperaattoreista.',
    founded: 1997,
    website: 'https://globetel.fi',
    type: 'MVNO',
    network: 'Telia',
    color: '#1E90FF',
    pros: [
      'Edulliset kansainväliset puhelut (30 % alennus)',
      'Markkinoiden edullisimpia perusliittymiä',
      'Telian kattava verkko',
      'Tarjoaa myös liittymiä ilman dataa',
    ],
    cons: [
      'Pieni toimija',
      'Rajallinen asiakaspalvelu',
      'Ei 5G-liittymiä',
      'Data lisäpalveluna — ei nykyaikaisia paketteja',
    ],
  },
];

// Helper to get operator by ID
export function getOperatorById(id: string): Operator | undefined {
  return operators.find((op) => op.id === id);
}

// Helper to get operator by slug
export function getOperatorBySlug(slug: string): Operator | undefined {
  return operators.find((op) => op.slug === slug);
}
