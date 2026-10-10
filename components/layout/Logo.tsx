import Link from "next/link";
import { CraneIcon} from "@/components/shared/Logo/LogoIcon";
const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center p-4 gap-2">
        <CraneIcon />
        <span className="font-bold text-2xl">QuoteFlow</span>
      </div>
    </Link>
  );
};

export default Logo;
