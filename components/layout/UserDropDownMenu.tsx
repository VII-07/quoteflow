"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { UserSection } from "@/components/layout/UserSection";

export const UserDropDownMenu = () => {
  const logOut = () => {
    console.log("logout");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <UserSection
            className="aria-expanded:bg-primary-foreground/15 aria-expanded:text-primary-foreground"
            aria-label="Open acount menu"
          />
        }
      />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem render={<Link href="/profile" />}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href="/settings" />}>
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={logOut}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
