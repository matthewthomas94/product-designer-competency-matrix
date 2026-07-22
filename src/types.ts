// A capability's ranking for the selected role: 0 unset, 1 Developing,
// 2 Meeting, 3 Exceeding. The wheel's three rings map to 1–3; the position
// level comes from the selected role tab, not from the rings.
export type Level = 0 | 1 | 2 | 3;

export type Role = "junior" | "mid" | "senior" | "lead";

export const ROLES: Role[] = ["junior", "mid", "senior", "lead"];

export const ROLE_LABELS: Record<Role, string> = {
  junior: "Junior",
  mid: "Mid",
  senior: "Senior",
  lead: "Lead",
};

export const LEVEL_LABELS = [
  "Unset",
  "Developing",
  "Meeting",
  "Exceeding",
] as const;

// Characterisation per ranking — used in the legend.
export const LEVEL_DESCRIPTIONS = [
  "",
  "Building towards the bar for this level.",
  "Meeting the bar expected for this level.",
  "Consistently exceeding the bar for this level.",
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

// Ratings are scoped per role (position level): for each role, each capability
// can hold a ranking (1 Developing / 2 Meeting / 3 Exceeding). Absent = unset.
export type Ratings = Partial<
  Record<Role, Partial<Record<CompetencyId, Level>>>
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
  ratings: Ratings;
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
