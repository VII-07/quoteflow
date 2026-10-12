import Link from "next/link";
import { CraneIcon } from "@/components/shared/Logo/LogoIcon";
export const Logo = () => {
  return (
    <Link className="flex items-center gap-2" href="/">
      <CraneIcon />
      <span className="sr-only text-2xl font-bold min-[360px]:not-sr-only">
        QuoteFlow
      </span>
    </Link>
  );
};
