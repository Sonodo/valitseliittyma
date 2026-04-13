import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tietoa palvelusta — Valitse Liittymä',
  description:
    'Valitse Liittymä on ilmainen ja kattava puhelinliittymien ja laajakaistojen vertailupalvelu Suomessa.',
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
            Valitse Liittymä on ilmainen verkkopalvelu, joka auttaa suomalaisia
            kuluttajia löytämään sopivimman puhelinliittymän ja laajakaistan. Vertailemme
            merkittävimpien Suomen operaattoreiden liittymiä yhdessä paikassa.
          </p>

          <h2>Miten palvelu toimii?</h2>
          <p>
            Keräämme tiedot suoraan operaattoreiden verkkosivuilta ja päivitämme ne säännöllisesti.
            Vertailussa ovat mukana merkittävimmät operaattorit: Elisa, DNA, Telia sekä
            budjettioperaattorit Moi Mobiili, Giga Mobiili, Oomi Mobiili ja Globetel.
          </p>

          <h2>Onko palvelu ilmainen?</h2>
          <p>
            Kyllä. Valitse Liittymä on täysin ilmainen käyttää — ei maksuja, ei
            rekisteröitymistä, ei sitoumusta.
          </p>

          <h2>Mihin vertailun järjestys perustuu?</h2>
          <p>
            Vertailun järjestys perustuu objektiivisiin kriteereihin: hintaan, datamäärään,
            nopeuteen ja ominaisuuksiin. Sama menetelmä koskee jokaista liittymää. Käyttäjä
            voi itse suodattaa ja lajitella tuloksia oman käyttötarpeensa mukaan.
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
            <a href="/yhteystiedot" className="text-blue-600 hover:underline">Ota yhteyttä</a>
          </p>
        </article>
      </div>
    </div>
  );
}
