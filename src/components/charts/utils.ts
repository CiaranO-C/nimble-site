import { DefaultMantineColor, MantineColorsTuple } from "@mantine/core";
import {
  RevenueByDate,
  SaleItemsByDate,
  SalesByDate,
  SeriesData,
  TDateISO,
} from "./type";

function generateSeries(
  data,
  keys: SeriesData[],
  colors: Record<DefaultMantineColor, MantineColorsTuple>,
) {
  const colorMap: Record<SeriesData, string> = {
    total: colors[Object.keys(colors)[1]][6],
    net: colors[Object.keys(colors)[2]][6],
    shipping: colors[Object.keys(colors)[3]][6],
    sales: colors[Object.keys(colors)[1]][6],
    refunds: colors[Object.keys(colors)[2]][6],
    bundles: colors[Object.keys(colors)[3]][6],
    boosted: colors[Object.keys(colors)[1]][6],
    items: colors[Object.keys(colors)[2]][6],
    average: colors[Object.keys(colors)[3]][6]
  };
  const series = Object.keys(data)
    .filter((field) => keys.includes(field as SeriesData))
    .map((field) => {
      return {
        name: field,
        color: colorMap[field as SeriesData],
      };
    });

  return series;
}

function generateTicks(
  data: RevenueByDate[] | SalesByDate[] | SaleItemsByDate[],
): string[] {
  const monthSet = new Set<number>();
  const tickSet = new Set<string>();
  data.forEach((obj) => {
    const { date } = obj;
    const monthNum = new Date(date).getMonth();
    if (!monthSet.has(monthNum)) {
     tickSet.add(date)
     monthSet.add(monthNum);
    }
  });
  
  return [...tickSet.values()];
}

function leadingZero(num: number): string {
  if (num < 10) return `0${num}`;
  return num.toString();
}

function getMonth(iso: TDateISO) {
  const date = new Date(iso);
  const monthNum = (date.getMonth() + 1).toString();
  if (monthNum in monthMap) {
    return monthMap[monthNum as keyof typeof monthMap];
  }
  return "Error: invalid month";
}

function getDateRange(
  data: RevenueByDate[] | SalesByDate[] | SaleItemsByDate[],
) {
  const first = data[0]?.date;
  const last = data[data.length - 1]?.date;

  const start = isKeyOfMonthMap(first)
    ? monthMap[first]
    : new Date(first).toLocaleDateString();

  const end = isKeyOfMonthMap(last)
    ? monthMap[last]
    : new Date(last).toLocaleDateString();

  return `${start} - ${end}`;
}

function isKeyOfMonthMap(date: unknown): date is keyof typeof monthMap {
  return typeof date === "string" && date in monthMap;
}

function isKeyOfDayMap(date: unknown): date is keyof typeof dayMap {
  return typeof date === "string" && date in dayMap;
}

const monthMap = {
  "0": "January",
  "1": "Febuary",
  "2": "March",
  "3": "April",
  "4": "May",
  "5": "June",
  "6": "July",
  "7": "August",
  "8": "September",
  "9": "October",
  "10": "November",
  "11": "December",
} as const;

const dayMap = {
  "0": "Sunday",
  "1": "Monday",
  "2": "Tuesday",
  "3": "Wednesday",
  "4": "Thursday",
  "5": "Friday",
  "6": "Saturday",
} as const;

export {
  generateSeries,
  generateTicks,
  getDateRange,
  getMonth,
  leadingZero,
  monthMap,
  dayMap,
  isKeyOfDayMap,
  isKeyOfMonthMap,
};
