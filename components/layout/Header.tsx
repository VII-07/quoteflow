import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { NavBar } from "@/components/layout/NavBar";
import { MobileNav } from "@/components/layout/MobileNav";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "./Logo";
import { UserDropdownMenu } from "@/components/layout/UserDropdownMenu";

export const Header = () => {
  return (
    <header className="flex h-16 w-full gap-4 bg-secondary px-4 text-secondary-foreground lg:gap-8 lg:px-8 xl:px-18">
      <div className="flex items-center gap-2 lg:hidden">
        <MobileNav />
        <Logo />
      </div>

      <div className="hidden gap-8 lg:flex">
        <Logo />
        <NavBar />
      </div>

      <div className="ml-auto flex items-center gap-4 lg:gap-6">
        <UserDropdownMenu />

        <Link
          href="/quotes/new"
          className={buttonVariants({
            className: "gap-2 rounded-lg px-3 py-4 font-bold sm:px-7",
          })}
        >
          <PlusIcon />
          <span className="sr-only sm:not-sr-only">New quote</span>
        </Link>
      </div>
    </header>
  );
};
