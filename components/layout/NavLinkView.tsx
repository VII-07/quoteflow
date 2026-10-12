import { type NavItem } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

export type NavLinkViewProps = {
  item: NavItem;
  isActive: boolean;
  orientation?: "horizontal" | "vertical";
  onNavigate?: () => void;
};

export const NavLinkView = ({
  item,
  isActive,
  orientation = "horizontal",
  onNavigate,
}: NavLinkViewProps) => {
  const isHorizontal = orientation === "horizontal";

  return (
    <Link
      href={item.href}
      onNavigate={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative flex items-center transition-colors hover:text-primary",
        !isHorizontal && "w-full",
        isActive &&
          isHorizontal &&
          "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-primary after:shadow-[0_0_8px_var(--color-primary)]",
      )}
    >
      <span
        className={cn(
          "rounded-lg px-3 py-2",
          !isHorizontal && "w-full",
          isActive &&
            (isHorizontal
              ? "bg-secondary-foreground/10"
              : "bg-primary/10 font-medium text-primary"),
        )}
      >
        {item.name}
      </span>
    </Link>
  );
};
