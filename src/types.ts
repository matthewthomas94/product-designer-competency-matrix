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

// At Pay's current size — descriptors that frame the role beyond capabilities.
export interface RoleMeta {
  headline: string;
  scope: string;
  ownership: string;
  collaborators: string;
  people: string;
  experience: string;
}

export type RoleExpectations = Record<Role, Record<CompetencyId, Level>>;

export type Mode = "rate" | "define";

export interface GapNote {
  evidence?: string;
  kpi?: string;
}

export interface Definition {
  term: string;
  description: string;
}

export type CustomRoleMeta = Partial<Record<Role, Partial<RoleMeta>>>;

export interface UserProfile {
  selectedRole: Role;
  ratings: Partial<Record<CompetencyId, Level>>;
  customExpectations?: Partial<Record<Role, Record<CompetencyId, Level>>>;
  // Free-text notes the user enters against each gap capability — used to
  // fill in the Growth Plan table for export.
  gapNotes?: Partial<Record<CompetencyId, GapNote>>;
  // Overrides for the per-role meta strip (Headline, Scope, Ownership, etc).
  // Falls back to ROLE_META on a per-field basis. Edited in /define.
  customRoleMeta?: CustomRoleMeta;
}
