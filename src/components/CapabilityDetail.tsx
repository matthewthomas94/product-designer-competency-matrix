import type { Competency, Mode, Role } from "../types";
import { AREA_LABELS, ROLES, ROLE_LABELS } from "../types";

interface Props {
  competency: Competency;
  descriptions: Record<Role, string[]>;
  selectedRole: Role;
  onClose: () => void;
  mode: Mode;
  onChangeBullet?: (role: Role, idx: number, value: string) => void;
  onAddBullet?: (role: Role) => void;
  onRemoveBullet?: (role: Role, idx: number) => void;
}

export function CapabilityDetail({
  competency,
  descriptions,
  selectedRole,
  onClose,
  mode,
  onChangeBullet,
  onAddBullet,
  onRemoveBullet,
}: Props) {
  const editing = mode === "define";

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
        {editing && (
          <p className="text-xs text-slate-500 mt-2 leading-snug">
            Edit the bullets that describe each level. Changes save
            automatically.
          </p>
        )}
      </div>

      <ol className="flex flex-col gap-4">
        {ROLES.map((role, idx) => {
          const isCurrent = role === selectedRole;
          const bullets = descriptions[role];
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
              {editing ? (
                <div className="mt-2 space-y-2">
                  {bullets.map((point, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[1fr_24px] gap-1.5 items-start"
                    >
                      <textarea
                        className="w-full border border-slate-300 rounded-md px-2 py-1.5 text-xs leading-relaxed text-slate-700 resize-y min-h-[56px] focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white"
                        rows={2}
                        value={point}
                        onChange={(e) =>
                          onChangeBullet?.(role, i, e.target.value)
                        }
                      />
                      <button
                        type="button"
                        onClick={() => onRemoveBullet?.(role, i)}
                        className="text-slate-400 hover:text-red-600 text-lg leading-none px-1 py-1 rounded"
                        title="Remove bullet"
                        aria-label={`Remove bullet ${i + 1} from ${ROLE_LABELS[role]}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => onAddBullet?.(role)}
                    className="text-xs font-medium text-slate-700 hover:text-slate-900 border border-dashed border-slate-300 rounded-md px-2 py-1"
                  >
                    + Add bullet
                  </button>
                </div>
              ) : (
                <ul className="mt-2 space-y-1.5 text-slate-700 text-xs leading-relaxed">
                  {bullets.map((point, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-slate-400">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
