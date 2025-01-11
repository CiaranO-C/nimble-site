import { Grid, Group, Paper, Stack, Title } from "@mantine/core";
import { getPreviewData } from "../../features/demo/utils";
import { useEffect, useState } from "react";
import CustomAreaChart from "../../components/charts/CustomAreaChart";

import {
  BuyersData,
  SalesCountData,
  SalesRevenueData,
} from "../../components/charts/type";
import CustomBarChart from "../../components/charts/CustomBarChart";
import CustomPieChart from "../../components/charts/CustomPieChart";
import { useQuery } from "react-query";

interface ChartData {
  buyers: BuyersData;
  sales: {
    revenue: SalesRevenueData;
    count: SalesCountData;
  };
}

function PreviewStats() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const { data, status } = useQuery({
    queryKey: ["stats"],
    queryFn: () => getPreviewData(),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data && status === "success") {
      setChartData(data);
    }
  }, [data]);

  return (
    <>
      <Grid>
        <Grid.Col span={12}>
          <Stack>
            <Title>Stats!</Title>
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
                <CustomPieChart
                  data={chartData.buyers.byCountry}
                  initialBool={false}
                />
                <Paper shadow="xs" p="xl">
                  <Stack>
                    <Title order={3}>Insights</Title>
                  </Stack>
                </Paper>
              </Group>
            </Grid.Col>
            <Grid.Col span={6}>
              <Group>
                <CustomPieChart
                  data={{
                    all: chartData.buyers.all,
                    repeat: chartData.buyers.repeat,
                  }}
                  initialBool={true}
                />
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
