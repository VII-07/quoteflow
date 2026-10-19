import { type CalendarDate, CURRENCY } from "@/types/common";

const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: CURRENCY,
});
const calendarDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export const formatMoney = (moneyPence: number): CalendarDate => {
  return currencyFormatter.format(moneyPence / 100);
};

export const formatCalendarDate = (date: string): string => {
  const [year, month, day] = date.split("-");
  const utcDate = new Date(
    Date.UTC(Number(year), Number(month) - 1, Number(day)),
  );

  return calendarDateFormatter.format(utcDate);
};
