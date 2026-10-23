import {
  type LineItem,
  type QuoteTotals,
  type Quote,
  type PricedLineItem,
} from "@/features/quotes/types";

export const calculateLineTotal = (
  quantity: number,
  unitPriceCents: number,
): number => {
  const quantityThousandths = Math.round(quantity * 1000);
  const exactCents = (quantityThousandths * unitPriceCents) / 1000;

  return Math.round(exactCents);
};

export const calculateTaxCents = (
  subtotalCents: number,
  taxRateBps: number,
): number => {
  return Math.round((subtotalCents * taxRateBps) / 10_000);
};

export const calculateQuoteTotals = (
  items: LineItem[],
  taxRateBps: number,
): QuoteTotals => {
  const subtotalCents = items.reduce(
    (sum, item) => sum + calculateLineTotal(item.quantity, item.unitPriceCents),
    0,
  );
  const taxCents: number = calculateTaxCents(subtotalCents, taxRateBps);

  return {
    subtotalCents,
    taxCents,
    totalCents: subtotalCents + taxCents,
  };
};

export const getDisplayTotals = (quote: Quote): QuoteTotals => {
  if (quote.status === "draft")
    return calculateQuoteTotals(quote.items, quote.taxRateBps);

  return quote.totals;
};

export const getDisplayItems = (quote: Quote): PricedLineItem[] => {
  if (quote.status === "draft") {
    return quote.items.map((item) => ({
      ...item,
      lineTotalCents: calculateLineTotal(item.quantity, item.unitPriceCents),
    }));
  }

  return quote.items;
};
