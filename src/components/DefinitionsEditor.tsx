import type { Definition } from "../types";

interface Props {
  definitions: Definition[];
  onChange: (idx: number, field: "term" | "description", value: string) => void;
  onAdd: () => void;
  onRemove: (idx: number) => void;
  onReset?: () => void;
  resetDisabled?: boolean;
}

export function DefinitionsEditor({
  definitions,
  onChange,
  onAdd,
  onRemove,
  onReset,
  resetDisabled,
}: Props) {
  return (
    <div className="space-y-3">
      <ul className="space-y-3">
        {definitions.map((d, idx) => (
          <li
            key={idx}
            className="grid gap-2 sm:grid-cols-[200px_1fr_32px] items-start"
          >
            <input
              type="text"
              className="border border-slate-300 rounded-md px-2 py-1.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400"
              placeholder="Term"
              value={d.term}
              onChange={(e) => onChange(idx, "term", e.target.value)}
            />
            <textarea
              className="border border-slate-300 rounded-md px-2 py-1.5 text-sm text-slate-700 leading-relaxed min-h-[64px] resize-y focus:outline-none focus:ring-2 focus:ring-slate-400"
              placeholder="Description"
              value={d.description}
              onChange={(e) => onChange(idx, "description", e.target.value)}
              rows={2}
            />
            <button
              type="button"
              onClick={() => onRemove(idx)}
              className="justify-self-start text-slate-400 hover:text-red-600 text-xl leading-none px-2 py-1 rounded"
              title="Remove definition"
              aria-label={`Remove definition ${d.term || idx + 1}`}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2 pt-1">
        <button
          type="button"
          onClick={onAdd}
          className="text-sm font-medium text-slate-700 hover:text-slate-900 border border-dashed border-slate-300 rounded-md px-3 py-1.5"
        >
          + Add definition
        </button>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            disabled={resetDisabled}
            className="text-sm text-slate-500 hover:text-slate-900 disabled:text-slate-300 disabled:cursor-not-allowed px-3 py-1.5"
          >
            Reset to defaults
          </button>
        )}
      </div>
    </div>
  );
}
