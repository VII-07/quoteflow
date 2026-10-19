export const formatMoney = (moneyPence: number): string => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
  }).format(moneyPence);
};

console.log(formatMoney(9598 / 100));
