export const version = "0.1.0";

export const defaultTheme = {
  color: {
    canvas: "var(--fx-canvas)",
    surface: "var(--fx-surface)",
    ink: "var(--fx-ink)",
    brand: "var(--fx-brand)",
    accent: "var(--fx-accent)"
  },
  space: {
    1: "var(--fx-space-1)",
    2: "var(--fx-space-2)",
    3: "var(--fx-space-3)",
    4: "var(--fx-space-4)",
    6: "var(--fx-space-6)",
    8: "var(--fx-space-8)"
  }
};

export function defineFluxaraConfig(config = {}) {
  return {
    theme: defaultTheme,
    content: [],
    output: "dist/fluxara.css",
    ...config
  };
}

export function setFluxaraTheme(themeName, root = globalThis.document?.documentElement) {
  if (!root) return;
  root.setAttribute("data-fx-theme", themeName);
}

export function toggleFluxaraTheme(a = "aurora", b = "midnight", root = globalThis.document?.documentElement) {
  if (!root) return undefined;
  const next = root.getAttribute("data-fx-theme") === b ? a : b;
  root.setAttribute("data-fx-theme", next);
  return next;
}
