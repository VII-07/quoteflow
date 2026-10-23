import Link from "next/link";
import { QuoteStatusBadge } from "@/features/quotes/components/QuoteStatusBadge";
import { getDisplayTotals } from "@/features/quotes/total";
import { type Quote } from "@/features/quotes/types";
import { formatCalendarDate, formatMoney } from "@/lib/format";

type QuotesCardListProps = {
  quotes: Quote[];
  clientNameById: Map<string, string>;
};

// Phone layout of the quotes list: a table doesn't fit in ~360px,
// so each quote becomes a tappable row with the key facts stacked.
export const QuotesCardList = ({
  quotes,
  clientNameById,
}: QuotesCardListProps) => {
  return (
    <ul className="divide-y">
      {quotes.map((quote) => (
        <li key={quote.id}>
          <Link
            href={`/quotes/${quote.id}`}
            className="block space-y-1.5 px-4 py-3 transition-colors hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:outline-none"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-medium text-primary">{quote.number}</span>
              <QuoteStatusBadge status={quote.status} />
            </div>
            <p className="truncate text-sm">
              {clientNameById.get(quote.clientId) ?? "Unknown client"}
            </p>
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-muted-foreground">
                {formatCalendarDate(quote.issueDate)}
              </span>
              <span className="font-medium tabular-nums">
                {formatMoney(getDisplayTotals(quote).totalCents)}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
