import {
  type CalendarDate,
  type Currency,
  type IsoTimestamp,
} from "@/types/common";
import { type Unit } from "@/features/quotes/units";

export type LineItem = {
  id: string;
  description: string;
  quantity: number;
  unit: Unit;
  unitPriceCents: number;
};

// A line item with its total in pence. Stored on issued quotes (snapshot),
// calculated on the fly for drafts (see getDisplayItems).
export type PricedLineItem = LineItem & { lineTotalCents: number };

export type QuoteStatus =
  "draft" | "sent" | "accepted" | "rejected" | "expired";

export type QuoteTotals = {
  subtotalCents: number;
  taxCents: number;
  totalCents: number;
};

export type QuoteBase = {
  id: string;
  number: string;
  clientId: string;
  taxRateBps: number;
  notes?: string;
  issueDate: CalendarDate;
  currency: Currency;
  validUntil: CalendarDate;
  createdAt: IsoTimestamp;
  updatedAt: IsoTimestamp;
};

export type DraftQuote = QuoteBase & { status: "draft"; items: LineItem[] };
export type IssuedQuote = QuoteBase & {
  status: Exclude<QuoteStatus, "draft">;
  totals: QuoteTotals;
  items: PricedLineItem[];
};

export type Quote = DraftQuote | IssuedQuote;
