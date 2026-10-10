import Link from "next/link";
import { CraneIcon } from "@/components/shared/Logo/LogoIcon";
const Logo = () => {
  return (
    <Link className="flex items-center p-4 gap-2" href="/">
      <CraneIcon />
      <span className="font-bold text-2xl">QuoteFlow</span>
    </Link>
  );
};

export default Logo;
