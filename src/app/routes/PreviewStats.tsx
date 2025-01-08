import { Button, Grid, Group, Paper, Stack, Title } from "@mantine/core";
import { getTestData } from "../../features/demo/utils";
import { useState } from "react";
import CustomAreaChart from "../../components/charts/CustomAreaChart";

import {
  AverageSales,
  RevenueByDate,
  SaleItemsByDate,
  SalesByDate,
} from "../../components/charts/type";
import CustomBarChart from "../../components/charts/CustomBarChart";
import { PieChart, PieChartCell } from "@mantine/charts";

interface ChartData {
  buyers: {
    all: {};
    repeat: {};
  };
  sales: {
    revenue: {
      total: number;
      byDate: { all: RevenueByDate[] };
      average: AverageSales;
    };
    count: {
      byDate: { all: SalesByDate[]; items: SaleItemsByDate[] };
    };
  };
}

function PreviewStats() {
  const [chartData, setChartData] = useState<ChartData | null>(null);

  function pieChartData() {
    const { all, repeat } = chartData.buyers;
    return [
      { name: "first time", value: all.count - repeat.count, color: "red" },
      { name: "repeat", value: repeat.count, color: "blue" },
    ];
  }

  function pieChartDataPct() {
    const { all, repeat } = chartData.buyers;
    const pct = (val: number) => parseFloat(((val / 55) * 100).toFixed(1));
    return [
      { name: "all", value: pct(all.count - repeat.count), color: "red" },
      { name: "repeat", value: pct(repeat.count), color: "blue" },
    ];
  }

  return (
    <>
      <Grid>
        <Grid.Col span={12}>
          <Stack>
            <Title>Stats!</Title>
            <Button
              onClick={async () => {
                const data = await getTestData();
                setChartData(data);
              }}
            >
              load data
            </Button>
          </Stack>
        </Grid.Col>

        {chartData && (
          <>
            <Grid.Col span={12}>
              <Group></Group>
            </Grid.Col>
            <Grid.Col span={12}>
              <CustomAreaChart
                revenue={chartData.sales.revenue.byDate.all}
                sales={chartData.sales.count.byDate.all}
                items={chartData.sales.count.byDate.items}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <CustomBarChart
                hourly={chartData.sales.revenue.average.byTime}
                daily={chartData.sales.revenue.average.byDate.daily}
                monthly={chartData.sales.revenue.average.byDate.monthly}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Paper shadow="xs" p="xl">
                <Stack>
                  <Title order={3}>Insights</Title>
                </Stack>
              </Paper>
            </Grid.Col>
            <Grid.Col span={6}>
              <Group>
                <PieChart data={pieChartData()} withTooltip />
                <Paper shadow="xs" p="xl">
                  <Stack>
                    <Title order={3}>Insights</Title>
                  </Stack>
                </Paper>
              </Group>
            </Grid.Col>
            <Grid.Col span={6}>
              <Group>
                <PieChart data={pieChartDataPct()} withTooltip/>
                <Paper shadow="xs" p="xl">
                  <Stack>
                    <Title order={3}>Insights</Title>
                  </Stack>
                </Paper>
              </Group>
            </Grid.Col>
          </>
        )}
      </Grid>
    </>
  );
}

export default PreviewStats;
