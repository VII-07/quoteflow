export type NavItem = {
  name: string;
  href: string;
};

export const navBarItems: NavItem[] = [
  {
    name: "Dashboard",
    href: "/",
  },
  {
    name: "Quotes",
    href: "/quotes",
  },
  {
    name: "Clients",
    href: "/clients",
  },
  {
    name: "Settings",
    href: "/settings",
  },
];

export const navFooterItems: NavItem[] = [
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
  { name: "Contact", href: "/privacy" },
];

export const isActiveNavItem = (currentPath: string, href: string): boolean => {
  return currentPath.split("/")[1] === href.split("/")[1];
};
