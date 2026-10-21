import { QuoteDetails } from "@/app/(dashboard)/quotes/[id]/QuoteDetails";
import { Suspense } from "react";

const QuoteDetailsPage = ({ params }: PageProps<"/quotes/[id]">) => {
  return (
    <Suspense fallback={<p>Loading quote…</p>}>
      <QuoteDetails params={params} />
    </Suspense>
  );
};

export default QuoteDetailsPage;
