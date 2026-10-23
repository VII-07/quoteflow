import { FileText } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getClients } from "@/features/clients/data";
import { QuotesCardList } from "@/features/quotes/components/QuotesCardList";
import { QuotesTable } from "@/features/quotes/components/QuotesTable";
import { getQuotes } from "@/features/quotes/data";

const QuotesPage = async () => {
  const [quotes, clients] = await Promise.all([getQuotes(), getClients()]);
  const clientNameById = new Map(clients.map((c) => [c.id, c.name]));

  return (
    <div className="space-y-6 py-6 sm:py-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Quotes</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {quotes.length === 1 ? "1 quote" : `${quotes.length} quotes`}
        </p>
      </div>

      {quotes.length === 0 ? (
        <Card className="items-center gap-3 px-4 py-12 text-center">
          <FileText className="size-8 text-muted-foreground" aria-hidden />
          <div>
            <p className="font-medium">No quotes yet</p>
            <p className="text-sm text-muted-foreground">
              Create your first quote to see it here.
            </p>
          </div>
          <Link href="/quotes/new" className={buttonVariants()}>
            New quote
          </Link>
        </Card>
      ) : (
        <Card className="py-0">
          <div className="sm:hidden">
            <QuotesCardList quotes={quotes} clientNameById={clientNameById} />
          </div>
          <div className="hidden sm:block">
            <QuotesTable quotes={quotes} clientNameById={clientNameById} />
          </div>
        </Card>
      )}
    </div>
  );
};

export default QuotesPage;
