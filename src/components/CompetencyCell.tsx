import type { KeyboardEvent, MouseEvent } from "react";
import type { Level, Mode, Proficiency } from "../types";
import { PROFICIENCY_LABELS, ROLE_LABELS, ROLES } from "../types";

interface Props {
  d: string;
  competencyLabel: string;
  level: 1 | 2 | 3 | 4;
  proficiency?: Proficiency;
  expectedLevel: Level;
  mode: Mode;
  onClick: () => void;
  onHover?: (target: SVGPathElement) => void;
  onLeave?: () => void;
}

const PROFICIENCY_FILL: Record<Proficiency, string> = {
  1: "var(--prof-developing)",
  2: "var(--prof-meeting)",
  3: "var(--prof-exceeding)",
};

export function CompetencyCell({
  d,
  competencyLabel,
  level,
  proficiency,
  expectedLevel,
  mode,
  onClick,
  onHover,
  onLeave,
}: Props) {
  let fill = "var(--cell-empty)";
  let fillOpacity = 1;
  let titleSuffix: string;

  if (mode === "rate") {
    const levelLabel = ROLE_LABELS[ROLES[level - 1]];
    if (proficiency) {
      fill = PROFICIENCY_FILL[proficiency];
      titleSuffix = `${levelLabel}: ${PROFICIENCY_LABELS[proficiency]} (click to cycle)`;
    } else {
      titleSuffix = `${levelLabel}: not set (click to set Developing)`;
    }
  } else {
    const expectedFilled = expectedLevel >= level;
    if (expectedFilled) {
      fill = "var(--expected)";
      fillOpacity = 0.5 + (level - 1) * 0.15;
    }
    titleSuffix = expectedFilled
      ? `expected level ${level} (click to unset)`
      : `set expected to level ${level}`;
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
