import { BarChart } from "@mantine/charts";
import {
  dayMap,
  generateSeries,
  isKeyOfDayMap,
  isKeyOfMonthMap,
  monthMap,
} from "./utils";
import { Group, Radio, useMantineTheme } from "@mantine/core";
import DateTooltip from "./DateTooltip";
import { useState } from "react";
import { DailyAverage, HourlyAverages, MonthlyAverage, TDateISO } from "./type";

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

type BarChartProps = {
  daily: DailyAverage[];
  monthly: MonthlyAverage[];
  hourly: HourlyAverages[];
};

function CustomBarChart(props: BarChartProps) {
  const [radioValue, setRadioValue] = useState<DateType>(initialView);
  const currentData =
    radioValue === "daily" ? sortDaily(props[radioValue]) : props[radioValue];
  const colors = useMantineTheme().colors;

  function initialView(): DateType {
    const { monthly, daily, hourly } = props;

    if (monthly.length >= 3) {
      return "monthly";
    } else if (daily.length >= 5) {
      return "daily";
    } else if (hourly.length >= 6) {
      return "hourly";
    } else {
      //if no ideal condition found then display largest
      const dataArr = Object.entries(props);
      const sorted = dataArr.sort((a, b) => b[1].length - a[1].length);

      return sorted[0][0] as keyof BarChartProps;
    }
  }

  function handleRadio(value: string) {
    setRadioValue(value as DateType);
  }

  function dailyTick(tick: TDateISO) {
    const date = new Date(tick);
    const dayNum = date.getDay().toString();
    if (isKeyOfDayMap(dayNum)) {
      const day = dayMap[dayNum];
      const chars = day === "Tuesday" || day === "Thursday" ? -3 : 3;
      return day.slice(0, chars);
    }

    return "invalid date";
  }

  function monthlyTick(tick: TDateISO) {
    const date = new Date(tick);
    const monthNum = date.getMonth().toString();
    if (isKeyOfMonthMap(monthNum)) {
      return monthMap[monthNum].slice(0, 3);
    }

    return "invalid date";
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
          tickFormatter: (tick: TDateISO, i) => {
            if (radioValue === "daily") {
              return dailyTick(tick);
            } else if (radioValue === "monthly") {
              return monthlyTick(tick);
            }

            //hourly
            if (i % 3 !== 0) return "";
            return tick;
          },
        }}
        tooltipProps={{
          content: ({ label, payload }) => (
            <DateTooltip
              label={label}
              payload={payload}
              dateType={radioValue}
            />
          ),
        }}
      />
    </>
  );
}

export default CustomBarChart;
