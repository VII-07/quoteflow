import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { buttonVariants } from "@/components/ui/button";
import { QuoteDetails } from "./QuoteDetails";

const QuoteDetailsSkeleton = () => {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading quote">
      <div className="h-32 animate-pulse rounded-xl bg-muted" />
      <div className="h-56 animate-pulse rounded-xl bg-muted" />
    </div>
  );
};

const QuoteDetailsPage = ({ params }: PageProps<"/quotes/[id]">) => {
  return (
    <div className="space-y-6 py-6 sm:py-10">
      {/* Outside Suspense: it doesn't depend on params, so it's part of the static shell. */}
      <Link
        href="/quotes"
        className={buttonVariants({ variant: "ghost", className: "-ml-2.5" })}
      >
        <ArrowLeft aria-hidden />
        All quotes
      </Link>

      <Suspense fallback={<QuoteDetailsSkeleton />}>
        <QuoteDetails params={params} />
      </Suspense>
    </div>
  );
};

export default QuoteDetailsPage;
