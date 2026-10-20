import { describe, expect, it } from "vitest";
import { formatCalendarDate, formatMoney } from "@/lib/format";

describe("formatMoney", () => {
  it.each([
    { scenario: "formats zero as £0.00", pence: 0, expected: "£0.00" },
    { scenario: "pads single pence", pence: 5, expected: "£0.05" },
    {
      scenario: "converts pence to pounds (SPEC reference total)",
      pence: 9598,
      expected: "£95.98",
    },
    {
      scenario: "adds thousands separators to large totals",
      pence: 999_999_999,
      expected: "£9,999,999.99",
    },
  ])("$scenario", ({ pence, expected }) => {
    expect(formatMoney(pence)).toBe(expected);
  });
});

describe("formatCalendarDate", () => {
  it.each([
    {
      scenario: "formats a regular date",
      date: "2026-10-13",
      expected: "13 Oct 2026",
    },
    {
      scenario: "drops the leading zero from the day",
      date: "2026-01-05",
      expected: "5 Jan 2026",
    },
    {
      scenario: "handles a leap day",
      date: "2024-02-29",
      expected: "29 Feb 2024",
    },
    {
      scenario: "keeps the last day of the year in the same year",
      date: "2026-12-31",
      expected: "31 Dec 2026",
    },
  ])("$scenario", ({ date, expected }) => {
    expect(formatCalendarDate(date)).toBe(expected);
  });
});
