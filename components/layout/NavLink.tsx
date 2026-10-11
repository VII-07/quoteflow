"use client";

import { usePathname } from "next/navigation";
import { isActiveNavItem, type NavItem } from "@/lib/navigation";
import { NavLinkView } from "@/components/layout/NavLinkView";

type NavLinkProps = { item: NavItem };

export const NavLink = ({ item }: NavLinkProps) => {
  const currentPath = usePathname();
  const isActive = isActiveNavItem(currentPath, item.href);

  return <NavLinkView item={item} isActive={isActive} />;
};
