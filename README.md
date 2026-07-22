# Product Designer Competency Matrix

An interactive radial competency matrix for a Product Design team. Pick a position level (Junior, Mid, Senior, Lead) from the tabs, then rank each of eight capabilities Developing → Meeting → Exceeding. See gaps versus the expected bar and export a growth plan.

Based on an internal Product Design Competency Matrix draft (May 2026).

## Capabilities

| Area | Capabilities |
| --- | --- |
| Craft | Design Craft · Research & Insights · Tooling |
| Outcomes | Commercial Thinking · Delivery |
| People & Influence | Collaboration & Communication · Stakeholder Management · Mentorship & People Leadership |

## What it does

- **Radial wheel** — 8 spokes × 3 ranking rings (Developing → Meeting → Exceeding). The tabs set the position level; click a ring to rank a capability (click the same ring again to clear). The role's expected bar appears as a dark target arc (defaults to Meeting).
- **Per-role rankings** — each tab (Junior/Mid/Senior/Lead) holds its own set of capability rankings. Switching tabs shows that position's assessment.
- **Role context strip** — headline, scope, ownership, and who they work with for the selected level.
- **Capability detail** — click a spoke label to open the full Junior → Lead ladder (descriptive bullets sourced from the source document).
- **Manager notes** — a free-text box above the growth plan for the reviewer's overall assessment.
- **Growth plan** — capabilities ranked below the expected bar for the selected role. Capture how you have (or will) demonstrate each, and the metric it moves.
- **Export PDF** — `window.print()` against a print stylesheet. Page 1 is the matrix; page 2 is the manager notes and growth-plan table.
- **Define mode** — visit `/define` to override the expected ranking per capability per role. The default bar is Meeting for every capability.

State (per-role rankings, custom definitions, manager + growth-plan notes) lives in `localStorage` under `competency-matrix:v3`.

## Stack

Vite · React 19 · TypeScript · Tailwind CSS v4 · pnpm. No backend.

## Run locally

```bash
pnpm install
pnpm dev          # http://localhost:5173
pnpm typecheck    # tsc --noEmit
pnpm build        # production bundle in dist/
```

## Structure

```
src/
├── App.tsx                          route by pathname (/ → rate, /define → define)
├── main.tsx
├── index.css                        Tailwind + print stylesheet
├── types.ts                         Level, Role, CompetencyId, Area, UserProfile
├── data.ts                          COMPETENCIES, ROLE_META, ROLE_EXPECTATIONS, DEFINITIONS
├── geometry.ts                      SVG polar-grid math
├── pages/MatrixPage.tsx             state owner, layout
└── components/
    ├── CompetencyMatrix.tsx         the SVG
    ├── CompetencyCell.tsx           one cell path
    ├── RoleSwitcher.tsx
    ├── Legend.tsx
    ├── CapabilityDetail.tsx         full ladder side panel
    └── GapsTable.tsx                growth-plan table
```

## Editing the matrix content

All copy and the role ladder live in [`src/data.ts`](src/data.ts):

- `COMPETENCIES` — the eight capabilities with subtitle, area, and Junior/Mid/Senior/Lead bullets.
- `ROLE_META` — the four levels with their headline, scope, ownership, etc.
- `ROLE_EXPECTATIONS` — the expected ranking bar per capability per role; defaults to Meeting everywhere. Override in-app via `/define` or edit here directly.
- `DEFINITIONS` — the glossary printed below the matrix.

Add or remove a capability and the wheel adapts automatically (geometry is parameterised in `geometry.ts` by `SECTORS` / `RINGS`).
