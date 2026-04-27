import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Käyttöehdot — Valitse Liittymä',
  description: 'Valitse Liittymän käyttöehdot. Palvelun käyttöä koskevat ehdot ja vastuunrajoitukset.',
  alternates: { canonical: '/kayttoehdot' },
};

export default function KayttoehdotPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Käyttöehdot
        </h1>
        <p className="mt-4 text-sm text-slate-500">Päivitetty 1.1.2026</p>

        <article className="mt-10 prose prose-slate max-w-none">
          <h2>1. Palveluntarjoaja</h2>
          <p>
            Sonodo (toiminimi)<br />
            Helsinki, Suomi
          </p>

          <h2>2. Palvelun kuvaus</h2>
          <p>
            Valitse Liittymä on ilmainen verkkopalvelu, joka vertailee puhelinliittymiä
            ja laajakaistaliittymiä Suomessa. Palvelu on tarkoitettu kuluttajille päätöksenteon tueksi.
          </p>

          <h2>3. Käyttöehdot</h2>
          <p>
            Käyttämällä palvelua hyväksyt nämä käyttöehdot. Jos et hyväksy ehtoja,
            älä käytä palvelua.
          </p>

          <h2>4. Tietojen tarkkuus</h2>
          <p>
            Pyrimme pitämään vertailutiedot mahdollisimman ajantasaisina ja tarkkoina.
            Emme kuitenkaan takaa tietojen virheettömyyttä. Operaattorit voivat muuttaa
            hintojaan ja ehtojaan ilman ennakkoilmoitusta. Tarkista aina ajantasaiset
            tiedot suoraan operaattorin verkkosivuilta ennen tilausta.
          </p>

          <h2>5. Vastuunrajoitus</h2>
          <p>
            Valitse Liittymä ei ole osapuolena käyttäjän ja operaattorin välisessä
            sopimussuhteessa. Emme vastaa operaattoreiden tuotteiden tai palveluiden
            laadusta, hinnoista tai saatavuudesta. Palvelua käytetään omalla vastuulla.
          </p>

          <h2>6. Kaupalliset linkit</h2>
          <p>
            Palvelu voi sisältää kaupallisia linkkejä operaattoreiden sivuille, ja
            palveluntarjoaja voi saada korvauksen linkin kautta tehdystä tilauksesta.
          </p>

          <h2>7. Tekijänoikeudet</h2>
          <p>
            Kaikki palvelun sisältö (tekstit, kuvat, koodi) on tekijänoikeudella suojattua.
            Sisällön kopioiminen, levittäminen tai muokkaaminen ilman lupaa on kiellettyä.
          </p>

          <h2>8. Ehtojen muutokset</h2>
          <p>
            Pidätämme oikeuden muuttaa käyttöehtoja. Olennaisista muutoksista
            ilmoitetaan palvelussa.
          </p>

          <h2>9. Sovellettava laki</h2>
          <p>
            Näihin käyttöehtoihin sovelletaan Suomen lakia.
          </p>
        </article>
      </div>
    </div>
  );
}
