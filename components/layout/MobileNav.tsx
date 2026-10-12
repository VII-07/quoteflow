"use client";

import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { navBarItems } from "@/lib/navigation";
import { NavLink } from "@/components/layout/NavLink";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={<Button variant="ghost" size="icon" aria-label="Open menu" />}
      >
        <MenuIcon />
      </SheetTrigger>

      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>QuoteFlow</SheetTitle>
        </SheetHeader>

        <nav className="px-2">
          <ul className="flex flex-col gap-1">
            {navBarItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  item={item}
                  orientation="vertical"
                  onNavigate={close}
                />
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
