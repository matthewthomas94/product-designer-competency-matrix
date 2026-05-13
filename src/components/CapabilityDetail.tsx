import type { Competency, Role } from "../types";
import { AREA_LABELS, ROLES, ROLE_LABELS } from "../types";

interface Props {
  competency: Competency;
  selectedRole: Role;
  onClose: () => void;
}

export function CapabilityDetail({
  competency,
  selectedRole,
  onClose,
}: Props) {
  return (
    <div className="flex flex-col gap-4 text-sm">
      <button
        type="button"
        onClick={onClose}
        className="inline-flex items-center gap-1 self-start text-xs text-slate-500 hover:text-slate-900"
      >
        <span aria-hidden="true">←</span>
        <span>Back to legend</span>
      </button>

      <div>
        <div className="text-xs uppercase tracking-wide text-slate-500">
          {AREA_LABELS[competency.area]}
        </div>
        <h2 className="text-base font-semibold text-slate-900 mt-1">
          {competency.label}
        </h2>
        <p className="text-xs text-slate-600 mt-0.5 leading-snug">
          {competency.subtitle}
        </p>
      </div>

      <ol className="flex flex-col gap-4">
        {ROLES.map((role, idx) => {
          const isCurrent = role === selectedRole;
          return (
            <li
              key={role}
              className={
                "rounded-md border px-3 py-2.5 " +
                (isCurrent
                  ? "border-slate-900 bg-slate-900/[0.04]"
                  : "border-slate-200 bg-white")
              }
            >
              <div className="flex items-baseline justify-between">
                <div className="font-semibold text-slate-900">
                  <span className="font-mono text-slate-400 mr-1.5">
                    {idx + 1}
                  </span>
                  {ROLE_LABELS[role]}
                </div>
                {isCurrent && (
                  <span className="text-[10px] uppercase tracking-wide text-slate-500">
                    Selected
                  </span>
                )}
              </div>
              <ul className="mt-2 space-y-1.5 text-slate-700 text-xs leading-relaxed">
                {competency.descriptions[role].map((point, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-slate-400">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
