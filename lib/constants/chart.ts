// Categorical chart palette derived from the global brand design system
// (see app/globals.css → Brand palette). Use these for any multi-series
// chart (donut / bar / line) so visualizations stay on-brand and consistent.

export const CHART_COLORS = {
  violet: "#7034ea", // Primary
  mint: "#09ff9b", // Secondary
  sky: "#2e90fa", // Sky blue
  sun: "#f5a524", // Sun amber
  coral: "#ff5714", // CTA
  tertiary: "#aa3fff", // Tertiary
  rose: "#ea4c89", // Rose
} as const;

// Ordered series for categorical charts — high-contrast, brand-consistent.
export const CHART_SERIES = [
  CHART_COLORS.violet,
  CHART_COLORS.mint,
  CHART_COLORS.sky,
  CHART_COLORS.sun,
  CHART_COLORS.coral,
  CHART_COLORS.tertiary,
  CHART_COLORS.rose,
] as const;

// Default single-series accent (bar / line charts).
export const CHART_ACCENT = CHART_COLORS.violet;
