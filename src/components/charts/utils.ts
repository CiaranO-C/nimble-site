import { SaleByDate, TDateISO } from "./type";

function generateSeries(data, keysToRemove: string[], colors) {
  const series = Object.keys(data[0])
    .filter((elem) => !keysToRemove.includes(elem))
    .map((field, i) => {
      return {
        name: field,
        color: "red", //colors[Object.keys(colors)[i + 1]][6],
      };
    });

  return series;
}

function generateTicks(data): string[] {
  const tickSet = new Set<string>();
  data.forEach((obj) => {
    const { date } = obj;
    const monthNum = (new Date(date).getMonth() + 1).toString();
    if (monthNum in monthMap) {
      tickSet.add(monthMap[monthNum as keyof typeof monthMap]);
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

function getDateRange(data: SaleByDate[]) {
  console.log(data[0]);

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
