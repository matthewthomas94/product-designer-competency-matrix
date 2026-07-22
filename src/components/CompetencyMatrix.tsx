import { Fragment } from "react";
import type { CompetencyId, Level, Mode } from "../types";
import { COMPETENCIES } from "../data";
import {
  CX,
  CY,
  RINGS,
  VIEWBOX,
  cellPath,
  labelPosition,
  splitLabel,
  targetArcPath,
} from "../geometry";
import { CompetencyCell } from "./CompetencyCell";

interface Props {
  // The selected role's ranking per capability (1 Developing … 3 Exceeding).
  rankings: Partial<Record<CompetencyId, Level>>;
  expectations: Record<CompetencyId, Level>;
  centreLabel: string;
  mode: Mode;
  onCellClick: (id: CompetencyId, ring: 1 | 2 | 3) => void;
  onCapabilityClick: (id: CompetencyId) => void;
  selectedCapabilityId?: CompetencyId | null;
  onCellHover?: (
    id: CompetencyId,
    ring: 1 | 2 | 3,
    target: SVGPathElement,
  ) => void;
  onCellLeave?: () => void;
}

export function CompetencyMatrix({
  rankings,
  expectations,
  centreLabel,
  mode,
  onCellClick,
  onCapabilityClick,
  selectedCapabilityId,
  onCellHover,
  onCellLeave,
}: Props) {
  return (
    <svg
      viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
      className="w-full h-auto max-w-[820px]"
      role="img"
      aria-label="Product Designer Competency Matrix"
    >
      {/* Cells: one capability per sector × 3 ranking rings. */}
      {COMPETENCIES.map((comp, i) => {
        const rank = (rankings[comp.id] ?? 0) as Level;
        const expectedRank = (expectations[comp.id] ?? 0) as Level;
        return (
          <Fragment key={`cells-${comp.id}`}>
            {Array.from({ length: RINGS }, (_, k0) => {
              const k = (k0 + 1) as 1 | 2 | 3;
              return (
                <CompetencyCell
                  key={`${comp.id}-${k}`}
                  d={cellPath(i, k)}
                  competencyLabel={comp.label}
                  ring={k}
                  rank={rank}
                  expectedRank={expectedRank}
                  mode={mode}
                  onClick={() => onCellClick(comp.id, k)}
                  onHover={
                    onCellHover
                      ? (target) => onCellHover(comp.id, k, target)
                      : undefined
                  }
                  onLeave={onCellLeave}
                />
              );
            })}
          </Fragment>
        );
      })}

      {/* Expected-bar arc — Rate mode only; marks the ranking expected for the
          selected role (defaults to Meeting). In Define mode the dark fill
          conveys the expected shape directly. */}
      {mode === "rate" &&
        COMPETENCIES.map((comp, i) => {
          const expectedRank = expectations[comp.id] ?? 0;
          if (expectedRank === 0) return null;
          return (
            <path
              key={`target-${comp.id}`}
              d={targetArcPath(i, expectedRank)}
              stroke="var(--expected)"
              strokeWidth={3}
              strokeLinecap="butt"
              fill="none"
              pointerEvents="none"
            />
          );
        })}

      {/* Capability labels — clickable; opens the detail panel. */}
      {COMPETENCIES.map((comp, i) => {
        const { x, y, anchor } = labelPosition(i);
        const lines = splitLabel(comp.label);
        const startDy = `${-(lines.length - 1) * 0.55}em`;
        const isSelected = selectedCapabilityId === comp.id;
        return (
          <g
            key={`label-${comp.id}`}
            onClick={() => onCapabilityClick(comp.id)}
            style={{ cursor: "pointer" }}
            tabIndex={0}
            role="button"
            aria-label={`Read about ${comp.label}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onCapabilityClick(comp.id);
              }
            }}
          >
            <text
              x={x}
              y={y}
              textAnchor={anchor}
              fontSize={14}
              fontWeight={600}
              fill={isSelected ? "var(--user)" : "#0f172a"}
              dominantBaseline="middle"
              style={{
                userSelect: "none",
                textDecoration: isSelected ? "underline" : "none",
              }}
            >
              {lines.map((line, idx) => (
                <tspan key={idx} x={x} dy={idx === 0 ? startDy : "1.15em"}>
                  {line}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}

      {/* Centre role label */}
      <text
        x={CX}
        y={CY}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={26}
        fontWeight={700}
        fill="#0f172a"
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        {centreLabel}
      </text>
    </svg>
  );
}
