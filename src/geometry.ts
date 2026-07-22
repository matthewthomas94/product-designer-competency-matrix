import { COMPETENCIES } from "./data";

const TAU = Math.PI * 2;

// One sector per capability — derived so adding/removing a capability in
// data.ts reshapes the wheel automatically.
export const SECTORS = COMPETENCIES.length;
// Three rings = the ranking (Developing → Meeting → Exceeding).
export const RINGS = 3;
export const VIEWBOX = 1000;
export const CX = 500;
export const CY = 500;
export const R_INNER = 80;
export const RING_WIDTH = 80;
export const R_OUTER = R_INNER + RINGS * RING_WIDTH;
const R_LABEL = R_OUTER + 30;

export function ring(k: number): { inner: number; outer: number } {
  return {
    inner: R_INNER + (k - 1) * RING_WIDTH,
    outer: R_INNER + k * RING_WIDTH,
  };
}

export function sectorAngles(i: number): { a0: number; a1: number } {
  const step = TAU / SECTORS;
  return {
    a0: -Math.PI / 2 + i * step,
    a1: -Math.PI / 2 + (i + 1) * step,
  };
}

function pt(r: number, a: number): readonly [number, number] {
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)] as const;
}

// Path for one cell (sector i, ring k). Counter-clockwise inner arc, clockwise
// outer arc, joined by straight radial segments — produces a clean wedge slice.
export function cellPath(i: number, k: number): string {
  const { inner, outer } = ring(k);
  const { a0, a1 } = sectorAngles(i);
  const [x0, y0] = pt(outer, a0);
  const [x1, y1] = pt(outer, a1);
  const [x2, y2] = pt(inner, a1);
  const [x3, y3] = pt(inner, a0);
  return [
    `M ${x0} ${y0}`,
    `A ${outer} ${outer} 0 0 1 ${x1} ${y1}`,
    `L ${x2} ${y2}`,
    `A ${inner} ${inner} 0 0 0 ${x3} ${y3}`,
    `Z`,
  ].join(" ");
}

// Just the outer arc of the (i, expectedLevel) cell — used to draw the
// "target ring" overlay so the role's expectation reads as a stepped arc
// across the wheel.
export function targetArcPath(i: number, expectedLevel: number): string {
  if (expectedLevel < 1 || expectedLevel > RINGS) return "";
  const { outer } = ring(expectedLevel);
  const { a0, a1 } = sectorAngles(i);
  const [x0, y0] = pt(outer, a0);
  const [x1, y1] = pt(outer, a1);
  return `M ${x0} ${y0} A ${outer} ${outer} 0 0 1 ${x1} ${y1}`;
}

export function labelPosition(i: number): {
  x: number;
  y: number;
  anchor: "start" | "end" | "middle";
} {
  const { a0, a1 } = sectorAngles(i);
  const mid = (a0 + a1) / 2;
  const [x, y] = pt(R_LABEL, mid);
  const cx = Math.cos(mid);
  const anchor: "start" | "end" | "middle" =
    cx > 0.15 ? "start" : cx < -0.15 ? "end" : "middle";
  return { x, y, anchor };
}

// Two-line wrap for labels: prefer breaking at " / " or " & "; otherwise
// split words near the middle.
export function splitLabel(label: string): string[] {
  if (label.includes(" / ")) return label.split(" / ");
  if (label.includes(" & ")) return label.split(" & ");
  const words = label.split(" ");
  if (words.length <= 1) return [label];
  if (words.length === 2) return words;
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}
