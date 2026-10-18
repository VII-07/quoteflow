import { describe, expect, it } from "vitest";
import { MOCK_CLIENTS } from "@/features/clients/mocks";
import { MOCK_QUOTES } from "@/features/quotes/mocks";
import { calculateQuoteTotals } from "@/features/quotes/total";
import { type QuoteStatus } from "@/features/quotes/types";

// Integrity checks for the mock data itself: bad test data hides real bugs.
describe("mock data integrity", () => {
  it("has unique quote ids and numbers", () => {
    const ids = MOCK_QUOTES.map((quote) => quote.id);
    const numbers = MOCK_QUOTES.map((quote) => quote.number);

    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(numbers).size).toBe(numbers.length);
  });

  it("has unique client ids", () => {
    const ids = MOCK_CLIENTS.map((client) => client.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it("references only existing clients", () => {
    const clientIds = new Set(MOCK_CLIENTS.map((client) => client.id));

    for (const quote of MOCK_QUOTES) {
      expect(clientIds, quote.number).toContain(quote.clientId);
    }
  });

  it("covers every quote status at least once", () => {
    const statuses: QuoteStatus[] = [
      "draft",
      "sent",
      "accepted",
      "rejected",
      "expired",
    ];
    const present = new Set(MOCK_QUOTES.map((quote) => quote.status));

    for (const status of statuses) {
      expect(present, status).toContain(status);
    }
  });

  it("stores totals on issued quotes that match their line items", () => {
    for (const quote of MOCK_QUOTES) {
      if (quote.status === "draft") continue;

      expect(quote.totals, quote.number).toEqual(
        calculateQuoteTotals(quote.items, quote.taxRateBps),
      );
    }
  });

  it("only issues quotes that have at least one line item", () => {
    for (const quote of MOCK_QUOTES) {
      if (quote.status === "draft") continue;

      expect(quote.items.length, quote.number).toBeGreaterThan(0);
    }
  });

  it("has validUntil on or after issueDate", () => {
    for (const quote of MOCK_QUOTES) {
      // YYYY-MM-DD strings compare correctly as plain strings.
      expect(quote.validUntil >= quote.issueDate, quote.number).toBe(true);
    }
  });

  it("uses integer pence and quantities with at most 3 decimals", () => {
    for (const quote of MOCK_QUOTES) {
      for (const item of quote.items) {
        const label = `${quote.number} / ${item.description}`;
        const thousandths = item.quantity * 1000;

        expect(Number.isInteger(item.unitPriceCents), label).toBe(true);
        expect(item.unitPriceCents, label).toBeGreaterThanOrEqual(0);
        expect(item.quantity, label).toBeGreaterThan(0);
        expect(
          Math.abs(thousandths - Math.round(thousandths)),
          label,
        ).toBeLessThan(1e-9);
      }
    }
  });
});
