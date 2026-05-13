import type { Mode } from "./types";
import { MatrixPage } from "./pages/MatrixPage";

function resolveMode(): Mode {
  if (typeof window === "undefined") return "rate";
  const path = window.location.pathname.replace(/\/+$/, "");
  return path === "/define" ? "define" : "rate";
}

export function App() {
  return <MatrixPage mode={resolveMode()} />;
}
