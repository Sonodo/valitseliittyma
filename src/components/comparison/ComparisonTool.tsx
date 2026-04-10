'use client';

import { useState } from 'react';
import { mobilePlans } from '@/data/mobile-plans';
import { getOperatorById } from '@/data/operators';
import { formatData, formatSpeed } from '@/lib/utils';
import { Check, X, Plus } from 'lucide-react';
import type { MobilePlan } from '@/types';

export default function ComparisonTool() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const addPlan = (planId: string) => {
    if (selectedIds.length < 3 && !selectedIds.includes(planId)) {
      setSelectedIds([...selectedIds, planId]);
    }
  };

  const removePlan = (planId: string) => {
    setSelectedIds(selectedIds.filter((id) => id !== planId));
  };

  const selectedPlans = selectedIds
    .map((id) => mobilePlans.find((p) => p.id === id))
    .filter(Boolean) as MobilePlan[];

  return (
    <div>
      {/* Plan selector */}
      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-slate-900">
          Valitse liittymiä vertailuun (max 3)
        </h2>
        <select
          onChange={(e) => {
            if (e.target.value) addPlan(e.target.value);
            e.target.value = '';
          }}
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm sm:max-w-md"
          disabled={selectedIds.length >= 3}
        >
          <option value="">Valitse liittymä...</option>
          {mobilePlans
            .filter((p) => !selectedIds.includes(p.id))
            .map((plan) => {
              const op = getOperatorById(plan.operatorId);
              return (
                <option key={plan.id} value={plan.id}>
                  {op?.name} — {plan.name} ({plan.monthlyPrice.toFixed(2).replace('.', ',')} €/kk)
                </option>
              );
            })}
        </select>

        {selectedIds.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedPlans.map((plan) => (
              <span
                key={plan.id}
                className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-3 py-1.5 text-sm font-medium text-cyan-700"
              >
                {plan.name}
                <button onClick={() => removePlan(plan.id)} className="hover:text-cyan-900">
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Comparison table */}
      {selectedPlans.length >= 2 ? (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                  Ominaisuus
                </th>
                {selectedPlans.map((plan) => (
                  <th key={plan.id} className="px-6 py-4 text-center text-sm font-semibold text-slate-900">
                    <div>{plan.name}</div>
                    <div className="mt-1 text-xs font-normal text-slate-500">
                      {getOperatorById(plan.operatorId)?.name}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <CompRow label="Kuukausihinta" values={selectedPlans.map((p) => `${p.monthlyPrice.toFixed(2).replace('.', ',')} €/kk`)} />
              <CompRow label="Data" values={selectedPlans.map((p) => formatData(p.dataAmount))} />
              <CompRow label="Maksiminopeus" values={selectedPlans.map((p) => formatSpeed(p.maxSpeed))} />
              <CompRow label="5G" values={selectedPlans.map((p) => p.has5G ? 'Kyllä' : 'Ei')} highlight5G />
              <CompRow label="Puhelut" values={selectedPlans.map((p) => p.callsIncluded)} />
              <CompRow label="Viestit" values={selectedPlans.map((p) => p.smsIncluded)} />
              <CompRow label="EU-roaming" values={selectedPlans.map((p) => `${p.euRoamingData} Gt`)} />
              <CompRow label="Sopimus" values={selectedPlans.map((p) => p.contractType === 'no-commitment' ? 'Ei sitoutumista' : '24 kk')} />
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
          <Plus className="mx-auto mb-3 h-8 w-8 text-slate-400" />
          <p className="text-lg font-semibold text-slate-700">Valitse vähintään 2 liittymää</p>
          <p className="mt-1 text-sm text-slate-500">Vertaile liittymiä rinnakkain valitsemalla ne yllä olevasta valikosta.</p>
        </div>
      )}
    </div>
  );
}

function CompRow({ label, values, highlight5G }: { label: string; values: string[]; highlight5G?: boolean }) {
  return (
    <tr>
      <td className="px-6 py-3 text-sm font-medium text-slate-700">{label}</td>
      {values.map((val, i) => (
        <td key={i} className="px-6 py-3 text-center text-sm text-slate-900">
          {highlight5G ? (
            val === 'Kyllä' ? (
              <Check className="mx-auto h-5 w-5 text-emerald-500" />
            ) : (
              <X className="mx-auto h-5 w-5 text-slate-300" />
            )
          ) : (
            val
          )}
        </td>
      ))}
    </tr>
  );
}
