import type { Metadata } from 'next';
import {
  PUBLISHER_ORGANIZATION_SCHEMA,
  breadcrumbSchema,
} from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Yhteystiedot — Valitse Liittymä',
  description:
    'Valitse Liittymän yhteystiedot. Sonodo (Y-tunnus 2887416-4). Ota yhteyttä palautteen, kysymysten tai yhteistyöehdotusten merkeissä.',
  alternates: { canonical: '/yhteystiedot' },
};

export default function YhteystiedotPage() {
  const breadcrumbLd = breadcrumbSchema([
    { name: 'Etusivu', url: '/' },
    { name: 'Yhteystiedot', url: '/yhteystiedot' },
  ]);

  return (
    <div className="py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PUBLISHER_ORGANIZATION_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Yhteystiedot
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Valitse Liittymä on Sonodo-toiminimen ylläpitämä riippumaton vertailupalvelu.
          Otamme mielellämme vastaan palautetta, korjausehdotuksia ja yhteistyökyselyjä.
        </p>

        <article className="mt-10 prose prose-slate prose-lg max-w-none">
          <h2>Palvelun ylläpitäjä</h2>
          <p>
            <strong>Sonodo</strong> (toiminimi)<br />
            Y-tunnus: 2887416-4<br />
            Helsinki, Suomi
          </p>

          <h2>Toimitus</h2>
          <p>
            Valitse Liittymän sisällöstä ja vertailumenetelmistä vastaa Sonodon
            toimitus. Tutustu toimituksen periaatteisiin{' '}
            <a href="/tietoa" className="text-cyan-700 hover:underline">
              tietoa-sivulla
            </a>
            .
          </p>

          <h2>Sähköposti</h2>
          <p>
            Yleiset yhteydenotot, palaute ja toimitukselliset asiat:{' '}
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
            kannattaa merkitä otsikkoon. Virheilmoitukset (esim. virheellinen liittymähinta
            tai vanhentunut tieto) käsitellään etusijalla.
          </p>

          <h2>Yhteistyökumppaneille</h2>
          <p>
            Mikäli olet operaattori tai haluat kertoa tuotteestasi, lähetä tarjous
            osoitteeseen info@valitseliittyma.fi. Kaikki yhteistyöt noudattavat palvelun
            riippumattomuus- ja avoimuusperiaatteita: kaupallinen yhteistyö ei vaikuta
            vertailun järjestykseen, ja mainoslinkit on aina merkitty selvästi.
          </p>

          <h2>Vertailun valvonta ja kuluttajan oikeudet</h2>
          <p>
            Suomen telekommunikaatiomarkkinaa valvoo Liikenne- ja viestintävirasto
            <strong> Traficom</strong>. Kuluttajansuojaa valvoo
            <strong> Kilpailu- ja kuluttajavirasto (KKV)</strong>. Operaattoria koskevat
            kuluttajariidat voi viedä kuluttajariitalautakuntaan tai KKV:n
            kuluttajaneuvontaan.
          </p>
        </article>
      </div>
    </div>
  );
}
