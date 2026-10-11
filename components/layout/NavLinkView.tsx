import { type NavItem } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

type NavLinkViewProps = {
  item: NavItem;
  isActive: boolean;
};

export const NavLinkView = ({ item, isActive }: NavLinkViewProps) => {
  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative flex items-center transition-colors hover:text-primary",
        isActive &&
          "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-primary after:shadow-[0_0_8px_var(--color-primary)]",
      )}
    >
      <span
        className={cn(
          "rounded-lg px-3 py-2",
          isActive && "bg-secondary-foreground/10",
        )}
      >
        {item.name}
      </span>
    </Link>
  );
};
