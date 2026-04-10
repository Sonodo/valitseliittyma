import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '5G-opas — Mitä 5G on ja tarvitsetko sitä?',
  description:
    'Kattava 5G-opas: mitä 5G tarkoittaa, miten se eroaa 4G:stä, missä 5G toimii Suomessa ja kannattaako sinun vaihtaa 5G-liittymään.',
  alternates: { canonical: '/opas/5g-opas' },
};

export default function Opas5GPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          5G-opas — Mitä 5G on ja tarvitsetko sitä?
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          5G on viidennen sukupolven mobiiliverkkoteknologia. Se tarjoaa nopeammat yhteydet,
          pienemmän viiveen ja enemmän kapasiteettia kuin edeltäjänsä 4G.
        </p>

        <article className="mt-10 prose prose-slate prose-lg max-w-none">
          <h2>Mikä on 5G?</h2>
          <p>
            5G (Fifth Generation) on uusin mobiiliverkkoteknologia. Se tarjoaa teoriassa jopa
            10 Gbit/s nopeuksia, alle 1 ms viiveen ja mahdollisuuden yhdistää miljoonia laitteita
            neliökilometrille. Käytännössä kuluttajille 5G näkyy nopeampina yhteyksinä (200–1000 Mbit/s)
            ja parempana verkon suorituskykynä ruuhkaisissa tilanteissa.
          </p>

          <h2>5G vs 4G — mitä eroa on?</h2>
          <table>
            <thead>
              <tr><th>Ominaisuus</th><th>4G</th><th>5G</th></tr>
            </thead>
            <tbody>
              <tr><td>Maksiminopeus</td><td>100–300 Mbit/s</td><td>300–1000+ Mbit/s</td></tr>
              <tr><td>Viive (latenssi)</td><td>30–50 ms</td><td>1–10 ms</td></tr>
              <tr><td>Kapasiteetti</td><td>Hyvä</td><td>Erinomainen</td></tr>
              <tr><td>Kattavuus</td><td>Koko Suomi</td><td>Kaupungit + kasvava</td></tr>
            </tbody>
          </table>

          <h2>5G Suomessa 2026</h2>
          <p>
            Kaikki kolme suurta operaattoria (Elisa, DNA, Telia) ovat rakentaneet laajat 5G-verkot
            Suomeen. Vuonna 2026 5G kattaa jo suurimman osan väestöstä:
          </p>
          <ul>
            <li><strong>Elisa:</strong> 300+ paikkakuntaa, Suomen laajin 5G</li>
            <li><strong>DNA:</strong> 250+ paikkakuntaa</li>
            <li><strong>Telia:</strong> 200+ paikkakuntaa</li>
          </ul>
          <p>
            Kaikissa 10 suurimmassa kaupungissa on kaikkien kolmen operaattorin 5G-verkko.
          </p>

          <h2>Tarvitsetko 5G:tä?</h2>
          <h3>5G kannattaa, jos...</h3>
          <ul>
            <li>Käytät paljon dataa (suoratoisto, pelaaminen, etätyö)</li>
            <li>Haluat nopeimman mahdollisen yhteyden</li>
            <li>Asut kaupungissa, jossa 5G-kattavuus on hyvä</li>
            <li>Sinulla on 5G-yhteensopiva puhelin</li>
          </ul>

          <h3>4G riittää, jos...</h3>
          <ul>
            <li>Käyttösi on perustason (some, viestit, kevyt selaus)</li>
            <li>Asut alueella, jossa 5G-kattavuutta ei vielä ole</li>
            <li>Haluat säästää liittymäkuluissa</li>
          </ul>

          <h2>5G-liittymän hinta</h2>
          <p>
            5G-liittymät maksavat noin 27–50 €/kk riippuen nopeudesta ja operaattorista.
            Oomi Mobiili tarjoaa 5G-liittymän alkaen 26,99 €/kk ja DNA:lta saat 5G:n alkaen 27,90 €/kk.
          </p>

          <p>
            <Link href="/paras-5g-liittyma" className="text-cyan-600 hover:text-cyan-700">
              Vertaa 5G-liittymiä &rarr;
            </Link>
          </p>

          <h2>Tarvitsetko uuden puhelimen?</h2>
          <p>
            Kyllä — 5G vaatii 5G-yhteensopivan puhelimen. Vuonna 2026 lähes kaikki uudet
            älypuhelimet tukevat 5G:tä, mukaan lukien edulliset mallit. Jos puhelimesi on
            vuodelta 2020 tai vanhempi, se ei todennäköisesti tue 5G:tä.
          </p>
        </article>
      </div>
    </div>
  );
}
