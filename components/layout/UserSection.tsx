import Link from "next/link";
import { User } from "lucide-react";

export const UserSection = () => {
  return (
    <Link
      href="/profile"
      className="flex items-center gap-2 p-4 hover:text-primary"
    >
      <div className="rounded-full bg-background p-2 text-foreground">
        <User className="h-5 w-5" />
      </div>
      <span>John Doe</span>
    </Link>
  );
};
