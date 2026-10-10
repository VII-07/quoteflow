import Link from "next/link";
import { User } from "lucide-react";

export const UserSection = () => {
  return (
    <Link
      href="/profile"
      className="flex items-center gap-2 p-4 hover:text-primary"
    >
      <div className="bg-background text-foreground rounded-full p-2">
        <User className="w-5 h-5" />
      </div>
      <span>John Doe</span>
    </Link>
  );
};
