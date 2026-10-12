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
  const handlelogOut = () => {
    console.log("logout");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<UserSection aria-label="Open account menu" />}
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
        <DropdownMenuItem variant="destructive" onClick={handlelogOut}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
