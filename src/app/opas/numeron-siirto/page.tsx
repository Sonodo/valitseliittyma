import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Numeron siirto — Näin siirrät numeron uudelle operaattorille',
  description:
    'Opas numeron siirtoon operaattorilta toiselle. Miten numeron siirto toimii, kauanko se kestää ja mitä se maksaa.',
  alternates: { canonical: '/opas/numeron-siirto' },
};

export default function NumeronSiirtoPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Numeron siirto — Opas numeronsiirrettävyyteen
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Numeronsiirrettävyys (MNP, Mobile Number Portability) tarkoittaa, että voit vaihtaa
          operaattoria ja pitää saman puhelinnumeron. Tämä on lakisääteinen oikeus Suomessa.
        </p>

        <article className="mt-10 prose prose-slate prose-lg max-w-none">
          <h2>Miten numeron siirto toimii?</h2>
          <p>
            Kun tilaat uuden liittymän ja valitset numeronsiirron, uusi operaattori lähettää
            siirtopyynnön vanhalle operaattorille. Vanha operaattori on velvoitettu siirtämään
            numerosi. Sinun ei tarvitse itse tehdä mitään vanhan operaattorin suuntaan.
          </p>

          <h2>Numeron siirron vaiheet</h2>
          <ol>
            <li>Tilaa uusi liittymä haluamaltasi operaattorilta</li>
            <li>Ilmoita nykyinen puhelinnumerosi siirrettäväksi</li>
            <li>Uusi operaattori käsittelee siirtopyynnön (1–5 arkipäivää)</li>
            <li>Saat ilmoituksen, kun siirto on valmis</li>
            <li>Vaihda uusi SIM-kortti puhelimeesi</li>
          </ol>

          <h2>Kauanko numeron siirto kestää?</h2>
          <p>
            Traficomin säännösten mukaan numeron siirto saa kestää enintään 5 arkipäivää.
            Käytännössä siirto hoituu usein 1–3 arkipäivässä. Joissain tapauksissa siirto
            voidaan tehdä jopa saman päivän aikana.
          </p>

          <h2>Mitä numeron siirto maksaa?</h2>
          <p>
            Numeron siirto on kuluttajalle ilmainen. Et maksa siitä vanhalle etkä uudelle
            operaattorille. Tämä on laissa säädetty oikeus.
          </p>

          <h2>Milloin numeron siirtoa ei voi tehdä?</h2>
          <ul>
            <li>Jos liittymässä on maksamattomia laskuja (vanha operaattori voi estää)</li>
            <li>Jos liittymä on jonkun toisen nimissä — sinun on oltava liittymän haltija</li>
            <li>Prepaid-liittymien osalta voi olla erityisehtoja</li>
          </ul>

          <h2>Vinkit</h2>
          <ul>
            <li>Tee siirto arkena — nopeutuu merkittävästi</li>
            <li>Varmista, ettei vanhalla liittymällä ole maksamattomia laskuja</li>
            <li>Tilaa uusi SIM etukäteen, niin se on valmiina kun siirto aktivoituu</li>
            <li>eSIM nopeuttaa prosessia — ei tarvitse odottaa postia</li>
          </ul>

          <p>
            <Link href="/puhelinliittymat" className="text-cyan-600 hover:text-cyan-700">
              Vertaa liittymiä ja aloita vaihto &rarr;
            </Link>
          </p>
        </article>
      </div>
    </div>
  );
}
