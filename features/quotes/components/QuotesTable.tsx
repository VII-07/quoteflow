import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { QuoteStatusBadge } from "@/features/quotes/components/QuoteStatusBadge";
import { getDisplayTotals } from "@/features/quotes/total";
import { type Quote } from "@/features/quotes/types";
import { formatCalendarDate, formatMoney } from "@/lib/format";

type QuotesTableProps = {
  quotes: Quote[];
  clientNameById: Map<string, string>;
};

export const QuotesTable = ({ quotes, clientNameById }: QuotesTableProps) => {
  return (
    <Table>
      <TableHeader className="bg-muted/50">
        <TableRow className="hover:bg-transparent">
          <TableHead className="px-4 text-muted-foreground">Number</TableHead>
          <TableHead className="px-4 text-muted-foreground">Client</TableHead>
          <TableHead className="px-4 text-muted-foreground">Status</TableHead>
          <TableHead className="hidden px-4 text-muted-foreground md:table-cell">
            Issued
          </TableHead>
          <TableHead className="hidden px-4 text-muted-foreground lg:table-cell">
            Valid until
          </TableHead>
          <TableHead className="px-4 text-right text-muted-foreground">
            Total
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {quotes.map((quote) => (
          <TableRow key={quote.id}>
            <TableCell className="px-4 py-3">
              <Link
                href={`/quotes/${quote.id}`}
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                {quote.number}
              </Link>
            </TableCell>
            <TableCell className="max-w-48 truncate px-4 py-3 sm:max-w-64">
              {clientNameById.get(quote.clientId) ?? "Unknown client"}
            </TableCell>
            <TableCell className="px-4 py-3">
              <QuoteStatusBadge status={quote.status} />
            </TableCell>
            <TableCell className="hidden px-4 py-3 text-muted-foreground md:table-cell">
              {formatCalendarDate(quote.issueDate)}
            </TableCell>
            <TableCell className="hidden px-4 py-3 text-muted-foreground lg:table-cell">
              {formatCalendarDate(quote.validUntil)}
            </TableCell>
            <TableCell className="px-4 py-3 text-right font-medium tabular-nums">
              {formatMoney(getDisplayTotals(quote).totalCents)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
