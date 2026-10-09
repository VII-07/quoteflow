import Link from "next/link";
import { User } from "lucide-react";

export const UserSection = () => {
  return (
    <div>
      <Link href="" className="flex items-center gap-2 p-4 hover:text-primary">
        <div className="bg-secondary-foreground rounded-full p-2">
          <User className=" text-primary-foreground w-5 h-5" />
        </div>
        <span>John Doe</span>
      </Link>
    </div>
  );
};
