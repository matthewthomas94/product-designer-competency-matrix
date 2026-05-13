import { ROLES, ROLE_LABELS, type Role } from "../types";

interface Props {
  value: Role;
  onChange: (role: Role) => void;
}

export function RoleSwitcher({ value, onChange }: Props) {
  return (
    <div
      className="inline-flex rounded-full bg-slate-100 p-1"
      role="radiogroup"
      aria-label="Role"
    >
      {ROLES.map((role) => {
        const active = role === value;
        return (
          <button
            key={role}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(role)}
            className={
              "px-4 py-2 text-sm font-medium rounded-full transition-colors " +
              (active
                ? "bg-slate-900 text-white"
                : "text-slate-700 hover:text-slate-900")
            }
          >
            {ROLE_LABELS[role]}
          </button>
        );
      })}
    </div>
  );
}
