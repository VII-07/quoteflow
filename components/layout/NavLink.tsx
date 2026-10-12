"use client";

import { usePathname } from "next/navigation";
import { isActiveNavItem } from "@/lib/navigation";
import {
  NavLinkView,
  type NavLinkViewProps,
} from "@/components/layout/NavLinkView";

type NavLinkProps = Omit<NavLinkViewProps, "isActive">;

export const NavLink = ({ item, ...rest }: NavLinkProps) => {
  const currentPath = usePathname();
  const isActive = isActiveNavItem(currentPath, item.href);

  return <NavLinkView item={item} isActive={isActive} {...rest} />;
};
