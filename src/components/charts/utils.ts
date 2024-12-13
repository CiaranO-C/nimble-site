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
    if (monthNum in dateMap) {
      tickSet.add(dateMap[monthNum as keyof typeof dateMap]);
    }
  });
  return [...tickSet.values()];
}

function leadingZero(num: number): string {
  if (num < 10) return `0${num}`;
  return num.toString();
}

function getMonth(iso: string) {
  const date = new Date(iso);
  const monthNum = (date.getMonth() + 1).toString();
  if (monthNum in dateMap) {
    return dateMap[monthNum as keyof typeof dateMap];
  }
  return "Error: invalid month";
}

function getDateRange(data) {
  const start = new Date(data[0].date).toLocaleDateString();
  const end = new Date(data[data.length - 1].date).toLocaleDateString();
  return `${start} - ${end}`;
}

type monthKey = keyof typeof dateMap;

const dateMap = {
  "1": "Jan",
  "2": "Feb",
  "3": "Mar",
  "4": "Apr",
  "5": "May",
  "6": "Jun",
  "7": "Jul",
  "8": "Aug",
  "9": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
} as const;

export { generateSeries, generateTicks, getDateRange, getMonth, leadingZero };
export type { monthKey, dateMap }
