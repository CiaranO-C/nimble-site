import { getFilteredChartTooltipPayload } from "@mantine/charts";
import { Paper, Text } from "@mantine/core";
import { dayMap, isKeyOfDayMap, isKeyOfMonthMap, monthMap } from "./utils";
import { TDateISO } from "./type";

interface ChartTooltipProps {
  label: string;
  payload: Record<string, any>[] | undefined;
  dateType?: DateType;
}

type DateType = "default" | "daily" | "monthly" | "hourly";

function generateDateString(dateValue: TDateISO | number, dateType: DateType) {
  const date = new Date(dateValue);

  if (dateType === "default") return date.toDateString();

  const dateInfo =
    dateType === "daily"
      ? date.getDay().toString()
      : date.getMonth().toString();

  if (dateType === "daily" && isKeyOfDayMap(dateInfo)) return dayMap[dateInfo];

  if (dateType === "monthly" && isKeyOfMonthMap(dateInfo))
    return monthMap[dateInfo];

  return "error: invalid date";
}

function convertHours(hours: number) {
  if (hours < 0 || hours > 23) return "invalid hour";
  console.log(hours);
  let converted = hours > 12 ? hours - 12 : hours;
  let suffix = hours < 12 ? "am" : "pm";
  if (hours === 0) converted = 12;
  let time = `${converted}:00 ${suffix}`;
  return converted < 10 ? "0" + time : time;
}

function DateTooltip({ payload, dateType = "default" }: ChartTooltipProps) {
  if (!payload) return;

  const filtered = getFilteredChartTooltipPayload(payload)[0];
  const dateValue: TDateISO | number =
    dateType === "hourly" ? filtered?.payload?.hour : filtered?.payload?.date;

  const value =
    dateType === "hourly" && typeof dateValue === "number"
      ? convertHours(filtered?.payload?.hour)
      : generateDateString(filtered?.payload?.date, dateType);

  return (
    <Paper px="md" py="sm" withBorder shadow="md" radius="xl">
      <Text fw={500} mb={5}>
        {value}
      </Text>
      {getFilteredChartTooltipPayload(payload).map((item: any) => (
        <Text key={item.name} c={item.color} fz="sm">
          {item.name}: {item.value}
        </Text>
      ))}
    </Paper>
  );
}

export default DateTooltip;
