# Product Designer Competency Matrix

An interactive radial competency matrix for Pay's Product Design team — four levels (Junior, Mid, Senior, Lead) across seven capabilities. Rate yourself, see gaps versus role expectations, export a growth plan.

Based on the *Product Design Competency Matrix · Draft v1* (May 2026) authored at pay.com.au.

## Capabilities

| Area | Capabilities |
| --- | --- |
| Craft | Design Craft · Research & Insights |
| Outcomes | Commercial Thinking · Delivery |
| People & Influence | Collaboration & Communication · Stakeholder Management · Mentorship & People Leadership |

## What it does

- **Radial wheel** — 7 spokes × 4 rings. Click cells to set your level on each capability; the active role's bar appears as a dark target arc.
- **Role context strip** — headline, scope, ownership, who they work with, people responsibility, indicative experience for the selected level.
- **Capability detail** — click a spoke label to open the full Junior → Lead ladder (descriptive bullets sourced from the source document).
- **Growth plan** — capabilities where your current rating sits below the role's expectation. Capture how you have (or will) demonstrate each, and the metric it moves.
- **Export PDF** — `window.print()` against a print stylesheet. Page 1 is the matrix; page 2 is the growth-plan table with empty (or filled-in) evidence/KPI cells.
- **Define mode** — visit `/define` to override the per-cell expected level for a role. Defaults are uniform (a Mid expects the Mid column across every capability) but you can deviate.

State (ratings, custom definitions, growth-plan notes) lives in `localStorage` under `competency-matrix:v2`.

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

- `COMPETENCIES` — the seven capabilities with subtitle, area, and Junior/Mid/Senior/Lead bullets.
- `ROLE_META` — the four levels with their headline, scope, ownership, etc.
- `ROLE_EXPECTATIONS` — uniform-per-role by default. Override in-app via `/define` or edit here directly.
- `DEFINITIONS` — the glossary printed below the matrix.

Add or remove a capability and the wheel adapts automatically (geometry is parameterised in `geometry.ts` by `SECTORS` / `RINGS`).
