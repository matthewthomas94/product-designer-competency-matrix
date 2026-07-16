export type Level = 0 | 1 | 2 | 3 | 4;

export type Role = "junior" | "mid" | "senior" | "lead";

export const ROLES: Role[] = ["junior", "mid", "senior", "lead"];

export const ROLE_LABELS: Record<Role, string> = {
  junior: "Junior",
  mid: "Mid",
  senior: "Senior",
  lead: "Lead",
};

// Role at index N corresponds to ring level N+1. A Junior is ring 1; a Lead
// is ring 4. The mapping is used for both the role pill and the default
// expectations (uniform per role).
export function roleLevel(role: Role): Level {
  return (ROLES.indexOf(role) + 1) as Level;
}

export const LEVEL_LABELS = [
  "Unset",
  "Junior",
  "Mid",
  "Senior",
  "Lead",
] as const;

// Headline characterisation per level — used in the legend.
export const LEVEL_DESCRIPTIONS = [
  "",
  "Learn & contribute. Supported by senior designers; works on bounded tasks.",
  "Deliver & explore. Independent on projects within a cross-functional pod.",
  "Guide & drive impact. Owns multiple projects in a domain; mentors others.",
  "Complexity & strategy. Owns the domain end-to-end; design DRI.",
] as const;

export type Area = "craft" | "outcomes" | "people";

export const AREA_LABELS: Record<Area, string> = {
  craft: "Craft",
  outcomes: "Outcomes",
  people: "People & Influence",
};

export const AREA_DESCRIPTIONS: Record<Area, string> = {
  craft: "The design itself.",
  outcomes: "The impact the design has.",
  people: "How they work with others.",
};

export type CompetencyId =
  | "design-craft"
  | "research-insights"
  | "tooling"
  | "commercial-thinking"
  | "delivery"
  | "collaboration-communication"
  | "stakeholder-management"
  | "mentorship-leadership";

export interface Competency {
  id: CompetencyId;
  label: string;
  subtitle: string;
  area: Area;
  // Bullet points per role describing behaviour at that level.
  descriptions: Record<Role, string[]>;
}

// Descriptors that frame the role beyond capabilities.
export interface RoleMeta {
  headline: string;
  scope: string;
  ownership: string;
  collaborators: string;
}

export type RoleExpectations = Record<Role, Record<CompetencyId, Level>>;

export type Mode = "rate" | "define";

// How proficient someone is at a given capability *for a given level* (ring).
// Cycled by repeated clicks on a cell; absent = unset (grey).
export type Proficiency = 1 | 2 | 3;

export const PROFICIENCY_LABELS: Record<Proficiency, string> = {
  1: "Developing",
  2: "Meeting",
  3: "Exceeding",
};

export const PROFICIENCY_DESCRIPTIONS: Record<Proficiency, string> = {
  1: "Building towards the bar at this level.",
  2: "Meeting the bar for this level.",
  3: "Consistently exceeding the bar for this level.",
};

// Per-cell ratings: for each capability, an optional proficiency at each
// level (ring). A capability with no entry — or a level with no entry — is
// unset.
export type CellRatings = Partial<
  Record<CompetencyId, Partial<Record<Level, Proficiency>>>
>;

export interface GapNote {
  evidence?: string;
  kpi?: string;
}

export interface Definition {
  term: string;
  description: string;
}

export type CustomDescriptions = Partial<
  Record<CompetencyId, Partial<Record<Role, string[]>>>
>;

export interface UserProfile {
  selectedRole: Role;
  ratings: CellRatings;
  customExpectations?: Partial<Record<Role, Record<CompetencyId, Level>>>;
  // Free-text notes the user enters against each gap capability — used to
  // fill in the Growth Plan table for export.
  gapNotes?: Partial<Record<CompetencyId, GapNote>>;
  // Overrides for the per-capability per-role bullet ladders shown in the
  // capability detail panel and hover tooltips. Edited in /define.
  customDescriptions?: CustomDescriptions;
  // Free-text overall assessment the manager fills in above the growth plan;
  // included in the PDF export.
  managerNotes?: string;
}
