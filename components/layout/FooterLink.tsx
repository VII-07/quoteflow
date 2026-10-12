import { type NavItem } from "@/lib/navigation";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

type FooterLinkProps = {
  item: NavItem;
};

const linkClassName =
  "flex items-center gap-1 text-sm text-muted-foreground hover:text-primary";

export const FooterLink = ({ item }: FooterLinkProps) => {
  return item.external ? (
    <a
      className={linkClassName}
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {item.name}
      <span className="sr-only">(opens in new tab)</span>
      <ExternalLink size={15} />
    </a>
  ) : (
    <Link className={linkClassName} href={item.href}>
      {item.name}
    </Link>
  );
};
