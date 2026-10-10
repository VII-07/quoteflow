import { CraneIcon } from "@/components/shared/Logo/LogoIcon";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/layout/NavBar";
import { UserSection } from "./UserSection";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-secondary text-secondary-foreground  flex items-center justify-between w-full px-18">
      <div className="flex items-center justify-between w-full">
        <Link href="/">
          <div className="flex items-center p-4 gap-2">
            <CraneIcon />
            <span className=" text-primary-foreground font-bold text-2xl">
              QuoteFlow
            </span>
          </div>
        </Link>

        <NavBar />
      </div>

      <div className="flex items-center justify-end w-full gap-6">
        <UserSection />

        <Button className="bg-primary font-bold text-md primary-foreground flex items-center cursor-pointer gap-2 px-8 py-5 rounded-lg">
          <PlusIcon className="font-bold text-primary-foreground" />
          <span>New estimate</span>
        </Button>
      </div>
    </header>
  );
};
