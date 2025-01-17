import { PieChart } from "@mantine/charts";
import {
  Checkbox,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { BuyerList, BuyersByCountry, RepeatBuyerList } from "./type";

function CustomPieChart({
  data,
  initialBool,
  title,
}: {
  data: { all: BuyerList; repeat: RepeatBuyerList } | BuyersByCountry;
  initialBool: boolean;
  title: string;
}) {
  const [percent, setPercent] = useState<boolean>(initialBool);
  const colors = useMantineTheme().colors;

  function pieChartData() {
    let pctTotal = 0;
    const pct = (val: number) =>
      parseFloat(((val / pctTotal) * 100).toFixed(1));
    //if array must be buyers by country
    if (Array.isArray(data)) {
      pctTotal = percent
        ? data.reduce((prev, current) => prev + current.buyers, 0)
        : 0;
      return data.map(({ country, buyers }, i) => {
        return {
          name: country,
          value: percent ? pct(buyers) : buyers,
          color: colors[Object.keys(colors)[i + 1]][6],
        };
      });
    }
    const { all, repeat } = data;
    pctTotal = all.count;
    const allCount = all.count - repeat.count;
    const allValue = percent ? pct(allCount) : allCount;
    const repeatCount = repeat.count;
    const repeatValue = percent ? pct(repeatCount) : repeatCount;
    return [
      { name: "First Time", value: allValue, color: "red" },
      { name: "Repeat", value: repeatValue, color: "blue" },
    ];
  }

  return (
    <Stack flex={1}>
      <Title td="underline" ta="center" order={3}>
        {title}
      </Title>
      <Checkbox
        label="Percentage"
        checked={percent}
        onChange={() => setPercent((b) => !b)}
      />
      <Group>
        <PieChart
          valueFormatter={percent ? (value) => `${value}%` : undefined}
          size={190}
          data={pieChartData()}
          strokeWidth={0}
          pieProps={{ isAnimationActive: true }}
          flex={1}
        />
        <Paper shadow="xs" p="xl" flex={1}>
          <Stack gap={5} h={"190px"} style={{ overflowY: "scroll" }}>
            {pieChartData()
              .sort(({ value: a }, { value: b }) => b - a)
              .map(({ name, value, color }) => (
                <div key={`${name}${value}`}>
                  <Group justify="space-between">
                    <Text>
                      <span
                        style={{
                          display: "inline-block",
                          width: "12px",
                          height: "12px",
                          backgroundColor: color,
                          borderRadius: "50%",
                          marginRight: "10px",
                        }}
                      />
                      {name}
                    </Text>
                    <Text>{percent ? `${value}%` : value}</Text>
                  </Group>
                  <Divider />
                </div>
              ))}
          </Stack>
        </Paper>
      </Group>
    </Stack>
  );
}

export default CustomPieChart;
