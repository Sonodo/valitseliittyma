import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tietosuojaseloste — Valitse Liittymä',
  description: 'Valitse Puhelimen tietosuojaseloste. Kerromme, miten käsittelemme henkilötietojasi.',
  alternates: { canonical: '/tietosuoja' },
};

export default function TietosuojaPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Tietosuojaseloste
        </h1>
        <p className="mt-4 text-sm text-slate-500">Päivitetty 1.1.2026</p>

        <article className="mt-10 prose prose-slate max-w-none">
          <h2>1. Rekisterinpitäjä</h2>
          <p>
            Sonodo — Henri Linnainmaa<br />
            Helsinki, Suomi<br />
            Sähköposti: info@valitseliittyma.fi
          </p>

          <h2>2. Mitä tietoja keräämme?</h2>
          <p>
            Valitse Liittymä kerää seuraavia tietoja palvelun käytöstä:
          </p>
          <ul>
            <li>Evästeisiin perustuva analytiikkadata (vierailut, sivunäkymät)</li>
            <li>Tekniset tiedot (selaintyyppi, käyttöjärjestelmä, IP-osoite)</li>
            <li>Käyttäjän tekemät valinnat vertailutyökalussa</li>
          </ul>

          <h2>3. Mihin tietoja käytetään?</h2>
          <ul>
            <li>Palvelun toiminnan varmistaminen ja kehittäminen</li>
            <li>Kävijäanalytiikka ja palvelun parantaminen</li>
            <li>Mainosten kohdentaminen (evästeiden suostumuksella)</li>
          </ul>

          <h2>4. Evästeet</h2>
          <p>
            Käytämme evästeitä palvelun toiminnan varmistamiseksi ja kävijäanalytiikkaan.
            Voit hallita evästeasetuksiasi selaimesi asetuksista. Välttämättömät evästeet
            ovat tarpeen palvelun toiminnalle.
          </p>

          <h2>5. Tietojen luovutus</h2>
          <p>
            Emme luovuta henkilötietoja kolmansille osapuolille, paitsi:
          </p>
          <ul>
            <li>Analytiikkapalveluille (anonymisoitu data)</li>
            <li>Lain vaatimissa tilanteissa viranomaisille</li>
          </ul>

          <h2>6. Tietojen säilytys</h2>
          <p>
            Analytiikkadata säilytetään enintään 26 kuukautta. Evästeet vanhenevat
            selaimen asetusten ja evästetyypin mukaan.
          </p>

          <h2>7. Rekisteröidyn oikeudet</h2>
          <p>
            Sinulla on oikeus tarkastaa, oikaista ja poistaa tietosi. Voit myös vastustaa
            tietojen käsittelyä. Ota yhteyttä: info@valitseliittyma.fi.
          </p>

          <h2>8. Muutokset</h2>
          <p>
            Pidätämme oikeuden päivittää tietosuojaselostetta. Olennaisista muutoksista
            ilmoitetaan palvelussa.
          </p>
        </article>
      </div>
    </div>
  );
}
