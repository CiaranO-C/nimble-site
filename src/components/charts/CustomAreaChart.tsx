import { AreaChart } from "@mantine/charts";
import {
  generateSeries,
  generateTicks,
  getDateRange,
  getMonth,
  leadingZero,
} from "./utils";
import CustomTooltip from "./CustomTooltip";
import { useToggle } from "@mantine/hooks";
import { Button, useMantineTheme } from "@mantine/core";

function CustomAreaChart({ data }) {
  const [daily, toggle] = useToggle();
  const colors = useMantineTheme().colors;

  return (
    <>
      <Button onClick={() => toggle()}>toggle</Button>
      <AreaChart
        h={400}
        data={
          daily
            ? data.slice(data.length - data.length - 30)
            : data.map((data) => {
                return {
                  ...data,
                  month: getMonth(data.date),
                };
              })
        }
        dataKey={daily ? "date" : "month"}
        areaProps={{ isAnimationActive: true }}
        tooltipAnimationDuration={200}
        fillOpacity={0.5}
        gridAxis={daily ? "x" : "xy"}
        tickLine="y"
        xAxisLabel={getDateRange(data)}
        yAxisLabel="Revenue"
        xAxisProps={{
          ticks: daily ? undefined : generateTicks(data),
          tickFormatter: (tick: string, i): string => {
            if (daily) {
              if ((i + 1) % 2 === 0) return "";
              const date = new Date(tick);
              const day = date.getDate();
              const month = date.getMonth() + 1;
              return `${leadingZero(day)}/${leadingZero(month)}`;
            }
            return tick;
          },
        }}
        tooltipProps={{
          content: ({ label, payload }) => (
            <CustomTooltip label={label} payload={payload} />
          ),
        }}
        textColor="white"
        series={generateSeries(data, ["date", "month"], colors)}
      />
    </>
  );
}

export default CustomAreaChart;
