import { CURRENCY } from "@/types/common";

const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: CURRENCY,
});

export const formatMoney = (moneyPence: number): string => {
  return currencyFormatter.format(moneyPence / 100);
};
