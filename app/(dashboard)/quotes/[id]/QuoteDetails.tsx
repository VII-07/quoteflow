import { getClientById } from "@/features/clients/data";
import { getQuoteById } from "@/features/quotes/data";
import { calculateLineTotal, getDisplayTotals } from "@/features/quotes/total";
import { UNIT_LABELS } from "@/features/quotes/units";
import { formatCalendarDate, formatMoney } from "@/lib/format";
import { notFound } from "next/navigation";

export const QuoteDetails = async ({
  params,
}: Pick<PageProps<"/quotes/[id]">, "params">) => {
  const { id } = await params;
  const quote = await getQuoteById(id);

  if (!quote) {
    notFound();
  }

  const client = await getClientById(quote.clientId);

  const totals = getDisplayTotals(quote);

  return (
    <div className="space-y-8">
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold">{quote.number}</h1>
            <p className="text-muted-foreground">
              Client:{" "}
              <span className="font-medium text-foreground">
                {client?.name ?? "Unknown client"}
              </span>
            </p>
          </div>
          <div className="rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground capitalize">
            {quote.status}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Issue Date</p>
            <p className="font-medium">{formatCalendarDate(quote.issueDate)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Valid Until</p>
            <p className="font-medium">
              {formatCalendarDate(quote.validUntil)}
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-card shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-muted/50 text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Description</th>
              <th className="px-4 py-3 text-right font-medium">Qty</th>
              <th className="px-4 py-3 font-medium">Unit</th>
              <th className="px-4 py-3 text-right font-medium">Unit Price</th>
              <th className="px-4 py-3 text-right font-medium">Line Total</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {quote.items.map((item) => (
              <tr key={item.id} className="hover:bg-muted/20">
                <td className="px-4 py-3 font-medium">{item.description}</td>
                <td className="px-4 py-3 text-right">{item.quantity}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {UNIT_LABELS[item.unit]}
                </td>
                <td className="px-4 py-3 text-right">
                  {formatMoney(item.unitPriceCents)}
                </td>
                <td className="px-4 py-3 text-right font-semibold">
                  {formatMoney(
                    calculateLineTotal(item.quantity, item.unitPriceCents),
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <div className="w-full max-w-xs space-y-2 rounded-lg border bg-card p-4 text-sm shadow-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span className="font-medium text-foreground">
              {formatMoney(totals.subtotalCents)}
            </span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>VAT ({quote.taxRateBps / 100}%)</span>
            <span className="font-medium text-foreground">
              {formatMoney(totals.taxCents)}
            </span>
          </div>
          <div className="flex justify-between border-t pt-2 text-base font-bold text-foreground">
            <span>Total</span>
            <span>{formatMoney(totals.totalCents)}</span>
          </div>
        </div>
      </div>

      {quote.notes && (
        <div className="rounded-lg border bg-muted/30 p-4 text-sm">
          <h2 className="font-semibold text-foreground">Notes</h2>
          <p className="mt-1 whitespace-pre-wrap text-muted-foreground">
            {quote.notes}
          </p>
        </div>
      )}
    </div>
  );
};
