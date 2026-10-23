export const UNITS = ["pcs", "sq_m", "m", "kg", "hr", "day"] as const;

export type Unit = (typeof UNITS)[number];

export const UNIT_LABELS = {
  pcs: "Pieces (pcs)",
  sq_m: "Square metres (m²)",
  m: "Linear metres (m)",
  kg: "Kilograms (kg)",
  hr: "Hours (hr)",
  day: "Days (day)",
} as const satisfies Record<Unit, string>;

// Compact labels for tables, where the long form doesn't fit.
export const UNIT_SHORT_LABELS = {
  pcs: "pcs",
  sq_m: "m²",
  m: "m",
  kg: "kg",
  hr: "hr",
  day: "day",
} as const satisfies Record<Unit, string>;
