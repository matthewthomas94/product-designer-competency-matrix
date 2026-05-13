import type { ChangeEvent } from "react";
import type { Competency, CompetencyId, GapNote, Level } from "../types";
import { LEVEL_LABELS } from "../types";

export interface Gap {
  competency: Competency;
  expectedLevel: Level;
  userLevel: Level;
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
            <th className="border border-slate-300 px-3 py-2 font-semibold w-[20%]">
              Capability
            </th>
            <th className="border border-slate-300 px-3 py-2 font-semibold w-[12%]">
              Level expected
            </th>
            <th className="border border-slate-300 px-3 py-2 font-semibold w-[34%]">
              How you demonstrated this competency
            </th>
            <th className="border border-slate-300 px-3 py-2 font-semibold w-[34%]">
              Metric / KPI it contributed to improving
            </th>
          </tr>
        </thead>
        <tbody>
          {gaps.map(({ competency, expectedLevel }) => {
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
                  <span className="font-mono text-slate-500 mr-1">
                    {expectedLevel}
                  </span>
                  <span className="font-semibold">
                    {LEVEL_LABELS[expectedLevel]}
                  </span>
                </td>
                <td className="border border-slate-300 p-0">
                  <textarea
                    className="gap-textarea w-full px-3 py-2 bg-transparent resize-y min-h-[72px] focus:outline-none focus:ring-2 focus:ring-slate-400 rounded-none"
                    placeholder="Describe how you demonstrated this competency…"
                    value={note.evidence ?? ""}
                    onChange={handle(competency.id, "evidence")}
                    rows={3}
                  />
                </td>
                <td className="border border-slate-300 p-0">
                  <textarea
                    className="gap-textarea w-full px-3 py-2 bg-transparent resize-y min-h-[72px] focus:outline-none focus:ring-2 focus:ring-slate-400 rounded-none"
                    placeholder="Which metric or KPI did this contribute to?"
                    value={note.kpi ?? ""}
                    onChange={handle(competency.id, "kpi")}
                    rows={3}
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
