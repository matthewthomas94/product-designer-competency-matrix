import type {
  Competency,
  RoleExpectations,
  RoleMeta,
  Role,
} from "./types";
import { roleLevel } from "./types";

export const ROLE_META: Record<Role, RoleMeta> = {
  junior: {
    headline: "Learn & contribute",
    scope: "Yourself",
    ownership: "Supported — close supervision on most work.",
    collaborators: "Their PM, EM, and a senior designer mentor.",
  },
  mid: {
    headline: "Deliver & explore",
    scope: "Your projects",
    ownership: "Growing — independent on bounded projects.",
    collaborators: "Cross-functional pod; broader design team.",
  },
  senior: {
    headline: "Guide & drive impact",
    scope: "Your domain (+ 1–2 directs)",
    ownership: "Independent — owns multiple projects in a domain.",
    collaborators: "Senior PM & EM peers; senior stakeholders with support.",
  },
  lead: {
    headline: "Complexity & strategy",
    scope: "Your domain end-to-end (+ small team)",
    ownership:
      "Leads through example — owns the domain. Sets expectations for other designers and team members that work with them in the domain.",
    collaborators:
      "Senior PM & EM peers; senior stakeholders directly; exec when needed.",
  },
};

export const COMPETENCIES: Competency[] = [
  {
    id: "design-craft",
    label: "Design Craft",
    subtitle: "Visual, interaction, accessibility, design systems",
    area: "craft",
    descriptions: {
      junior: [
        "Designs interfaces that follow established product patterns and design system components, with guidance on when to apply them.",
        "Builds familiarity with layout, hierarchy, interaction patterns, and accessibility fundamentals (WCAG AA basics).",
        "Uses prototypes to clarify flows; receives feedback on fidelity and edge cases.",
        "Work is reviewed by a senior before ship; learns from feedback.",
      ],
      mid: [
        "Independently designs clear, usable, and accessible interfaces aligned with the design system.",
        "Applies strong judgement across layout, interaction, and accessibility (consistently meets WCAG AA).",
        "Higher-fidelity prototypes used to test ideas, validate with users, and align stakeholders.",
        "Iterates on solutions based on feedback and validation; thinks through edge cases and screen sizes proactively.",
      ],
      senior: [
        "Proactively identifies gaps in our design language and improves them.",
        "Defines new components and changes to the underlying system when necessary; collaborates on system evolution.",
        "Sets the visual / interaction quality bar in their domain; mentors others on craft.",
        "Considers how their work and patterns can be reused by the rest of the team.",
      ],
      lead: [
        "Sets the design vision and quality bar for their domain.",
        "Defines the patterns the design system needs to evolve to support their domain's direction.",
        "Their work and decisions are a quality reference others ladder up to.",
        "Influences the broader design team on craft — e.g. via crits, principles, and design system contributions.",
      ],
    },
  },
  {
    id: "research-insights",
    label: "Research & Insights",
    subtitle: "Discovery, methods, synthesis",
    area: "craft",
    descriptions: {
      junior: [
        "Supports user interviews, surveys, and basic usability tests with guidance.",
        "Learning to analyse insights under supervision; sources existing research to inform decisions.",
        "Frames high-level user research goals with help from senior team members.",
      ],
      mid: [
        "Plans and runs appropriate research and testing for their projects, partnering with their PM on scoping and execution.",
        "Recruits participants effectively, manages research data, and synthesises findings into clear, usable insights.",
        "Identifies when research is needed and, together with their PM, chooses an appropriate method for the question being asked.",
        "Combines qualitative and quantitative inputs to inform decisions.",
      ],
      senior: [
        "Co-drives research strategy for their domain with their PM peers (e.g. continuous research cadence) and aligns it with business objectives.",
        "Demonstrates expertise across diverse research methods; chooses the right one for the context.",
        "Helps the team align research outcomes with product goals; spots gaps in our knowledge.",
        "Mentors mid/junior designers on research practice.",
      ],
      lead: [
        "Establishes research practice for their domain jointly with Product; aligns it with the broader design and product research vision.",
        "Synthesises across multiple projects and surfaces; identifies systemic gaps in our user understanding.",
        "Drives research thought leadership for their area — the team comes to them for the question “have we asked the customer about this?”",
      ],
    },
  },
  {
    id: "tooling",
    label: "Tooling",
    subtitle: "AI-assisted prototyping, tooling, and testing",
    area: "craft",
    descriptions: {
      junior: [
        "Uses the team's core design and prototyping tools proficiently; building familiarity with AI-assisted features to speed up routine work.",
        "Follows tooling conventions with guidance; learning which tool fits which task.",
        "Produces basic interactive prototypes to communicate intent; explores AI tools to generate variations or placeholder content under supervision.",
        "Curious about new tools; brings what they learn back to the team.",
      ],
      mid: [
        "Independently selects and combines tools — including AI — to produce prototypes that communicate design intent clearly to stakeholders and engineers.",
        "Builds higher-fidelity, realistic prototypes efficiently; uses AI to accelerate content, variations, and edge-case coverage.",
        "Sets up testable prototypes and runs them with users, choosing a fidelity appropriate to the question being asked.",
        "Evaluates new tools critically and adopts those that improve speed or quality.",
      ],
      senior: [
        "Sets the tooling and prototyping quality bar in their domain; mentors others on using AI and other tools effectively and responsibly.",
        "Pioneers new techniques — e.g. AI-assisted prototyping, realistic data, or code-based prototypes — to test more ambitious or complex experiences.",
        "Identifies where tooling can unlock clearer communication or faster validation and drives its adoption in the pod.",
        "Applies judgement on when AI/tooling adds value versus when it introduces risk (fidelity, accessibility, IP, data).",
      ],
      lead: [
        "Defines how the team leverages AI and tooling to communicate intent and test experiences — the practices, guardrails, and standards.",
        "Champions experimentation with emerging tools and evaluates their impact on craft, speed, and quality across the domain.",
        "Establishes responsible-use expectations for AI (data, IP, accessibility, bias) and models them.",
        "The team looks to them for direction on how technology should augment the design process.",
      ],
    },
  },
  {
    id: "commercial-thinking",
    label: "Commercial Thinking",
    subtitle: "Business outcomes & strategic context",
    area: "outcomes",
    descriptions: {
      junior: [
        "Works from defined briefs and problem statements; understands the project goal.",
        "Limited use of business context to shape what should be built — takes the brief as given.",
        "Beginning to ask why the work matters and how it will be measured.",
      ],
      mid: [
        "Works with their PM to frame problems using a clear understanding of user needs and business goals.",
        "Articulates why a solution is needed, what success looks like, and how design contributes to outcomes.",
        "Considers commercial impact when making design choices — e.g. how a flow change moves processing volume, plan upgrade, PayRewards adoption, or conversion.",
      ],
      senior: [
        "Identifies and prioritises high-impact problems by understanding business strategy and user needs together.",
        "Partners with their PM to shape what the pod chooses to build, contributing strong problem framing and a clear value case.",
        "Connects design choices to commercial drivers (revenue, retention, plan upgrade, point-earn behaviour, NPS) and uses them to argue for direction.",
      ],
      lead: [
        "Steers their domain's design execution toward measurable business outcomes.",
        "Co-owns the domain's product vision alongside PM and EM peers.",
        "Defines how design contributes to commercial strategy at the domain level — e.g. how a redesigned approval workflow drives premium plan adoption, or how a rewards UX change improves earn velocity.",
      ],
    },
  },
  {
    id: "delivery",
    label: "Delivery",
    subtitle: "Shipping, quality, execution",
    area: "outcomes",
    descriptions: {
      junior: [
        "Plans and estimates their own work with support; meets deadlines on bounded tasks.",
        "Checks in regularly with PM/EM; flags blockers early.",
        "Conducts QA on their work; learns to write good design specs / annotations.",
      ],
      mid: [
        "Independently plans and delivers pieces of work through to ship.",
        "Makes thoughtful trade-offs between quality, scope, and pace; prioritises pace over perfection where appropriate without dropping quality.",
        "Conducts QA, files bugs, and tracks impact post-launch.",
        "Works closely with engineering to handle edge cases and unblock implementation.",
      ],
      senior: [
        "Owns multiple pieces of end-to-end work across their domain in parallel.",
        "Sets the quality bar for shipping in their area; mentors others on QA, handoff, and post-launch tracking.",
        "Drives go-to-market alignment with PM and marketing; ensures launch readiness across surfaces.",
      ],
      lead: [
        "Plans and delivers improvements at short notice across multiple business contexts.",
        "Sets the velocity and quality bar for their domain; the team can depend on the Lead's area to ship on time and at quality.",
        "Focuses on high-impact projects that move the business and customer outcomes.",
      ],
    },
  },
  {
    id: "collaboration-communication",
    label: "Collaboration & Communication",
    subtitle: "Cross-functional working, clarity, influence",
    area: "people",
    descriptions: {
      junior: [
        "Communicates clearly within team and discipline; documents work transparently.",
        "Collaborates cooperatively in their pod; pairs with peers and senior designers.",
        "Resolves design feedback with guidance; seeks help when stuck.",
        "Builds understanding of how design works within the company and the broader business.",
      ],
      mid: [
        "Collaborates effectively across disciplines (PM, EM, Engineering, Marketing, Ops).",
        "Uses clear communication, rationale, and trade-offs to align others and move work forward.",
        "Organises and contributes to collaborative activities and workshops; explains process and outcomes in formal presentations.",
        "Spots opportunities to collaborate beyond their immediate pod.",
      ],
      senior: [
        "Improves how collaboration works — creates clarity, alignment, and momentum across disciplines.",
        "Uses influence to resolve friction, guide decisions, and elevate outcomes without relying on authority.",
        "Confidently communicates to senior stakeholders about process and outcomes, with relation to the broader business landscape.",
        "Organises and ensures the quality of collaborative activities and workshops.",
      ],
      lead: [
        "Takes a strategic perspective to sharing knowledge — looks for new relationships and opportunities to share and deliver impact.",
        "Inspires the design team to improve the quality of their communication.",
        "Leads and directs cross-functional conversations — keeps them on-track and focused on actionable next steps.",
        "Understands and improves team dynamics; encourages positive working styles.",
      ],
    },
  },
  {
    id: "stakeholder-management",
    label: "Stakeholder Management",
    subtitle: "Alignment, trust, expectation-setting",
    area: "people",
    descriptions: {
      junior: [
        "Participates in stakeholder discussions with support; communicates progress when prompted.",
        "Builds working relationships with their immediate cross-functional team.",
        "Manages feedback reactively; learns to read stakeholder priorities.",
      ],
      mid: [
        "Proactively manages stakeholder relationships through clear communication and expectation-setting.",
        "Builds trust by keeping stakeholders informed, aligned, and confident throughout delivery.",
        "Communicates progress and decisions even when not prompted, with appropriate context and narrative.",
        "Aligns differing priorities into a workable path forward.",
      ],
      senior: [
        "Shapes stakeholder conversations through clear narrative and rationale.",
        "Anticipates concerns and influences direction early; secures the decisions needed to finalise design direction.",
        "Aligns cross-functional stakeholders; ensures seamless collaboration on complex projects.",
        "Acts as a trusted partner to their PM/EM peers and to senior cross-functional partners in their domain.",
      ],
      lead: [
        "Represents design at senior cross-functional forums for their domain (and at exec when relevant).",
        "Establishes how stakeholder alignment works in their domain — the rituals, the cadence, the decision rights.",
        "Influences the broader business on what design needs (resourcing, lead time, research access) to deliver well.",
        "Acts as a trusted partner balancing business needs with team advocacy to drive confident decision-making.",
      ],
    },
  },
  {
    id: "mentorship-leadership",
    label: "Mentorship & People Leadership",
    subtitle: "Growing others, direct reports (Senior+)",
    area: "people",
    descriptions: {
      junior: [
        "Focuses on their own growth; seeks feedback proactively from senior designers.",
        "Shares knowledge with peers when asked.",
        "No direct report responsibility.",
      ],
      mid: [
        "Shares skills, techniques, and ways of working with peers.",
        "Provides constructive, actionable feedback to others, including in crits and design reviews.",
        "Supports junior team members informally; helps onboard new joiners.",
        "No direct report responsibility yet.",
      ],
      senior: [
        "Takes clear ownership of developing other designers; raises the team's capability bar.",
        "May line-manage 1–2 direct reports (usually Junior/Mid) — conducts 1:1s, feedback, and growth planning.",
        "Mentors with intent; follows through on growth conversations.",
        "Beginning to develop their own people leadership style with coaching from the Head of Design.",
      ],
      lead: [
        "Builds their own people leadership style; provides effective and inspiring leadership to their direct reports.",
        "Typically line-manages 1–2 designers (mix across levels).",
        "Drives growth conversations, performance management, and hiring loops for their domain.",
        "Acts as design DRI for the domain — owns design strategy, quality, and roadmap influence end-to-end.",
      ],
    },
  },
];

// Definitions section from the PDF — shown beneath the matrix as glossary.
export const DEFINITIONS: import("./types").Definition[] = [
  {
    term: "Domain",
    description:
      "A coherent product area within the business — e.g. Payments, Rewards, Onboarding, Mobile. The Lead role is scoped to a single domain.",
  },
  {
    term: "Complex problem",
    description:
      "A problem with multiple stakeholders, contrasting opinions, technical or compliance constraints, or significant ambiguity in scope or desired outcome.",
  },
  {
    term: "High quality",
    description:
      "Design that requires no substantial revision after senior review; receives open praise from collaborators; is sustainably extensible (not one-off); and respects accessibility (minimum WCAG AA), brand, and the design system.",
  },
  {
    term: "Sustained behaviour",
    description:
      "Consistent demonstration over 2+ quarters with multiple examples — not a one-off achievement. This is the bar for moving up a level.",
  },
  {
    term: "Senior stakeholder",
    description:
      "A stakeholder more senior than a squad-level PM, EM, or Designer — e.g. a Head of, GM, Director, or Exec.",
  },
  {
    term: "Direct report",
    description:
      "A designer who reports into another designer (Senior or Lead) for performance, growth, and pastoral care. People management responsibilities scale with level.",
  },
];

// Default expectations are uniform per role: a Mid is expected at the Mid
// column across every capability. Users can override per-cell in Define mode.
function uniform(role: Role): Record<import("./types").CompetencyId, import("./types").Level> {
  const level = roleLevel(role);
  return {
    "design-craft": level,
    "research-insights": level,
    "tooling": level,
    "commercial-thinking": level,
    "delivery": level,
    "collaboration-communication": level,
    "stakeholder-management": level,
    "mentorship-leadership": level,
  };
}

export const ROLE_EXPECTATIONS: RoleExpectations = {
  junior: uniform("junior"),
  mid: uniform("mid"),
  senior: uniform("senior"),
  lead: uniform("lead"),
};
