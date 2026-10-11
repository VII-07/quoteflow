import { navBarItems } from "@/lib/navigation";
import { NavLink } from "@/components/layout/NavLink";
import { Suspense } from "react";
import { NavLinkView } from "@/components/layout/NavLinkView";

export const NavBar = () => {
  return (
    <nav className="flex">
      <ul className="flex gap-4">
        {navBarItems.map((item) => (
          <li key={item.name} className="flex">
            <Suspense fallback={<NavLinkView item={item} isActive={false} />}>
              <NavLink item={item} />
            </Suspense>
          </li>
        ))}
      </ul>
    </nav>
  );
};
