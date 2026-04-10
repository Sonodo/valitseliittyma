import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Puhelinliittymän vaihto — Näin vaihdat operaattoria helposti',
  description:
    'Opas puhelinliittymän vaihtoon. Numeron siirto, irtisanominen, aikataulut ja vinkit operaattorin vaihtoon Suomessa.',
  alternates: { canonical: '/opas/puhelinliittyman-vaihto' },
};

export default function PuhelinliittymanVaihtoPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Puhelinliittymän vaihto — Näin vaihdat operaattoria
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Operaattorin vaihto on Suomessa helppoa ja nopeaa. Tässä oppaassa kerromme kaikki
          vaiheet, joilla vaihdat liittymän sujuvasti.
        </p>

        <article className="mt-10 prose prose-slate prose-lg max-w-none">
          <h2>1. Valitse uusi liittymä</h2>
          <p>
            Ensimmäinen askel on valita uusi operaattori ja liittymä. Käytä{' '}
            <Link href="/puhelinliittymat">liittymävertailuamme</Link> löytääksesi parhaan
            vaihtoehdon. Mieti, paljonko dataa tarvitset, tarvitsetko 5G:tä ja mikä on budjettisi.
          </p>

          <h2>2. Tilaa uusi liittymä numeronsiirrolla</h2>
          <p>
            Kun tilaat uuden liittymän, valitse numeronsiirto (numeron siirto vanhalta operaattorilta).
            Uusi operaattori hoitaa vanhan liittymän irtisanomisen puolestasi. Et tarvitse itse
            ottaa yhteyttä vanhaan operaattoriin.
          </p>

          <h2>3. Numeron siirto tapahtuu 1–5 arkipäivässä</h2>
          <p>
            Numeron siirto kestää tyypillisesti 1–5 arkipäivää. Siirron aikana puhelimesi toimii
            normaalisti vanhalla liittymällä. Kun siirto on valmis, vanha SIM-kortti lakkaa
            toimimasta ja uusi aktivoituu.
          </p>

          <h2>4. Aktivoi uusi SIM-kortti</h2>
          <p>
            Uusi operaattori lähettää sinulle SIM-kortin (tai eSIM-aktivointikoodin). Asenna
            se puhelimeesi. Monilla operaattoreilla voit myös noutaa SIM-kortin myymälästä tai
            aktivoida eSIM:in heti.
          </p>

          <h2>Huomioitavaa</h2>
          <ul>
            <li>
              <strong>Määräaikaiset sopimukset:</strong> Jos sinulla on 24 kk sopimus, tarkista
              jäljellä oleva sopimuskausi. Ennenaikainen irtisanominen voi aiheuttaa kuluja.
            </li>
            <li>
              <strong>Laitelaskut:</strong> Puhelimen osamaksut jatkuvat, vaikka vaihdat
              liittymän. Ne eivät ole sidottuja liittymään.
            </li>
            <li>
              <strong>Yritysnumerot:</strong> Jos numero on yrityksen nimissä, yrityksen
              vastuuhenkilön on hyväksyttävä siirto.
            </li>
          </ul>

          <h2>Usein kysytyt kysymykset</h2>
          <h3>Vaihtuuko numeroni?</h3>
          <p>
            Ei. Numeron siirron avulla pidät saman numeron. Tämä on lakisääteinen oikeus
            Suomessa.
          </p>

          <h3>Kauanko vaihto kestää?</h3>
          <p>
            Numeron siirto kestää 1–5 arkipäivää. Jos tilaat uuden liittymän uudella numerolla,
            se aktivoituu välittömästi.
          </p>

          <h3>Mitä jos olen maalla/ulkomailla vaihdon aikana?</h3>
          <p>
            Vaihdon aikana puhelimesi toimii normaalisti. Vaihto tapahtuu taustalla, ja sinulle
            ilmoitetaan, kun uusi liittymä on aktiivinen.
          </p>
        </article>
      </div>
    </div>
  );
}
