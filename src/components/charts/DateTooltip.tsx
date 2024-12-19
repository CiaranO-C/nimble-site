import { getFilteredChartTooltipPayload } from "@mantine/charts";
import { Paper, Text } from "@mantine/core";

interface ChartTooltipProps {
  label: string;
  payload: Record<string, any>[] | undefined;
  monthly?: boolean;
}

function DateTooltip({ payload, monthly = false }: ChartTooltipProps) {
  if (!payload) return;
  
  const iso = getFilteredChartTooltipPayload(payload)[0]?.payload?.date;
  const unfilter = payload;
  const filteredPayload = getFilteredChartTooltipPayload(payload)[0]
  console.log(unfilter);
  console.log(filteredPayload);
  
  
  //const date = monthly ? new Date(new Date().setMonth(payload)) : new Date(iso).toDateString();
let date = 'test';
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
