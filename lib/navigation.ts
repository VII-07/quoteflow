export type NavItem = {
  name: string;
  href: string;
  external?: boolean;
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
  { name: "GitHub", href: "https://github.com/VII-07", external: true },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/bohdan-baiurchak-129b71282",
    external: true,
  },
];

export const isActiveNavItem = (currentPath: string, href: string): boolean => {
  return currentPath.split("/")[1] === href.split("/")[1];
};
