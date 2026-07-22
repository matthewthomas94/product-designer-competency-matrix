import { LEVEL_DESCRIPTIONS, LEVEL_LABELS, type Mode } from "../types";

interface Props {
  mode: Mode;
  onResetRatings: () => void;
  onResetDefaults: () => void;
  hasRatings: boolean;
  hasCustomDefaults: boolean;
}

const RANK_FILL = [
  "",
  "var(--prof-developing)",
  "var(--prof-meeting)",
  "var(--prof-exceeding)",
];

export function Legend({
  mode,
  onResetRatings,
  onResetDefaults,
  hasRatings,
  hasCustomDefaults,
}: Props) {
  return (
    <div className="flex flex-col gap-5 text-sm">
      <section>
        <h3 className="font-semibold text-slate-900 mb-2">Ranking</h3>
        <ol className="space-y-3">
          {LEVEL_LABELS.slice(1).map((label, idx) => (
            <li key={label} className="grid grid-cols-[1rem_1fr] gap-2">
              <span
                className="mt-0.5 inline-block w-4 h-4 rounded-sm"
                style={{ backgroundColor: RANK_FILL[idx + 1] }}
              />
              <div>
                <div className="font-semibold text-slate-900">{label}</div>
                <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                  {LEVEL_DESCRIPTIONS[idx + 1]}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h3 className="font-semibold text-slate-900 mb-2">Key</h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <span
              className="inline-block w-4 h-1.5 rounded-sm"
              style={{ backgroundColor: "var(--expected)" }}
            />
            <span className="text-slate-700">Expected bar for this role</span>
          </li>
          <li className="text-slate-600 leading-snug text-xs">
            {mode === "rate"
              ? "Click a ring to rank a capability; click the same ring again to clear it."
              : "Click a ring to set the expected ranking for the active role."}
          </li>
        </ul>
      </section>

      <p className="text-xs text-slate-500 leading-snug">
        Role tabs set the position level. Click a capability label on the wheel
        to read its full ladder.
      </p>

      {mode === "rate" ? (
        <button
          type="button"
          onClick={onResetRatings}
          disabled={!hasRatings}
          className="self-start px-3 py-1.5 text-sm rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Reset my ratings
        </button>
      ) : (
        <button
          type="button"
          onClick={onResetDefaults}
          disabled={!hasCustomDefaults}
          className="self-start px-3 py-1.5 text-sm rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Reset to original defaults
        </button>
      )}
    </div>
  );
}
