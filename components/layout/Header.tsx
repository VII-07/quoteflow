import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { NavBar } from "@/components/layout/NavBar";
import { buttonVariants } from "@/components/ui/button";
import { UserSection } from "./UserSection";
import Logo from "./Logo";

export const Header = () => {
  return (
    <header className="bg-secondary text-secondary-foreground flex items-center justify-between w-full px-18">
      <div className="flex items-center justify-between w-full">
        <Logo />
        <NavBar />
      </div>

      <div className="flex items-center justify-end w-full gap-6">
        <UserSection />

        <Link
          href="/quotes/new"
          className={buttonVariants({
            className: "font-bold gap-2 px-8 py-5 rounded-lg",
          })}
        >
          <PlusIcon />
          <span>New quote</span>
        </Link>
      </div>
    </header>
  );
};
