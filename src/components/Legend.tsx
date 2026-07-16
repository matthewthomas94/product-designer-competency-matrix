import { LEVEL_DESCRIPTIONS, LEVEL_LABELS, type Mode } from "../types";

interface Props {
  mode: Mode;
  onResetRatings: () => void;
  onResetDefaults: () => void;
  hasRatings: boolean;
  hasCustomDefaults: boolean;
}

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
        <h3 className="font-semibold text-slate-900 mb-2">Levels</h3>
        <ol className="space-y-3">
          {LEVEL_LABELS.slice(1).map((label, idx) => (
            <li key={label} className="grid grid-cols-[1rem_1fr] gap-2">
              <span className="font-mono text-slate-400">{idx + 1}</span>
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
        {mode === "rate" ? (
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span
                className="inline-block w-4 h-4 rounded-sm"
                style={{ backgroundColor: "var(--prof-developing)" }}
              />
              <span className="text-slate-700">Developing</span>
            </li>
            <li className="flex items-center gap-2">
              <span
                className="inline-block w-4 h-4 rounded-sm"
                style={{ backgroundColor: "var(--prof-meeting)" }}
              />
              <span className="text-slate-700">Meeting</span>
            </li>
            <li className="flex items-center gap-2">
              <span
                className="inline-block w-4 h-4 rounded-sm"
                style={{ backgroundColor: "var(--prof-exceeding)" }}
              />
              <span className="text-slate-700">Exceeding</span>
            </li>
            <li className="flex items-center gap-2">
              <span
                className="inline-block w-4 h-1.5 rounded-sm"
                style={{ backgroundColor: "var(--expected)" }}
              />
              <span className="text-slate-700">Expected for role</span>
            </li>
            <li className="text-slate-600 leading-snug text-xs">
              Click a cell to cycle its proficiency; click again past Exceeding
              to clear it.
            </li>
          </ul>
        ) : (
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span
                className="inline-block w-4 h-4 rounded-sm"
                style={{ backgroundColor: "var(--expected)" }}
              />
              <span className="text-slate-700">Expected level</span>
            </li>
            <li className="text-slate-600 leading-snug">
              Click cells to set the expected level for the active role.
            </li>
          </ul>
        )}
      </section>

      <p className="text-xs text-slate-500 leading-snug">
        Click a capability label on the wheel to read its full ladder.
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
