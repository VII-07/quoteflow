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
