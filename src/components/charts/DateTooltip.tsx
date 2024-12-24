import { getFilteredChartTooltipPayload } from "@mantine/charts";
import { Paper, Text } from "@mantine/core";
import { dayMap, isKeyOfDayMap, isKeyOfMonthMap, monthMap } from "./utils";
import { TDateISO } from "./type";

interface ChartTooltipProps {
  label: string;
  payload: Record<string, any>[] | undefined;
  dateType?: DateType;
}

type DateType = "default" | "daily" | "monthly";

type DateValue = TDateISO | keyof typeof monthMap | keyof typeof dayMap;

function generateDateString(dateValue: DateValue, dateType: DateType) {
  if (dateType === "daily" && isKeyOfDayMap(dateValue))
    return dayMap[dateValue];
  if (dateType === "monthly" && isKeyOfMonthMap(dateValue))
    return monthMap[dateValue];

  return new Date(dateValue).toDateString();
}

function DateTooltip({ payload, dateType = "default" }: ChartTooltipProps) {
  if (!payload) return;

  const filtered = getFilteredChartTooltipPayload(payload)[0];
  const dateValue: DateValue = filtered?.payload?.date;

  const date = generateDateString(dateValue, dateType);

  return (
    <Paper px="md" py="sm" withBorder shadow="md" radius="xl">
      <Text fw={500} mb={5}>
        {date}
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
