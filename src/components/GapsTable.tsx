import type { ChangeEvent } from "react";
import type { Competency, CompetencyId, GapNote, Level } from "../types";
import { LEVEL_LABELS } from "../types";

export interface Gap {
  competency: Competency;
  expectedRank: Level;
  rank: Level;
  expectedBullets: string[];
}

interface Props {
  gaps: Gap[];
  notes: Partial<Record<CompetencyId, GapNote>>;
  onChange: (id: CompetencyId, field: "evidence" | "kpi", value: string) => void;
}

export function GapsTable({ gaps, notes, onChange }: Props) {
  const handle =
    (id: CompetencyId, field: "evidence" | "kpi") =>
    (e: ChangeEvent<HTMLTextAreaElement>) =>
      onChange(id, field, e.target.value);

  return (
    <div className="gaps-table overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-slate-100 text-left">
            <th className="border border-slate-300 px-3 py-2 font-semibold w-[18%]">
              Capability
            </th>
            <th className="border border-slate-300 px-3 py-2 font-semibold w-[22%]">
              Ranking
            </th>
            <th className="border border-slate-300 px-3 py-2 font-semibold w-[30%]">
              How you demonstrated this competency
            </th>
            <th className="border border-slate-300 px-3 py-2 font-semibold w-[30%]">
              Metric / KPI it contributed to improving
            </th>
          </tr>
        </thead>
        <tbody>
          {gaps.map(({ competency, expectedRank, rank, expectedBullets }) => {
            const note = notes[competency.id] ?? {};
            return (
              <tr key={competency.id} className="align-top">
                <td className="border border-slate-300 px-3 py-2">
                  <div className="font-semibold text-slate-900">
                    {competency.label}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    {competency.subtitle}
                  </div>
                </td>
                <td className="border border-slate-300 px-3 py-2">
                  <div className="text-xs text-slate-700">
                    <span className="text-slate-500">Current: </span>
                    <span className="font-semibold">
                      {rank > 0 ? LEVEL_LABELS[rank] : "Not ranked"}
                    </span>
                  </div>
                  <div className="text-xs text-slate-700 mt-0.5">
                    <span className="text-slate-500">Expected: </span>
                    <span className="font-semibold">
                      {LEVEL_LABELS[expectedRank]}
                    </span>
                  </div>
                  {expectedBullets.length > 0 && (
                    <ul className="mt-2 space-y-1 text-xs text-slate-600 leading-snug">
                      {expectedBullets.map((point, i) => (
                        <li key={i} className="flex gap-1.5">
                          <span className="text-slate-400">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
                <td className="border border-slate-300 p-0 relative align-top min-h-[80px]">
                  <textarea
                    className="gap-textarea absolute inset-0 w-full h-full px-3 py-2 bg-transparent resize-none focus:outline-none focus:ring-2 focus:ring-slate-400 rounded-none"
                    placeholder="Describe how you demonstrated this competency…"
                    value={note.evidence ?? ""}
                    onChange={handle(competency.id, "evidence")}
                  />
                </td>
                <td className="border border-slate-300 p-0 relative align-top min-h-[80px]">
                  <textarea
                    className="gap-textarea absolute inset-0 w-full h-full px-3 py-2 bg-transparent resize-none focus:outline-none focus:ring-2 focus:ring-slate-400 rounded-none"
                    placeholder="Which metric or KPI did this contribute to?"
                    value={note.kpi ?? ""}
                    onChange={handle(competency.id, "kpi")}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
