import { MOCK_QUOTES } from "@/features/quotes/mocks";
import { type Quote } from "@/features/quotes/types";

export const getQuotes = async (): Promise<Quote[]> => {
  const quotes = structuredClone(MOCK_QUOTES);
  return quotes;
};

export const getQuoteById = async (id: string): Promise<Quote | null> => {
  const quotes = await getQuotes();

  return quotes.find((q) => q.id === id) ?? null;
};
