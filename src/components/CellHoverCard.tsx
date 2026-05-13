import { useLayoutEffect, useRef, useState } from "react";
import type { Competency } from "../types";
import { AREA_LABELS, ROLES, ROLE_LABELS } from "../types";

interface Props {
  competency: Competency;
  level: 1 | 2 | 3 | 4;
  anchor: DOMRect;
}

export function CellHoverCard({ competency, level, anchor }: Props) {
  const role = ROLES[level - 1];
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const card = ref.current.getBoundingClientRect();
    const gap = 12;
    const margin = 16;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Prefer right of cell; flip to left if it would overflow.
    let left = anchor.right + gap;
    if (left + card.width > vw - margin) {
      left = anchor.left - card.width - gap;
    }
    if (left < margin) left = margin;

    // Top-align with the cell, then clamp to viewport.
    let top = anchor.top;
    if (top + card.height > vh - margin) {
      top = vh - margin - card.height;
    }
    if (top < margin) top = margin;

    setPos({ left, top });
  }, [anchor]);

  const points = competency.descriptions[role];

  return (
    <div
      ref={ref}
      role="tooltip"
      className="no-print fixed z-50 w-[320px] rounded-md border border-slate-900 bg-white shadow-lg px-3 py-2.5 text-sm pointer-events-none"
      style={
        pos
          ? { left: pos.left, top: pos.top }
          : { left: -9999, top: -9999 }
      }
    >
      <div className="text-[10px] uppercase tracking-wide text-slate-500">
        {AREA_LABELS[competency.area]} · {competency.label}
      </div>
      <div className="font-semibold text-slate-900 mt-1">
        <span className="font-mono text-slate-400 mr-1.5">{level}</span>
        {ROLE_LABELS[role]}
      </div>
      <ul className="mt-2 space-y-1.5 text-slate-700 text-xs leading-relaxed">
        {points.map((point, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-slate-400">•</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
