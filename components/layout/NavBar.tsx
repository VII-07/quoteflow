import Link from "next/link";
import { navBarItems } from "@/lib/navigation";

export const NavBar = () => {
  return (
    <nav>
      <ul className="flex gap-4 p-4">
        {navBarItems.map((item) => (
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
