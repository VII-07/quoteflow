import { Badge } from "@/components/ui/badge";
import { type QuoteStatus } from "@/features/quotes/types";
import { cn } from "@/lib/utils";

const STATUS_LABELS = {
  draft: "Draft",
  sent: "Sent",
  accepted: "Accepted",
  rejected: "Rejected",
  expired: "Expired",
} as const satisfies Record<QuoteStatus, string>;

// Soft tinted badges: the text colour carries the meaning, the tint groups it.
const STATUS_STYLES = {
  draft: "bg-muted text-muted-foreground",
  sent: "bg-info/10 text-info",
  accepted: "bg-primary/10 text-primary",
  rejected: "bg-destructive/10 text-destructive",
  expired: "bg-warning/10 text-warning",
} as const satisfies Record<QuoteStatus, string>;

type QuoteStatusBadgeProps = {
  status: QuoteStatus;
  className?: string;
};

export const QuoteStatusBadge = ({
  status,
  className,
}: QuoteStatusBadgeProps) => {
  return (
    <Badge className={cn(STATUS_STYLES[status], className)}>
      {STATUS_LABELS[status]}
    </Badge>
  );
};
