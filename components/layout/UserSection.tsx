import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type UserSectionProps = React.ComponentProps<typeof Button>;

export const UserSection = ({ className, ...props }: UserSectionProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "h-auto px-3 py-1 hover:bg-primary-foreground/5 hover:text-primary aria-expanded:bg-primary-foreground/15 aria-expanded:text-primary-foreground",
        className,
      )}
      {...props}
    >
      <div className="rounded-full bg-background p-2 text-foreground">
        <User className="h-5 w-5" />
      </div>
      <span className="sr-only xl:not-sr-only">John Doe</span>
    </Button>
  );
};
