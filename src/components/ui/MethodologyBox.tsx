import { Info } from 'lucide-react';

interface MethodologyBoxProps {
  /** The superlative term being justified, e.g. "halvin", "paras 5G". */
  superlative: string;
  /** Number of operators in the comparison pool. */
  operatorCount: number;
  /** Number of plans in the comparison pool. */
  planCount: number;
  /** One-sentence description of the ranking method. */
  methodology: string;
  /** Optional explicit verification date. Defaults to the current date. */
  verifiedOn?: string;
}

/**
 * KKV-friendly methodology/evidence block shown above the fold on every
 * superlative landing page. Surfaces: (1) scope, (2) verification date,
 * (3) ranking methodology, (4) subject-to-change disclaimer.
 */
export default function MethodologyBox({
  superlative,
  operatorCount,
  planCount,
  methodology,
  verifiedOn,
}: MethodologyBoxProps) {
  const date =
    verifiedOn ?? new Date().toLocaleDateString('fi-FI', { day: 'numeric', month: 'numeric', year: 'numeric' });

  return (
    <aside
      className="mb-10 rounded-2xl border border-cyan-200 bg-cyan-50 p-5 text-sm text-slate-700"
      aria-label="Vertailun menetelmä ja laajuus"
    >
      <div className="mb-2 flex items-center gap-2 text-cyan-800">
        <Info className="h-4 w-4" aria-hidden />
        <p className="font-semibold">Näin vertailu on tehty</p>
      </div>
      <ul className="space-y-1.5 leading-6 marker:text-cyan-500">
        <li>
          <strong>Laajuus:</strong> Vertailussa {operatorCount} suomalaista operaattoria ja{' '}
          {planCount} liittymää.
        </li>
        <li>
          <strong>Menetelmä:</strong> {methodology}
        </li>
        <li>
          <strong>Hintatiedot tarkistettu:</strong> {date}. Operaattoreiden kampanjat ja hinnat
          voivat muuttua — tarkista aina ajantasainen hinta operaattorin sivuilta ennen tilausta.
        </li>
        <li>
          <strong>Termistä &quot;{superlative}&quot;:</strong> Termi viittaa yllä kuvattuun,
          tilauslähetyshetkellä voimassa olevaan vertailuun — ei ikuisiin totuuksiin.
        </li>
      </ul>
    </aside>
  );
}
