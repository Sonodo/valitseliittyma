import type { Metadata } from 'next';
import Link from 'next/link';
import {
  HENRI_PERSON_SCHEMA,
  PUBLISHER_ORGANIZATION_SCHEMA,
  breadcrumbSchema,
} from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Tietoa palvelusta ja toimituksen periaatteet — Valitse Liittymä',
  description:
    'Valitse Liittymä on riippumaton puhelinliittymien ja laajakaistojen vertailupalvelu. Tutustu toimituksen periaatteisiin, vertailumenetelmään ja vastaavaan päätoimittajaan.',
  alternates: { canonical: '/tietoa' },
};

export default function TietoaPage() {
  const breadcrumbLd = breadcrumbSchema([
    { name: 'Etusivu', url: '/' },
    { name: 'Tietoa palvelusta', url: '/tietoa' },
  ]);

  return (
    <div className="py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PUBLISHER_ORGANIZATION_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HENRI_PERSON_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Tietoa Valitse Liittymä -palvelusta
        </h1>

        <article className="mt-10 prose prose-slate prose-lg max-w-none">
          <h2>Mikä on Valitse Liittymä?</h2>
          <p>
            Valitse Liittymä on riippumaton verkkopalvelu, joka auttaa suomalaisia
            kuluttajia löytämään sopivimman puhelinliittymän ja laajakaistan. Vertailemme
            Suomen merkittävimpien matkapuhelin- ja laajakaistaoperaattoreiden liittymiä
            yhdessä paikassa. Palvelu on kuluttajalle ilmainen.
          </p>

          <h2>Miten palvelu toimii?</h2>
          <p>
            Keräämme tiedot suoraan operaattoreiden virallisilta verkkosivuilta ja
            päivitämme ne säännöllisesti. Vertailussa ovat mukana suurimmat
            kantaverkkooperaattorit Elisa, DNA ja Telia sekä virtuaalioperaattorit
            (MVNO:t) Moi Mobiili, Giga Mobiili, Oomi Mobiili ja Globetel sekä
            laajakaistaoperaattori Valoo. Selvyyden vuoksi: Suomen telekommunikaatiota
            valvoo <strong>Traficom</strong> (Liikenne- ja viestintävirasto), ja
            kuluttajansuojaa valvoo <strong>Kilpailu- ja kuluttajavirasto (KKV)</strong>.
          </p>

          <h2 id="ranking">Toimituksen periaatteet</h2>
          <p>
            Valitse Liittymän toimitus noudattaa seuraavia periaatteita, jotta
            vertailu pysyy luotettavana ja kuluttajalle hyödyllisenä:
          </p>

          <h3>1. Riippumaton järjestys</h3>
          <p>
            Liittymien oletusjärjestys perustuu objektiivisiin kriteereihin:
            kuukausihintaan, datamäärään, nopeuteen ja sopimusehtoihin. Sama menetelmä
            koskee jokaista liittymää operaattorista riippumatta. Käyttäjä voi
            suodattaa ja lajitella tuloksia oman tarpeensa mukaan.
          </p>

          <h3>2. Avoin kaupallinen yhteistyö</h3>
          <p>
            Osa operaattoreista on vertailussa kumppaneitamme — saamme provision
            siirtymisestä operaattorin sivulle (ns. affiliate-tulo). Tämä yhteistyö
            ei vaikuta järjestykseen eikä siihen, mitä tietoja liittymistä esitetään.
            Mainoslinkit on merkitty selkeästi <em>&quot;Mainos&quot;</em>-tunnisteella ja toteutettu
            <code>rel=&quot;sponsored&quot;</code>-attribuutilla hakukoneiden ohjeen mukaisesti.
            Otamme vertailuun mukaan myös ne operaattorit, joiden kanssa meillä ei ole
            kaupallista yhteistyötä, jotta vertailu pysyy kattavana.
          </p>

          <h3>3. Päivitysvälit</h3>
          <p>
            Liittymähinnat ja -ehdot tarkistetaan suoraan operaattoreiden virallisilta
            sivuilta vähintään kerran kuukaudessa, ja merkittävät kampanjat päivitetään
            nopeammin. Hinnat ja kampanjat voivat kuitenkin muuttua nopeasti, joten
            kehotamme aina varmistamaan ajantasaisen hinnan operaattorin sivulta ennen
            tilausta.
          </p>

          <h3>4. Virheiden korjaaminen</h3>
          <p>
            Jos huomaat virheellistä tietoa, ilmoita siitä osoitteeseen
            <a href="mailto:info@valitseliittyma.fi"> info@valitseliittyma.fi</a>.
            Pyrimme tarkistamaan ja korjaamaan virheet yhden arkipäivän kuluessa
            ilmoituksesta.
          </p>

          <h3>5. Valitusten käsittely</h3>
          <p>
            Palautetta ja reklamaatioita käsittelee toimituksen vastaava henkilö.
            Valitukset käsitellään luottamuksellisesti, ja vastaamme yhden arkipäivän
            kuluessa. Kuluttajan oikeudet operaattoria vastaan koskevia riitatilanteita
            voi viedä kuluttajariitalautakuntaan tai KKV:n kuluttajaneuvontaan.
          </p>

          <h2>Vastaava päätoimittaja</h2>
          <div className="not-prose mt-4 rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
            <h3 className="text-xl font-bold text-slate-900">Henri Linnainmaa</h3>
            <p className="mt-1 text-sm font-medium text-cyan-700">
              KTM (Aalto-yliopisto) — Vastaava päätoimittaja
            </p>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-700">
              <p>
                Henri Linnainmaa on kauppatieteiden maisteri Aalto-yliopistosta. Hän on
                urallaan konsultoinut yrityksiä tekoälyn soveltamisessa liiketoimintaan ja
                rakentanut kymmeniä tekoälypohjaisia tiedonkeruu- ja analyysiratkaisuja
                yrityskäyttöön muun muassa raportointiin, datavalidointiin ja markkinointiin.
              </p>
              <p>
                Vastaavana päätoimittajana Henri vastaa siitä, että Valitse Liittymän
                vertailut perustuvat tarkistettuihin tietoihin ja että toimituksen
                periaatteita noudatetaan kaikessa sisällöntuotannossa. Hänen
                lähestymistapansa yhdistää huolellisen menetelmäsuunnittelun, laajan
                lähdetarkistuksen ja jatkuvan iteratiivisen kehittämisen — sama
                data-analyyttinen työtapa, joka on tunnusomaista Valitse-verkostolle.
              </p>
              <p>
                Yhteydenotot päätoimittajaan:{' '}
                <a
                  href="mailto:info@valitseliittyma.fi"
                  className="font-semibold text-cyan-700 hover:underline"
                >
                  info@valitseliittyma.fi
                </a>
                .
              </p>
            </div>
          </div>

          <h2>Onko palvelu ilmainen?</h2>
          <p>
            Kyllä. Valitse Liittymä on kuluttajalle täysin ilmainen — ei maksuja, ei
            rekisteröitymistä, ei sitoumusta. Palvelun ylläpitokulut katetaan
            operaattoreiden affiliate-yhteistöillä, jotka eivät vaikuta vertailun
            järjestykseen.
          </p>

          <h2>Osa Valitse-verkostoa</h2>
          <p>
            Valitse Liittymä on osa Valitse-verkostoa, johon kuuluvat
            myös Valitse Sähkö (sähkövertailu), Valitse Vakuutus, Valitse Laina ja
            muut palvelut. Tavoitteemme on auttaa suomalaisia kuluttajia tekemään parempia
            päätöksiä ja säästämään arjen kuluissa.
          </p>

          <h2>Yhteystiedot ja vastuuhenkilö</h2>
          <p>
            <strong>Sonodo</strong> (toiminimi)<br />
            Y-tunnus: 2887416-4<br />
            Helsinki, Suomi<br />
            Vastaava päätoimittaja: Henri Linnainmaa, KTM<br />
            Sähköposti:{' '}
            <a
              href="mailto:info@valitseliittyma.fi"
              className="text-cyan-700 hover:underline"
            >
              info@valitseliittyma.fi
            </a>
          </p>

          <p className="text-sm text-slate-500">
            Lisätietoa yhteistyöstä ja palautteenannosta löytyy{' '}
            <Link href="/yhteystiedot" className="text-cyan-700 hover:underline">
              yhteystietosivulta
            </Link>
            . Sanasto teknisistä termeistä:{' '}
            <Link href="/sanasto" className="text-cyan-700 hover:underline">
              /sanasto
            </Link>
            .
          </p>
        </article>
      </div>
    </div>
  );
}
