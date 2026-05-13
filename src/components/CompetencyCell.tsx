import type { KeyboardEvent, MouseEvent } from "react";
import type { Level, Mode } from "../types";

interface Props {
  d: string;
  competencyLabel: string;
  level: 1 | 2 | 3 | 4;
  userLevel: Level;
  expectedLevel: Level;
  mode: Mode;
  onClick: () => void;
  onHover?: (target: SVGPathElement) => void;
  onLeave?: () => void;
}

export function CompetencyCell({
  d,
  competencyLabel,
  level,
  userLevel,
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
    const userFilled = userLevel >= level;
    const isGap = expectedLevel >= level && userLevel < level;
    if (userFilled) {
      fill = "var(--user)";
      fillOpacity = 0.6 + (level - 1) * 0.12;
    } else if (isGap) {
      fill = "var(--gap)";
      fillOpacity = 0.18;
    }
    titleSuffix = userFilled
      ? `level ${level} (click to unset)`
      : `set yourself to level ${level}`;
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
