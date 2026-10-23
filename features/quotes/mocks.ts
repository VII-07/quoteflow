import {
  calculateLineTotal,
  calculateQuoteTotals,
} from "@/features/quotes/total";
import {
  type DraftQuote,
  type IssuedQuote,
  type LineItem,
  type Quote,
} from "@/features/quotes/types";
import { CURRENCY } from "@/types/common";

// Mock data until the backend exists. Only data.ts should import this file.
// IDs, numbers and dates are fixed strings, so URLs stay stable and nothing
// depends on the current time (which Cache Components forbids during prerender).

const CLIENT_HARBOURSIDE = "c0000000-0000-4000-8000-000000000001";
const CLIENT_SMITH = "c0000000-0000-4000-8000-000000000002";
const CLIENT_LONG_NAME = "c0000000-0000-4000-8000-000000000003";
const CLIENT_JANE = "c0000000-0000-4000-8000-000000000004";

// Mirrors what the server will do on "send": line totals and quote totals are
// calculated once and stored as a snapshot (SPEC 5.3). Computing them here
// instead of hardcoding numbers means the mock snapshot can never drift from
// the line items.
const issue = (
  quote: Omit<IssuedQuote, "totals" | "items"> & { items: LineItem[] },
): IssuedQuote => ({
  ...quote,
  items: quote.items.map((item) => ({
    ...item,
    lineTotalCents: calculateLineTotal(item.quantity, item.unitPriceCents),
  })),
  totals: calculateQuoteTotals(quote.items, quote.taxRateBps),
});

const draft = (quote: DraftQuote): DraftQuote => quote;

export const MOCK_QUOTES: Quote[] = [
  // Draft: the SPEC 5.2 reference example (expected total £95.98).
  draft({
    id: "e0000000-0000-4000-8000-000000000001",
    number: "Q-2026-0001",
    clientId: CLIENT_HARBOURSIDE,
    status: "draft",
    currency: CURRENCY,
    taxRateBps: 2000,
    items: [
      {
        id: "f0000000-0000-4000-8000-000000000101",
        description: "Floor tiles, porcelain 600x600",
        quantity: 2.5,
        unit: "sq_m",
        unitPriceCents: 1999,
      },
      {
        id: "f0000000-0000-4000-8000-000000000102",
        description: "Tile fixings",
        quantity: 3,
        unit: "pcs",
        unitPriceCents: 1000,
      },
    ],
    issueDate: "2026-10-14",
    validUntil: "2026-11-13",
    createdAt: "2026-10-14T10:00:00Z",
    updatedAt: "2026-10-14T10:20:00Z",
  }),

  // Draft with no line items: allowed as a draft, cannot be sent.
  draft({
    id: "e0000000-0000-4000-8000-000000000002",
    number: "Q-2026-0002",
    clientId: CLIENT_SMITH,
    status: "draft",
    currency: CURRENCY,
    taxRateBps: 2000,
    items: [],
    issueDate: "2026-10-15",
    validUntil: "2026-11-14",
    createdAt: "2026-10-15T08:15:00Z",
    updatedAt: "2026-10-15T08:15:00Z",
  }),

  // Sent, still valid. Mixes labour (hr, day) with fractional materials.
  issue({
    id: "e0000000-0000-4000-8000-000000000003",
    number: "Q-2026-0003",
    clientId: CLIENT_HARBOURSIDE,
    status: "sent",
    currency: CURRENCY,
    taxRateBps: 2000,
    items: [
      {
        id: "f0000000-0000-4000-8000-000000000301",
        description: "Plastering, walls and ceiling",
        quantity: 12.345,
        unit: "sq_m",
        unitPriceCents: 1850,
      },
      {
        id: "f0000000-0000-4000-8000-000000000302",
        description: "Labourer",
        quantity: 16,
        unit: "hr",
        unitPriceCents: 2500,
      },
      {
        id: "f0000000-0000-4000-8000-000000000303",
        description: "Plasterer day rate",
        quantity: 2,
        unit: "day",
        unitPriceCents: 28000,
      },
    ],
    notes: "50% deposit before work starts, balance on completion.",
    issueDate: "2026-10-10",
    validUntil: "2026-11-20",
    createdAt: "2026-10-09T13:00:00Z",
    updatedAt: "2026-10-10T09:00:00Z",
  }),

  // Accepted: read-only, never expires.
  issue({
    id: "e0000000-0000-4000-8000-000000000004",
    number: "Q-2026-0004",
    clientId: CLIENT_SMITH,
    status: "accepted",
    currency: CURRENCY,
    taxRateBps: 2000,
    items: [
      {
        id: "f0000000-0000-4000-8000-000000000401",
        description: "Kitchen strip-out and disposal",
        quantity: 1,
        unit: "pcs",
        unitPriceCents: 85000,
      },
      {
        id: "f0000000-0000-4000-8000-000000000402",
        description: "Copper pipe 15mm",
        quantity: 18.5,
        unit: "m",
        unitPriceCents: 645,
      },
      {
        id: "f0000000-0000-4000-8000-000000000403",
        description: "Plumber",
        quantity: 7.5,
        unit: "hr",
        unitPriceCents: 5500,
      },
    ],
    issueDate: "2026-09-01",
    validUntil: "2026-10-01",
    createdAt: "2026-08-30T11:00:00Z",
    updatedAt: "2026-09-05T16:30:00Z",
  }),

  // Rejected, for the long-name client, with a very long line description.
  issue({
    id: "e0000000-0000-4000-8000-000000000005",
    number: "Q-2026-0005",
    clientId: CLIENT_LONG_NAME,
    status: "rejected",
    currency: CURRENCY,
    taxRateBps: 2000,
    items: [
      {
        id: "f0000000-0000-4000-8000-000000000501",
        description:
          "Supply and install external wall insulation system to rear elevation including scaffolding, render finish, new window sills and making good to all disturbed surfaces",
        quantity: 86.25,
        unit: "sq_m",
        unitPriceCents: 11500,
      },
    ],
    issueDate: "2026-08-12",
    validUntil: "2026-09-11",
    createdAt: "2026-08-11T09:00:00Z",
    updatedAt: "2026-08-20T10:00:00Z",
  }),

  // Expired: moved by the server job after validUntil passed.
  issue({
    id: "e0000000-0000-4000-8000-000000000006",
    number: "Q-2026-0006",
    clientId: CLIENT_JANE,
    status: "expired",
    currency: CURRENCY,
    taxRateBps: 2000,
    items: [
      {
        id: "f0000000-0000-4000-8000-000000000601",
        description: "Replace garden fence panels",
        quantity: 6,
        unit: "pcs",
        unitPriceCents: 4250,
      },
      {
        id: "f0000000-0000-4000-8000-000000000602",
        description: "Fencer",
        quantity: 1,
        unit: "day",
        unitPriceCents: 22000,
      },
    ],
    issueDate: "2026-08-25",
    validUntil: "2026-09-24",
    createdAt: "2026-08-25T12:00:00Z",
    updatedAt: "2026-09-25T00:05:00Z",
  }),

  // Sent but validUntil already passed: valid data, the expiry job just
  // hasn't run yet (SPEC 5.7). The UI must not "fix" this on its own.
  issue({
    id: "e0000000-0000-4000-8000-000000000007",
    number: "Q-2026-0007",
    clientId: CLIENT_LONG_NAME,
    status: "sent",
    currency: CURRENCY,
    taxRateBps: 2000,
    items: [
      {
        id: "f0000000-0000-4000-8000-000000000701",
        description: "Roof survey",
        quantity: 1,
        unit: "pcs",
        unitPriceCents: 35000,
      },
    ],
    issueDate: "2026-09-01",
    validUntil: "2026-10-01",
    createdAt: "2026-09-01T09:00:00Z",
    updatedAt: "2026-09-01T09:00:00Z",
  }),

  // Zero-rated VAT (e.g. new-build residential work).
  issue({
    id: "e0000000-0000-4000-8000-000000000008",
    number: "Q-2026-0008",
    clientId: CLIENT_SMITH,
    status: "sent",
    currency: CURRENCY,
    taxRateBps: 0,
    items: [
      {
        id: "f0000000-0000-4000-8000-000000000801",
        description: "Blockwork, new-build extension",
        quantity: 42.5,
        unit: "sq_m",
        unitPriceCents: 6400,
      },
    ],
    notes: "Zero-rated: new-build residential.",
    issueDate: "2026-10-05",
    validUntil: "2026-11-04",
    createdAt: "2026-10-05T10:00:00Z",
    updatedAt: "2026-10-05T10:00:00Z",
  }),

  // Total of £0.00 (free warranty callout).
  issue({
    id: "e0000000-0000-4000-8000-000000000009",
    number: "Q-2026-0009",
    clientId: CLIENT_JANE,
    status: "accepted",
    currency: CURRENCY,
    taxRateBps: 2000,
    items: [
      {
        id: "f0000000-0000-4000-8000-000000000901",
        description: "Warranty callout: reseal shower tray",
        quantity: 1,
        unit: "pcs",
        unitPriceCents: 0,
      },
    ],
    notes: "Covered by warranty on Q-2026-0004.",
    issueDate: "2026-10-08",
    validUntil: "2026-10-22",
    createdAt: "2026-10-08T15:00:00Z",
    updatedAt: "2026-10-09T09:30:00Z",
  }),

  // Very large total (£1,199,999.99 incl. VAT), to check formatting and layout.
  issue({
    id: "e0000000-0000-4000-8000-000000000010",
    number: "Q-2026-0010",
    clientId: CLIENT_HARBOURSIDE,
    status: "sent",
    currency: CURRENCY,
    taxRateBps: 2000,
    items: [
      {
        id: "f0000000-0000-4000-8000-000000001001",
        description: "Main contract works, phase 1",
        quantity: 1,
        unit: "pcs",
        unitPriceCents: 99_999_999,
      },
    ],
    issueDate: "2026-10-12",
    validUntil: "2026-12-11",
    createdAt: "2026-10-11T16:00:00Z",
    updatedAt: "2026-10-12T08:45:00Z",
  }),
];
