import Link from "next/link";

type NavItemType = {
  name: string;
  href: string;
};

const NavBarItems: NavItemType[] = [
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
            <Link href={item.href} className="hover:text-primary">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
