import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type PricedLineItem } from "@/features/quotes/types";
import { UNIT_SHORT_LABELS } from "@/features/quotes/units";
import { formatMoney } from "@/lib/format";

type LineItemsTableProps = {
  items: PricedLineItem[];
};

export const LineItemsTable = ({ items }: LineItemsTableProps) => {
  if (items.length === 0) {
    return (
      <p className="px-4 py-8 text-center text-sm text-muted-foreground">
        No line items yet.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader className="bg-muted/50">
        <TableRow className="hover:bg-transparent">
          <TableHead className="px-4 text-muted-foreground">
            Description
          </TableHead>
          <TableHead className="hidden px-4 text-right text-muted-foreground sm:table-cell">
            Qty
          </TableHead>
          <TableHead className="hidden px-4 text-right text-muted-foreground sm:table-cell">
            Unit price
          </TableHead>
          <TableHead className="px-4 text-right text-muted-foreground">
            Amount
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {items.map((item) => {
          const unit = UNIT_SHORT_LABELS[item.unit];

          return (
            <TableRow key={item.id}>
              <TableCell className="px-4 py-3 whitespace-normal">
                <p className="font-medium break-words">{item.description}</p>
                {/* On phones Qty and Unit price columns are hidden, so show them here. */}
                <p className="mt-0.5 text-muted-foreground tabular-nums sm:hidden">
                  {item.quantity} {unit} × {formatMoney(item.unitPriceCents)}
                </p>
              </TableCell>
              <TableCell className="hidden px-4 py-3 text-right tabular-nums sm:table-cell">
                {item.quantity}{" "}
                <span className="text-muted-foreground">{unit}</span>
              </TableCell>
              <TableCell className="hidden px-4 py-3 text-right tabular-nums sm:table-cell">
                {formatMoney(item.unitPriceCents)}
              </TableCell>
              <TableCell className="px-4 py-3 text-right font-medium tabular-nums">
                {formatMoney(item.lineTotalCents)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
