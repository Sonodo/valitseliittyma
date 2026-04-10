import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tietoa palvelusta — Valitse Liittymä',
  description:
    'Valitse Liittymä on ilmainen ja puolueeton puhelinliittymien ja laajakaistojen vertailupalvelu Suomessa.',
  alternates: { canonical: '/tietoa' },
};

export default function TietoaPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Tietoa Valitse Liittymä -palvelusta
        </h1>

        <article className="mt-10 prose prose-slate prose-lg max-w-none">
          <h2>Mikä on Valitse Liittymä?</h2>
          <p>
            Valitse Liittymä on ilmainen ja puolueeton verkkopalvelu, joka auttaa suomalaisia
            kuluttajia löytämään parhaan puhelinliittymän ja laajakaistan. Vertailemme kaikkia
            Suomen suurimpia operaattoreita ja niiden liittymiä yhdessä paikassa.
          </p>

          <h2>Miten palvelu toimii?</h2>
          <p>
            Keräämme tiedot suoraan operaattoreiden verkkosivuilta ja päivitämme ne säännöllisesti.
            Vertailussa ovat mukana kaikki merkittävät operaattorit: Elisa, DNA, Telia sekä
            budjettioperaattorit Moi Mobiili, Giga Mobiili, Oomi Mobiili ja Globetel.
          </p>

          <h2>Onko palvelu ilmainen?</h2>
          <p>
            Kyllä, palvelu on täysin ilmainen kuluttajille. Saatamme saada korvauksen, jos käyttäjä
            siirtyy palvelumme kautta operaattorin sivuille ja tekee tilauksen. Tämä ei vaikuta
            vertailun tuloksiin tai suosituksiimme.
          </p>

          <h2>Miten varmistatte puolueettomuuden?</h2>
          <p>
            Vertailemme liittymiä objektiivisin kriteerein: hinta, datamäärä, nopeus ja
            ominaisuudet. Emme suosi mitään operaattoria. Kaikki operaattorit näytetään samoilla
            kriteereillä, ja käyttäjä voi itse suodattaa ja lajitella tuloksia.
          </p>

          <h2>Osa Valitse-verkostoa</h2>
          <p>
            Valitse Liittymä on osa Valitse-verkostoa, johon kuuluvat
            myös Valitse Sähkö (sähkövertailu), Valitse Vakuutus, Valitse Laina ja
            muut palvelut. Tavoitteemme on auttaa suomalaisia kuluttajia tekemään parempia
            päätöksiä ja säästämään arjen kuluissa.
          </p>

          <h2>Yhteystiedot</h2>
          <p>
            Sonodo — Henri Linnainmaa<br />
            Helsinki, Suomi<br />
            Sähköposti: info@valitseliittyma.fi
          </p>
        </article>
      </div>
    </div>
  );
}
