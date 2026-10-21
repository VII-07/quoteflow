import { getClients } from "@/features/clients/data";
import { getQuotes } from "@/features/quotes/data";
import { getDisplayTotals } from "@/features/quotes/total";
import { formatCalendarDate, formatMoney } from "@/lib/format";

const QuotesPage = async () => {
  const [quotes, clients] = await Promise.all([getQuotes(), getClients()]);
  const clientNameById = new Map(clients.map((c) => [c.id, c.name]));

  return (
    <div>
      <h1>Quotes Page</h1>

      {quotes.length !== 0 ? (
        <table className="border">
          <thead>
            <tr>
              <th>Number</th>
              <th>Client</th>
              <th>Status</th>
              <th>Issued</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody className="border">
            {quotes.map((quote) => {
              return (
                <tr key={quote.id} className="border">
                  <td className="border">{quote.number}</td>
                  <td className="border">
                    {clientNameById.get(quote.clientId) ?? "Unknown client"}
                  </td>
                  <td className="border">{quote.status}</td>
                  <td className="border">
                    {formatCalendarDate(quote.issueDate)}
                  </td>
                  <td className="border">
                    {formatMoney(getDisplayTotals(quote).totalCents)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No quotes yet</p>
      )}
    </div>
  );
};

export default QuotesPage;
