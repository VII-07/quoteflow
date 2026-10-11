import Link from "next/link";
import { CraneIcon } from "@/components/shared/Logo/LogoIcon";
export const Logo = () => {
  return (
    <Link className="flex items-center gap-2 p-4" href="/">
      <CraneIcon />
      <span className="text-2xl font-bold">QuoteFlow</span>
    </Link>
  );
};
