import type { KeyboardEvent, MouseEvent } from "react";
import type { Level, Mode } from "../types";
import { LEVEL_LABELS } from "../types";

interface Props {
  d: string;
  competencyLabel: string;
  ring: 1 | 2 | 3;
  // The capability's current ranking for the selected role (rate mode).
  rank: Level;
  // The expected ranking bar for the selected role (define mode + hint).
  expectedRank: Level;
  mode: Mode;
  onClick: () => void;
  onHover?: (target: SVGPathElement) => void;
  onLeave?: () => void;
}

// Each ring carries its own shade: Developing → Meeting → Exceeding.
const RING_FILL: Record<1 | 2 | 3, string> = {
  1: "var(--prof-developing)",
  2: "var(--prof-meeting)",
  3: "var(--prof-exceeding)",
};

export function CompetencyCell({
  d,
  competencyLabel,
  ring,
  rank,
  expectedRank,
  mode,
  onClick,
  onHover,
  onLeave,
}: Props) {
  let fill = "var(--cell-empty)";
  let fillOpacity = 1;
  let titleSuffix: string;

  const ringLabel = LEVEL_LABELS[ring];

  if (mode === "rate") {
    const filled = rank >= ring;
    if (filled) fill = RING_FILL[ring];
    titleSuffix =
      rank === ring
        ? `${ringLabel} (click to clear)`
        : `set to ${ringLabel}`;
  } else {
    const expectedFilled = expectedRank >= ring;
    if (expectedFilled) {
      fill = "var(--expected)";
      fillOpacity = 0.5 + (ring - 1) * 0.2;
    }
    titleSuffix =
      expectedRank === ring
        ? `expected: ${ringLabel} (click to clear)`
        : `set expected to ${ringLabel}`;
  }

  const handleKey = (e: KeyboardEvent<SVGPathElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  const handleEnter = (e: MouseEvent<SVGPathElement>) => {
    e.currentTarget.style.filter = "brightness(1.08)";
    onHover?.(e.currentTarget);
  };
  const handleLeave = (e: MouseEvent<SVGPathElement>) => {
    e.currentTarget.style.filter = "";
    onLeave?.();
  };

  return (
    <path
      d={d}
      fill={fill}
      fillOpacity={fillOpacity}
      stroke="var(--cell-stroke)"
      strokeWidth={1}
      role="button"
      tabIndex={0}
      aria-label={`${competencyLabel} — ${titleSuffix}`}
      onClick={onClick}
      onKeyDown={handleKey}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ cursor: "pointer", transition: "filter 120ms" }}
    />
  );
}
