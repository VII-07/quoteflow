import { Currency } from "@/types/common";
import { type CalendarDate, type IsoTimestamp } from "@/types/common";
import { type Unit } from "@/features/quotes/units";

export type LineItem = {
  id: string;
  description: string;
  quantity: number;
  unit: Unit;
  unitPriceCents: number;
};

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
  items: LineItem[];
  notes?: string;
  issueDate: CalendarDate;
  currency: Currency;
  validUntil: CalendarDate;
  createdAt: IsoTimestamp;
  updatedAt: IsoTimestamp;
};

export type DraftQuote = QuoteBase & { status: "draft" };
export type IssuedQuote = QuoteBase & {
  status: Exclude<QuoteStatus, "draft">;
  totals: QuoteTotals;
};

export type Quote = DraftQuote | IssuedQuote;
