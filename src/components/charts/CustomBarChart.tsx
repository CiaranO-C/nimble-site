import { BarChart } from "@mantine/charts";
import {
  dayMap,
  generateSeries,
  isKeyOfDayMap,
  isKeyOfMonthMap,
  monthMap,
} from "./utils";
import { Button, Group, Radio, useMantineTheme } from "@mantine/core";
import DateTooltip from "./DateTooltip";
import { useToggle } from "@mantine/hooks";
import { useState } from "react";
import {
  AverageSales,
  DailyAverage,
  HourlyAverages,
  MonthlyAverage,
} from "./type";

interface AverageDailyType {
  average: number;
  date: keyof typeof dayMap;
}

function sortDaily(daily: AverageDailyType[]) {
  if (daily[0].date === "0") {
    const sunday = daily.shift();
    if (sunday) {
      daily.push(sunday);
    }
  }
  return daily;
}

type DateType = "monthly" | "daily" | "hourly";

function CustomBarChart(props: {
  daily: DailyAverage[];
  monthly: MonthlyAverage[];
  hourly: HourlyAverages[];
}) {
  const [radioValue, setRadioValue] = useState<DateType>("monthly");
  const currentData =
    radioValue === "daily" ? sortDaily(props[radioValue]) : props[radioValue];
  const colors = useMantineTheme().colors;
console.log(currentData);
const series = generateSeries(currentData, ["average"], colors);
console.log(series);

  function handleRadio(value: string) {
    setRadioValue(value as DateType);
  }

  return (
    <>
      <Radio.Group value={radioValue} onChange={handleRadio}>
        <Group>
          <Radio value="monthly" label="Monthly" />
          <Radio value="daily" label="Daily" />
          <Radio value="hourly" label="Hourly" />
        </Group>
      </Radio.Group>
      <BarChart
        h={300}
        data={currentData}
        dataKey={radioValue === "hourly" ? "hour" : "date"}
        series={generateSeries(currentData[0], ["average"], colors)}
        barProps={{ radius: 10, maxBarSize: 80, isAnimationActive: true }}
        xAxisProps={{
          tickFormatter: (tick, i) => {
            if (radioValue === "daily" && isKeyOfDayMap(tick)) {
              const day = dayMap[tick];
              const chars = day === "Tuesday" || day === "Thursday" ? -3 : 3;
              return day.slice(0, chars);
            } else if (radioValue === "monthly" && isKeyOfMonthMap(tick)) {
              return monthMap[tick].slice(0, 3);
            }
            if (i % 3 !== 0) return "";
            return tick;
          },
        }}
        tooltipProps={{
          content: ({ label, payload }) => (
            <DateTooltip
              label={label}
              payload={payload}
              dateType={radioValue === "daily" ? "daily" : "monthly"}
            />
          ),
        }}
      />
    </>
  );
}

export default CustomBarChart;
