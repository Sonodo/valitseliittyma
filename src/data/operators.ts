import { Operator } from '@/types';

// =============================================================================
// AFFILIATE WIRING (Adtraction channel 2066470020)
// =============================================================================
// To wire an operator's affiliate program after it has been approved in the
// Adtraction panel, add these two fields to the operator entry below:
//
//   isAffiliate: true,
//   affiliateUrl: 'https://<adtraction-tracking-url>?as=2066470020&...',
//
// PlanCard.tsx automatically prefers `affiliateUrl` over `plan.url` when
// `isAffiliate` is true, and adds the "Mainos" badge + sponsored rel attr.
// No component change is needed — wiring is a two-line data edit.
//
// Currently wired:  Telia, Moi Mobiili, Valoo
// Pending Chairman: Elisa, DNA, Giga Mobiili, Oomi Mobiili, Globetel
// (Each pending operator is marked `// TODO(adtraction): apply` below.)
// =============================================================================

export const operators: Operator[] = [
  // === MAJOR NETWORK OPERATORS (MNO) ===
  {
    // TODO(adtraction): apply for Elisa/Saunalahti program in Adtraction panel,
    // then set `isAffiliate: true` + `affiliateUrl` (see top-of-file note).
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
    // TODO(adtraction): apply for DNA program in Adtraction panel,
    // then set `isAffiliate: true` + `affiliateUrl` (see top-of-file note).
    id: 'dna',
    name: 'DNA',
    slug: 'dna',
    description:
      'Suomen kolmanneksi suurin teleoperaattori noin 27 % markkinaosuudella. DNA tunnetaan kilpailukykyisistä hinnoista, hyvästä 5G-kattavuudesta ja selkeistä liittymäpaketeista.',
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
    isAffiliate: true,
    affiliateUrl: 'https://go.adt291.com/t/t?a=1553065612&as=2066470020&t=2&tk=1',
  },
  // === MVNO / BUDGET OPERATORS ===
  {
    id: 'moi',
    name: 'Moi Mobiili',
    slug: 'moi',
    description:
      'Moi Mobiili on alun perin itsenäisenä MVNO-toimijana perustettu (2016), joka siirtyi DNA:n omistukseen vuonna 2019 ja toimii nykyään käytännössä DNA:n budjettibrändinä DNA:n verkossa. Tunnettu yksinkertaisista ja edullisista liittymistä ilman turhia lisäpalveluita. Kaikki hallitaan sovelluksella.',
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
    isAffiliate: true,
    affiliateUrl: 'https://in.moi.fi/t/t?a=1119688036&as=2066470020&t=2&tk=1',
  },
  {
    // TODO(adtraction): apply for Giga Mobiili program in Adtraction panel
    // (or contact Gigantti directly — not all retailers list in Adtraction),
    // then set `isAffiliate: true` + `affiliateUrl` (see top-of-file note).
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
      'Lanseerattu 2025, alle vuoden ikäinen — vähän pitkän aikavälin käyttökokemuksia',
      'Suppea liittymävalikoima (4 liittymää)',
      'Ei halvimpia perusliittymiä — hinnat alkaen ~22 €/kk',
    ],
  },
  {
    // TODO(adtraction): apply for Oomi Mobiili program in Adtraction panel
    // (Oomi energy already runs an Adtraction program — mobile may be the same
    // advertiser or a separate one), then set `isAffiliate: true` + `affiliateUrl`.
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
    // TODO(adtraction): apply for Globetel program in Adtraction panel
    // (smaller MVNO — may not run an affiliate program; if absent, fall back
    // to direct partnership or leave unwired). Then set
    // `isAffiliate: true` + `affiliateUrl` (see top-of-file note).
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
  // === BROADBAND-ONLY OPERATORS ===
  {
    id: 'valoo',
    name: 'Valoo',
    slug: 'valoo',
    description:
      'Valoo on suomalainen laajakaistaoperaattori, joka tarjoaa kiinteää valokuitulaajakaistaa kuluttajille ja taloyhtiöille. Tunnetaan selkeästä hinnoittelusta ja kilpailukykyisistä nopeuksista ilman pitkää sitoutumista.',
    founded: 2015,
    website: 'https://www.valoo.fi',
    type: 'MVNO',
    color: '#FFB000',
    pros: [
      'Erikoistunut valokuituun',
      'Selkeä hinnoittelu',
      'Ei pitkää sitoutumista',
      'Kilpailukykyiset nopeudet',
    ],
    cons: [
      'Vain laajakaistaa — ei mobiililiittymiä',
      'Saatavuus riippuu alueesta',
      'Pienempi toimija kuin suuret MNO:t',
    ],
    isAffiliate: true,
    affiliateUrl: 'https://go.adt246.net/t/t?a=1801146847&as=2066470020&t=2&tk=1',
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
