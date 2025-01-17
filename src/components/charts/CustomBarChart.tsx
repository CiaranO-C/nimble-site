import { BarChart } from "@mantine/charts";
import {
  dayMap,
  generateSeries,
  isKeyOfDayMap,
  isKeyOfMonthMap,
  monthMap,
} from "./utils";
import {
  Group,
  Paper,
  Radio,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
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
  const sortedDescending = currentData
    .slice()
    .sort(({ average: a }, { average: b }) => b - a);

  const { average: high } = sortedDescending[0];
  const { average: low } = sortedDescending[sortedDescending.length - 1];
  const totalAverage = parseFloat(
    (
      currentData.reduce((sum, { average }) => sum + average, 0) /
      currentData.length
    ).toFixed(2),
  );

  function getInsightValue(dataObj: MonthlyAverage | HourlyAverages) {
    if (isDateType(dataObj)) {
      if (radioValue === "monthly") {
        const dateNum = new Date(dataObj.date).getMonth().toString();
        return isKeyOfMonthMap(dateNum) ? monthMap[dateNum] : "Invalid month";
      } else {
        const dateNum = new Date(dataObj.date).getDay().toString();
        return isKeyOfDayMap(dateNum) ? dayMap[dateNum] : "Invalid day";
      }
    } else if (isHourType(dataObj)) {
      return `${dataObj.hour}:00`;
    }
    return "Invalid data";
  }

  const insightMap = {
    monthly: "month",
    daily: "day",
    hourly: "hour",
    high: () => getInsightValue(sortedDescending[0]),
    second: () => getInsightValue(sortedDescending[1]),
    low: () => getInsightValue(sortedDescending[sortedDescending.length - 1]),
  };

  function calculatePercentageDifference(
    value: number,
    reference: number,
  ): string {
    if (reference === 0) return "100%";
    const difference = ((value - reference) / reference) * 100;
    return `${difference.toFixed(2)}%`;
  }

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

  function isDateType(
    value: HourlyAverages | MonthlyAverage,
  ): value is MonthlyAverage {
    return value.hasOwnProperty("date");
  }

  function isHourType(
    value: HourlyAverages | MonthlyAverage,
  ): value is HourlyAverages {
    return value.hasOwnProperty("hour");
  }

  return (
    <>
      <Stack style={{ flex: 1 }}>
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
      </Stack>
      <Stack style={{ flex: 1, height: "100%", alignSelf: "start" }}>
        <Paper shadow="xs" p="lg">
          <Title order={5}>Overall average:</Title>
          <span>{totalAverage}</span>
        </Paper>
        <Paper shadow="xs" p="lg">
          <Stack>
            <Title td={"underline"} ta={"left"} order={3}>
              Insights
            </Title>
            <Text>
              Your highest grossing {insightMap[radioValue]} on average is{" "}
              <strong>{insightMap.high()}</strong> with a gross revenue of{" "}
              <strong>{high}</strong>. This is{" "}
              <strong>
                {calculatePercentageDifference(
                  high,
                  sortedDescending[1]?.average || 0,
                )}
              </strong>{" "}
              higher than the second highest {insightMap[radioValue]},{" "}
              <strong>{insightMap.second() || "N/A"}</strong>.
            </Text>
            <Text>
              Your lowest grossing {insightMap[radioValue]} is{" "}
              <strong>{insightMap.low()}</strong> with an average revenue of{" "}
              <strong>{low}</strong>. This is{" "}
              <strong>
                {calculatePercentageDifference(totalAverage, low)}
              </strong>{" "}
              lower than the overall average <strong>{totalAverage}</strong>.
            </Text>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}

export default CustomBarChart;
