import { dayMap, monthMap } from "./utils";

type monthKey = keyof typeof monthMap;
type dayKey = keyof typeof dayMap;

type RevenueData = "total" | "net" | "shipping";
type SaleData = "sales" | "refunds" | "bundles";
type ItemData = "items" | "boosted";
type AverageData = "average";

type SeriesData = RevenueData | SaleData | ItemData | AverageData;

interface RevenueByDate {
  total: number;
  net: number;
  date: TDateISO | keyof typeof monthMap;
}

interface SalesByDate {
  date: TDateISO;
  sales: number;
  refunds: number;
  bundles: number;
}

interface SaleItemsByDate {
  date: TDateISO;
  items: number;
  boosted: number;
}

type DailyAverage = { average: number; date: dayKey };
type MonthlyAverage = { average: number; date: monthKey };
type DateAverages = { daily: DailyAverage[]; monthly: MonthlyAverage[] };

type HourlyAverages = { average: number; hour: number };

type AverageSales = {
  byDate: DateAverages;
  byTime: HourlyAverages[];
};

type TYear = `${number}${number}${number}${number}`;
type TMonth = `${number}${number}`;
type TDay = `${number}${number}`;
type THours = `${number}${number}`;
type TMinutes = `${number}${number}`;
type TSeconds = `${number}${number}`;
type TMilliseconds = `${number}${number}${number}`;

type TDateISODate = `${TYear}-${TMonth}-${TDay}`;

type TDateISOTime = `${THours}:${TMinutes}:${TSeconds}.${TMilliseconds}`;

type TDateISO = `${TDateISODate}T${TDateISOTime}Z`;

type BuyerList = {
  buyers: string[];
  count: number;
};

type RepeatBuyerList = {
  buyers: {
    bought: number;
    buyer: string;
  }[];
  count: number;
};

type BuyersByCountry = { country: string; buyers: number }[];

type BuyersData = {
  all: BuyerList;
  repeat: RepeatBuyerList;
  byCountry: BuyersByCountry;
};

type SalesRevenueData = {
  total: number;
  net: number;
  byDate: { all: RevenueByDate[] };
  average: AverageSales;
};

type SalesCountData = {
  byDate: { all: SalesByDate[]; items: SaleItemsByDate[] };
  sales: number;
  bundles: number;
  refunds: number;
};

type ItemsCountData = {
  all: number;
};

export type {
  monthKey,
  TDateISO,
  RevenueByDate,
  SaleItemsByDate,
  SalesByDate,
  AverageSales,
  DailyAverage,
  MonthlyAverage,
  HourlyAverages,
  RevenueData,
  SeriesData,
  SaleData,
  ItemData,
  BuyersData,
  SalesRevenueData,
  SalesCountData,
  BuyerList,
  RepeatBuyerList,
  BuyersByCountry,
  ItemsCountData,
};
