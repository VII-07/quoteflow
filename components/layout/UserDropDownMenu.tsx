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

export const UserDropdownMenu = () => {
  const handleLogout = () => {
    // TODO: implement real logout once backend auth exists
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
        <DropdownMenuItem variant="destructive" onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
