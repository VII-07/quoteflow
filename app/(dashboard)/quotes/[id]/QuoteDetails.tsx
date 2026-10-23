import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getClientById } from "@/features/clients/data";
import { LineItemsTable } from "@/features/quotes/components/LineItemsTable";
import { QuoteStatusBadge } from "@/features/quotes/components/QuoteStatusBadge";
import { QuoteTotalsSummary } from "@/features/quotes/components/QuoteTotalsSummary";
import { getQuoteById } from "@/features/quotes/data";
import { getDisplayItems, getDisplayTotals } from "@/features/quotes/total";
import { formatCalendarDate } from "@/lib/format";

export const QuoteDetails = async ({
  params,
}: Pick<PageProps<"/quotes/[id]">, "params">) => {
  const { id } = await params;
  const quote = await getQuoteById(id);

  if (!quote) {
    notFound();
  }

  const client = await getClientById(quote.clientId);
  const items = getDisplayItems(quote);
  const totals = getDisplayTotals(quote);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold tracking-tight">
                  {quote.number}
                </h1>
                <QuoteStatusBadge status={quote.status} />
              </div>
              <p className="mt-1 break-words text-muted-foreground">
                {client?.name ?? "Unknown client"}
              </p>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-4 border-t pt-4 text-sm sm:grid-cols-4">
            <div>
              <dt className="text-muted-foreground">Issued</dt>
              <dd className="mt-0.5 font-medium">
                {formatCalendarDate(quote.issueDate)}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Valid until</dt>
              <dd className="mt-0.5 font-medium">
                {formatCalendarDate(quote.validUntil)}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card className="pb-0">
        <CardHeader>
          <CardTitle>
            <h2>Line items</h2>
          </CardTitle>
        </CardHeader>
        <LineItemsTable items={items} />
      </Card>

      <div className="grid gap-6 md:grid-cols-[1fr_20rem] md:items-start">
        {quote.notes ? (
          <Card>
            <CardHeader>
              <CardTitle>
                <h2>Notes</h2>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-muted-foreground">
                {quote.notes}
              </p>
            </CardContent>
          </Card>
        ) : (
          // Keeps the totals card in the right column when there are no notes.
          <div className="hidden md:block" />
        )}

        {/* Totals matter most, so on phones they come before the notes. */}
        <Card className="order-first md:order-none">
          <CardContent>
            <QuoteTotalsSummary totals={totals} taxRateBps={quote.taxRateBps} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
