import Link from "next/link";

type NavBarItemType = {
  name: string;
  href: string;
}[];

const NavBarItems: NavBarItemType = [
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

export const NavBar = () => {
  return (
    <nav>
      <ul className="flex gap-4 p-4">
        {NavBarItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className="text-primary-foreground hover:text-primary"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
