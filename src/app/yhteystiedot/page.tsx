import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Yhteystiedot — Valitse Liittymä',
  description:
    'Valitse Liittymän yhteystiedot. Ota yhteyttä palautteen, kysymysten tai yhteistyöehdotusten merkeissä.',
  alternates: { canonical: '/yhteystiedot' },
};

export default function YhteystiedotPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Yhteystiedot
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Valitse Liittymä on Sonodo-nimisen yritystoiminnan ylläpitämä ilmainen
          vertailupalvelu. Otamme mielellämme vastaan palautetta, korjausehdotuksia ja
          yhteistyökyselyjä.
        </p>

        <article className="mt-10 prose prose-slate prose-lg max-w-none">
          <h2>Palvelun ylläpitäjä</h2>
          <p>
            <strong>Sonodo</strong> — Henri Linnainmaa<br />
            Helsinki, Suomi
          </p>

          <h2>Sähköposti</h2>
          <p>
            Yleiset yhteydenotot ja palaute:{' '}
            <a
              href="mailto:info@valitseliittyma.fi"
              className="text-cyan-600 hover:text-cyan-700"
            >
              info@valitseliittyma.fi
            </a>
          </p>

          <h2>Tietosuoja</h2>
          <p>
            Tietosuojaan liittyvät kyselyt ja rekisteröidyn oikeuksien käyttäminen:{' '}
            <a
              href="mailto:tietosuoja@valitseliittyma.fi"
              className="text-cyan-600 hover:text-cyan-700"
            >
              tietosuoja@valitseliittyma.fi
            </a>
          </p>

          <h2>Vastausaika</h2>
          <p>
            Pyrimme vastaamaan viestiin yhden arkipäivän kuluessa. Kiireelliset viestit
            kannattaa merkitä otsikkoon.
          </p>

          <h2>Yhteistyökumppaneille</h2>
          <p>
            Mikäli olet operaattori tai haluat kertoa tuotteestasi, lähetä tarjous osoitteeseen
            info@valitseliittyma.fi. Kaikki yhteistyöt noudattavat palvelun riippumattomuus- ja
            avoimuusperiaatteita.
          </p>
        </article>
      </div>
    </div>
  );
}
