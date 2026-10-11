import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { NavBar } from "@/components/layout/NavBar";
import { buttonVariants } from "@/components/ui/button";
import { UserSection } from "./UserSection";
import { Logo } from "./Logo";

export const Header = () => {
  return (
    <header className="flex h-16 w-full justify-between bg-secondary px-18 text-secondary-foreground">
      <div className="flex w-full justify-between">
        <Logo />
        <NavBar />
      </div>

      <div className="flex w-full items-center justify-end gap-6">
        <UserSection />

        <Link
          href="/quotes/new"
          className={buttonVariants({
            className: "gap-2 rounded-lg px-7 py-4 font-bold",
          })}
        >
          <PlusIcon />
          <span>New quote</span>
        </Link>
      </div>
    </header>
  );
};
