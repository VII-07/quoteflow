import { describe, expect, it } from "vitest";
import {
  calculateLineTotal,
  calculateQuoteTotals,
  calculateTaxCents,
} from "@/features/quotes/total";
import { type LineItem } from "@/features/quotes/types";

const makeItem = (
  quantity: number,
  unitPriceCents: number,
  overrides: Partial<LineItem> = {},
): LineItem => ({
  id: "test-item-id",
  description: "Test Item",
  unit: "pcs",
  quantity,
  unitPriceCents,
  ...overrides,
});

describe("calculateLineTotal", () => {
  it.each([
    {
      scenario: "calculates total for integer quantities without fraction",
      quantity: 3,
      unitPriceCents: 1000,
      expected: 3000,
    },
    {
      scenario:
        "rounds half-cent up (Half-Up) for fractional quantities (2.5 * 1999 = 4997.5 -> 4998)",
      quantity: 2.5,
      unitPriceCents: 1999,
      expected: 4998,
    },
    {
      scenario: "returns 0 when quantity is 0",
      quantity: 0,
      unitPriceCents: 1999,
      expected: 0,
    },
    {
      scenario: "multiplies a 3-decimal quantity (0.333 * 3000 = 999)",
      quantity: 0.333,
      unitPriceCents: 3000,
      expected: 999,
    },
    {
      scenario:
        "avoids IEEE-754 precision bug at .5 boundary: 0.285 * 100 = 28.5 (naive float gives 28.49999... -> 28)",
      quantity: 0.285,
      unitPriceCents: 100,
      expected: 29,
    },
    {
      scenario:
        "avoids IEEE-754 precision bug at .5 boundary: 1.005 * 100 = 100.5 (naive float gives 100.49999... -> 100)",
      quantity: 1.005,
      unitPriceCents: 100,
      expected: 101,
    },
    {
      scenario:
        "avoids IEEE-754 precision bug at .5 boundary: 2.135 * 100 = 213.5 (naive float gives 213.49999... -> 213)",
      quantity: 2.135,
      unitPriceCents: 100,
      expected: 214,
    },
  ])("$scenario", ({ quantity, unitPriceCents, expected }) => {
    expect(calculateLineTotal(quantity, unitPriceCents)).toBe(expected);
  });
});

describe("calculateTaxCents", () => {
  it.each([
    {
      scenario:
        "calculates 20% VAT (2000 bps) with proper rounding (1599.6 -> 1600)",
      subtotalCents: 7998,
      taxRateBps: 2000,
      expected: 1600,
    },
    {
      scenario: "returns 0 for zero-rated tax (0 bps)",
      subtotalCents: 7998,
      taxRateBps: 0,
      expected: 0,
    },
    {
      scenario: "returns 0 when subtotal is 0",
      subtotalCents: 0,
      taxRateBps: 2000,
      expected: 0,
    },
    {
      scenario: "calculates 5% reduced rate (500 bps)",
      subtotalCents: 10000,
      taxRateBps: 500,
      expected: 500,
    },
  ])("$scenario", ({ subtotalCents, taxRateBps, expected }) => {
    expect(calculateTaxCents(subtotalCents, taxRateBps)).toBe(expected);
  });
});

describe("calculateQuoteTotals", () => {
  it.each([
    {
      scenario: "calculates reference example from SPEC.md correctly",
      items: [
        makeItem(2.5, 1999, {
          id: "1",
          description: "Floor tiles",
          unit: "sq_m",
        }),
        makeItem(3, 1000, {
          id: "2",
          description: "Fixings",
          unit: "pcs",
        }),
      ],
      taxRateBps: 2000,
      expected: {
        subtotalCents: 7998,
        taxCents: 1600,
        totalCents: 9598,
      },
    },
    {
      scenario: "returns all zeros for empty items array",
      items: [],
      taxRateBps: 2000,
      expected: {
        subtotalCents: 0,
        taxCents: 0,
        totalCents: 0,
      },
    },
    {
      scenario: "handles quote with 0% VAT rate",
      items: [makeItem(10, 5000, { unit: "hr", description: "Labour" })],
      taxRateBps: 0,
      expected: {
        subtotalCents: 50000,
        taxCents: 0,
        totalCents: 50000,
      },
    },
    {
      scenario:
        "handles large amounts without overflow or precision loss (1 * 99_999_999 at 20% VAT -> 119_999_999)",
      items: [makeItem(1, 99_999_999)],
      taxRateBps: 2000,
      expected: {
        subtotalCents: 99_999_999,
        taxCents: 20_000_000,
        totalCents: 119_999_999,
      },
    },
  ])("$scenario", ({ items, taxRateBps, expected }) => {
    expect(calculateQuoteTotals(items, taxRateBps)).toEqual(expected);
  });
});
