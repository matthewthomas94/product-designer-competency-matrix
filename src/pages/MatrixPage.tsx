import { useEffect, useState } from "react";
import type {
  CompetencyId,
  CustomDescriptions,
  Level,
  Mode,
  Role,
  UserProfile,
} from "../types";
import { ROLES, ROLE_LABELS } from "../types";
import {
  COMPETENCIES,
  DEFINITIONS,
  ROLE_EXPECTATIONS,
  ROLE_META,
} from "../data";
import { CompetencyMatrix } from "../components/CompetencyMatrix";
import { RoleSwitcher } from "../components/RoleSwitcher";
import { Legend } from "../components/Legend";
import { CapabilityDetail } from "../components/CapabilityDetail";
import { CellHoverCard } from "../components/CellHoverCard";
import { GapsTable, type Gap } from "../components/GapsTable";

const STORAGE_KEY = "competency-matrix:v2";

const defaultProfile: UserProfile = {
  selectedRole: "mid",
  ratings: {},
};

function loadProfile(): UserProfile {
  if (typeof window === "undefined") return defaultProfile;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProfile;
    const parsed = JSON.parse(raw) as Partial<UserProfile>;
    if (!parsed || typeof parsed !== "object") return defaultProfile;
    const role = ROLES.includes(parsed.selectedRole as Role)
      ? (parsed.selectedRole as Role)
      : defaultProfile.selectedRole;
    const ratings =
      parsed.ratings && typeof parsed.ratings === "object"
        ? (parsed.ratings as UserProfile["ratings"])
        : {};
    const customExpectations =
      parsed.customExpectations &&
      typeof parsed.customExpectations === "object"
        ? (parsed.customExpectations as UserProfile["customExpectations"])
        : undefined;
    const gapNotes =
      parsed.gapNotes && typeof parsed.gapNotes === "object"
        ? (parsed.gapNotes as UserProfile["gapNotes"])
        : undefined;
    const customDescriptions =
      parsed.customDescriptions && typeof parsed.customDescriptions === "object"
        ? (parsed.customDescriptions as CustomDescriptions)
        : undefined;
    return {
      selectedRole: role,
      ratings,
      customExpectations,
      gapNotes,
      customDescriptions,
    };
  } catch {
    return defaultProfile;
  }
}

interface Props {
  mode: Mode;
}

export function MatrixPage({ mode }: Props) {
  const [profile, setProfile] = useState<UserProfile>(loadProfile);
  const [selectedCapabilityId, setSelectedCapabilityId] =
    useState<CompetencyId | null>(null);
  const [hovered, setHovered] = useState<{
    id: CompetencyId;
    level: 1 | 2 | 3 | 4;
    anchor: DOMRect;
  } | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // ignore
    }
  }, [profile]);

  const setRole = (role: Role) =>
    setProfile((p) => ({ ...p, selectedRole: role }));

  const setRating = (id: CompetencyId, level: Level) =>
    setProfile((p) => {
      const current = p.ratings[id] ?? 0;
      const next = current === level ? 0 : level;
      const ratings = { ...p.ratings };
      if (next === 0) delete ratings[id];
      else ratings[id] = next;
      return { ...p, ratings };
    });

  const setExpectation = (id: CompetencyId, level: Level) =>
    setProfile((p) => {
      const role = p.selectedRole;
      const baseline =
        p.customExpectations?.[role] ?? ROLE_EXPECTATIONS[role];
      const current = baseline[id] ?? 0;
      const next = (current === level ? 0 : level) as Level;
      const updatedRole: Record<CompetencyId, Level> = {
        ...baseline,
        [id]: next,
      };
      return {
        ...p,
        customExpectations: {
          ...p.customExpectations,
          [role]: updatedRole,
        },
      };
    });

  const handleCellClick = (id: CompetencyId, level: Level) => {
    if (mode === "rate") setRating(id, level);
    else setExpectation(id, level);
  };

  const handleCapabilityClick = (id: CompetencyId) => {
    setSelectedCapabilityId((prev) => (prev === id ? null : id));
  };

  const handleCellHover = (
    id: CompetencyId,
    level: 1 | 2 | 3 | 4,
    target: SVGPathElement,
  ) => {
    setHovered({ id, level, anchor: target.getBoundingClientRect() });
  };
  const handleCellLeave = () => setHovered(null);

  const updateBullets = (id: CompetencyId, role: Role, bullets: string[]) =>
    setProfile((p) => {
      const baseline =
        COMPETENCIES.find((c) => c.id === id)?.descriptions[role] ?? [];
      const matchesBaseline =
        bullets.length === baseline.length &&
        bullets.every((b, i) => b === baseline[i]);
      const all: CustomDescriptions = { ...(p.customDescriptions ?? {}) };
      const forCap = { ...(all[id] ?? {}) };
      if (matchesBaseline) {
        delete forCap[role];
      } else {
        forCap[role] = bullets;
      }
      if (Object.keys(forCap).length === 0) {
        delete all[id];
      } else {
        all[id] = forCap;
      }
      const next = Object.keys(all).length === 0 ? undefined : all;
      return { ...p, customDescriptions: next };
    });

  const setBullet = (
    id: CompetencyId,
    role: Role,
    idx: number,
    value: string,
  ) => {
    const current = resolveBullets(id, role);
    const next = current.map((b, i) => (i === idx ? value : b));
    updateBullets(id, role, next);
  };

  const addBullet = (id: CompetencyId, role: Role) => {
    const current = resolveBullets(id, role);
    updateBullets(id, role, [...current, ""]);
  };

  const removeBullet = (id: CompetencyId, role: Role, idx: number) => {
    const current = resolveBullets(id, role);
    updateBullets(
      id,
      role,
      current.filter((_, i) => i !== idx),
    );
  };

  function resolveBullets(id: CompetencyId, role: Role): string[] {
    const override = profile.customDescriptions?.[id]?.[role];
    if (override) return override;
    return COMPETENCIES.find((c) => c.id === id)?.descriptions[role] ?? [];
  }

  const setGapNote = (
    id: CompetencyId,
    field: "evidence" | "kpi",
    value: string,
  ) =>
    setProfile((p) => {
      const trimmed = value;
      const existing = p.gapNotes?.[id] ?? {};
      const nextEntry = { ...existing, [field]: trimmed };
      // Drop empty entries to keep storage tidy.
      const isEmpty = !nextEntry.evidence && !nextEntry.kpi;
      const gapNotes = { ...p.gapNotes };
      if (isEmpty) delete gapNotes[id];
      else gapNotes[id] = nextEntry;
      return { ...p, gapNotes };
    });

  const resetRatings = () => {
    if (Object.keys(profile.ratings).length === 0) return;
    if (window.confirm("Clear your competency ratings?")) {
      setProfile((p) => ({ ...p, ratings: {} }));
    }
  };

  const resetDefaults = () => {
    if (!profile.customExpectations && !profile.customDescriptions) return;
    if (
      window.confirm(
        "Reset all role definitions (cell expectations and bullet descriptions) back to the original defaults? This affects every role.",
      )
    ) {
      setProfile((p) => ({
        ...p,
        customExpectations: undefined,
        customDescriptions: undefined,
      }));
    }
  };

  const expectations =
    profile.customExpectations?.[profile.selectedRole] ??
    ROLE_EXPECTATIONS[profile.selectedRole];
  const hasRatings = Object.keys(profile.ratings).length > 0;
  const hasCustomDefaults =
    (!!profile.customExpectations &&
      Object.keys(profile.customExpectations).length > 0) ||
    (!!profile.customDescriptions &&
      Object.keys(profile.customDescriptions).length > 0);

  const selectedCapability =
    selectedCapabilityId
      ? COMPETENCIES.find((c) => c.id === selectedCapabilityId) ?? null
      : null;

  const meta = ROLE_META[profile.selectedRole];

  const resolveDescriptions = (id: CompetencyId): Record<Role, string[]> => {
    const baseline =
      COMPETENCIES.find((c) => c.id === id)?.descriptions ??
      ({} as Record<Role, string[]>);
    const overrides = profile.customDescriptions?.[id] ?? {};
    return {
      junior: overrides.junior ?? baseline.junior ?? [],
      mid: overrides.mid ?? baseline.mid ?? [],
      senior: overrides.senior ?? baseline.senior ?? [],
      lead: overrides.lead ?? baseline.lead ?? [],
    };
  };

  const gaps: Gap[] = COMPETENCIES.flatMap((c) => {
    const userLevel = (profile.ratings[c.id] ?? 0) as Level;
    const expectedLevel = (expectations[c.id] ?? 0) as Level;
    if (expectedLevel <= userLevel) return [];
    return [{ competency: c, expectedLevel, userLevel }];
  });

  const exportToday = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <main className="min-h-screen px-6 py-8 lg:py-12">
      <div className="max-w-6xl mx-auto">
        {mode === "define" && (
          <a
            href="/"
            className="no-print inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 mb-4"
          >
            <span aria-hidden="true">←</span>
            <span>Back to matrix</span>
          </a>
        )}

        <header className="mb-6 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Product Design · Draft v1
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mt-1">
              {mode === "define"
                ? "Define role expectations"
                : "Competency Matrix"}
            </h1>
            <p className="no-print mt-2 text-slate-600 max-w-2xl text-sm leading-relaxed">
              {mode === "define"
                ? "Click a capability label on the wheel to edit the Junior → Lead bullet descriptions for that capability. Click cells to override the expected level per role. Changes save automatically."
                : "Four levels (Junior, Mid, Senior, Lead) across seven capabilities. Switch roles to see expectations, click cells to rate yourself, and click a capability label to read the full ladder."}
            </p>
            <p className="print-only text-xs text-slate-500 mt-2">
              {ROLE_LABELS[profile.selectedRole]} · Exported {exportToday}
            </p>
          </div>
          {mode === "rate" ? (
            <button
              type="button"
              onClick={() => window.print()}
              className="no-print self-start px-4 py-2 rounded-md bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
            >
              Export PDF
            </button>
          ) : (
            <button
              type="button"
              onClick={() => window.location.assign("/")}
              className="no-print self-start px-4 py-2 rounded-md bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
            >
              Save & view matrix
            </button>
          )}
        </header>

        <div className="no-print mb-4">
          <RoleSwitcher value={profile.selectedRole} onChange={setRole} />
        </div>

        <div className="role-meta mb-6 rounded-md border border-slate-200 bg-white px-4 py-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-sm">
          <div>
            <div className="text-[10px] uppercase tracking-wide text-slate-500">
              {ROLE_LABELS[profile.selectedRole]} · Headline
            </div>
            <div className="text-slate-900 font-medium mt-0.5">
              {meta.headline}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wide text-slate-500">
              Scope
            </div>
            <div className="text-slate-900 mt-0.5">{meta.scope}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wide text-slate-500">
              Ownership
            </div>
            <div className="text-slate-700 mt-0.5 text-xs leading-snug">
              {meta.ownership}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wide text-slate-500">
              Who they work with
            </div>
            <div className="text-slate-700 mt-0.5 text-xs leading-snug">
              {meta.collaborators}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wide text-slate-500">
              People responsibility
            </div>
            <div className="text-slate-700 mt-0.5 text-xs leading-snug">
              {meta.people}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wide text-slate-500">
              Indicative experience
            </div>
            <div className="text-slate-700 mt-0.5 text-xs leading-snug">
              {meta.experience}
            </div>
          </div>
        </div>

        <div className="matrix-row grid lg:grid-cols-[1fr_280px] gap-8 items-start">
          <div className="flex justify-center">
            <CompetencyMatrix
              ratings={profile.ratings}
              expectations={expectations}
              centreLabel={ROLE_LABELS[profile.selectedRole]}
              mode={mode}
              onCellClick={handleCellClick}
              onCapabilityClick={handleCapabilityClick}
              selectedCapabilityId={selectedCapabilityId}
              onCellHover={handleCellHover}
              onCellLeave={handleCellLeave}
            />
          </div>
          <aside className="no-print">
            {selectedCapability ? (
              <CapabilityDetail
                competency={selectedCapability}
                descriptions={resolveDescriptions(selectedCapability.id)}
                selectedRole={profile.selectedRole}
                onClose={() => setSelectedCapabilityId(null)}
                mode={mode}
                onChangeBullet={(role, idx, value) =>
                  setBullet(selectedCapability.id, role, idx, value)
                }
                onAddBullet={(role) => addBullet(selectedCapability.id, role)}
                onRemoveBullet={(role, idx) =>
                  removeBullet(selectedCapability.id, role, idx)
                }
              />
            ) : (
              <Legend
                mode={mode}
                onResetRatings={resetRatings}
                onResetDefaults={resetDefaults}
                hasRatings={hasRatings}
                hasCustomDefaults={hasCustomDefaults}
              />
            )}
          </aside>
        </div>

        {mode === "rate" && (
          <section className="growth-plan mt-12">
            <div className="flex items-baseline justify-between flex-wrap gap-2 mb-2">
              <h2 className="text-lg font-semibold text-slate-900">
                Growth plan
              </h2>
              <p className="text-sm text-slate-500">
                {gaps.length === 0
                  ? "No gaps for this role."
                  : `${gaps.length} gap${gaps.length === 1 ? "" : "s"} to close for ${ROLE_LABELS[profile.selectedRole]}`}
              </p>
            </div>
            <p className="text-sm text-slate-600 mb-4 max-w-2xl">
              {gaps.length === 0
                ? "You are at or above expected level across every capability for the selected role. Switch roles to plan the next move."
                : "Capabilities where your current self-rating sits below the expected level. Capture how you have (or will) demonstrate each, and the metric it moves."}
            </p>
            {gaps.length > 0 && (
              <GapsTable
                gaps={gaps}
                notes={profile.gapNotes ?? {}}
                onChange={setGapNote}
              />
            )}
          </section>
        )}

        <section className="no-print mt-16 max-w-3xl">
          <h2 className="text-lg font-semibold text-slate-900">Definitions</h2>
          <p className="text-sm text-slate-600 mt-1">
            Terms in this matrix with a specific in-context meaning.
          </p>
          <dl className="mt-4 space-y-3">
            {DEFINITIONS.map(({ term, description }) => (
              <div key={term}>
                <dt className="text-sm font-semibold text-slate-900">
                  {term}
                </dt>
                <dd className="text-sm text-slate-700 mt-0.5 leading-relaxed">
                  {description}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <p className="no-print mt-12 text-xs text-slate-400">
          Ratings, role definitions, and growth-plan notes are saved to this
          browser.
        </p>
      </div>
      {hovered && (() => {
        const comp =
          COMPETENCIES.find((c) => c.id === hovered.id) ?? COMPETENCIES[0];
        const resolved = resolveDescriptions(comp.id);
        return (
          <CellHoverCard
            competency={comp}
            bullets={resolved[ROLES[hovered.level - 1]]}
            level={hovered.level}
            anchor={hovered.anchor}
          />
        );
      })()}
    </main>
  );
}
