import { type QuoteTotals } from "@/features/quotes/types";
import { formatMoney } from "@/lib/format";

type QuoteTotalsSummaryProps = {
  totals: QuoteTotals;
  taxRateBps: number;
};

export const QuoteTotalsSummary = ({
  totals,
  taxRateBps,
}: QuoteTotalsSummaryProps) => {
  return (
    <dl className="space-y-2 text-sm">
      <div className="flex justify-between gap-4">
        <dt className="text-muted-foreground">Subtotal</dt>
        <dd className="tabular-nums">{formatMoney(totals.subtotalCents)}</dd>
      </div>
      <div className="flex justify-between gap-4">
        <dt className="text-muted-foreground">VAT ({taxRateBps / 100}%)</dt>
        <dd className="tabular-nums">{formatMoney(totals.taxCents)}</dd>
      </div>
      <div className="flex justify-between gap-4 border-t pt-3 text-base font-semibold">
        <dt>Total</dt>
        <dd className="tabular-nums">{formatMoney(totals.totalCents)}</dd>
      </div>
    </dl>
  );
};
