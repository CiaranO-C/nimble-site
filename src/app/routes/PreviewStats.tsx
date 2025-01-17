import {
  Divider,
  Grid,
  Group,
  Paper,
  Stack,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { getPreviewData } from "../../features/demo/utils";
import { useEffect, useState } from "react";
import CustomAreaChart from "../../components/charts/CustomAreaChart";

import {
  BuyersData,
  ItemsCountData,
  SalesCountData,
  SalesRevenueData,
} from "../../components/charts/type";
import CustomBarChart from "../../components/charts/CustomBarChart";
import CustomPieChart from "../../components/charts/CustomPieChart";
import { useQuery } from "react-query";
import TotalCard from "../../components/stats/TotalCard";

interface ChartData {
  buyers: BuyersData;
  sales: {
    revenue: SalesRevenueData;
    count: SalesCountData;
  };
  items: {
    count: ItemsCountData;
  };
}

function PreviewStats() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const theme = useMantineTheme();
  console.log(theme.colors);

  const { data, status } = useQuery({
    queryKey: ["stats"],
    queryFn: getPreviewData,
    refetchOnWindowFocus: false,
  });
  const money = "£";

  useEffect(() => {
    if (data && status === "success") {
      console.log(data);
      console.log(chartData);

      setChartData(data);
    }
  }, [data]);

  return (
    <>
      <Grid>
        <Grid.Col span={12} mt={"xl"}>
          <Stack>
            <Title style={{ textAlign: "center" }}>Your Stats</Title>
          </Stack>
        </Grid.Col>

        {chartData && (
          <>
            <Grid.Col span={12}>
              <Paper shadow="lg" radius={"lg"} p="lg" withBorder>
                <Group justify="space-evenly">
                  <Stack style={{ flex: 1 }}>
                    <TotalCard
                      title="items"
                      values={[
                        {
                          name: "Total sold",
                          value: chartData.items.count.all,
                        },
                        {
                          name: "bundles",
                          value: chartData.sales.count.bundles,
                        },
                      ]}
                    />
                  </Stack>
                  <Divider orientation="vertical" size={"sm"} />
                  <Stack style={{ flex: 1 }}>
                    <TotalCard
                      title="sales"
                      values={[
                        { name: "Total", value: chartData.sales.count.sales },
                        {
                          name: "Refunds",
                          value: chartData.sales.count.refunds,
                        },
                      ]}
                    />
                  </Stack>
                  <Divider orientation="vertical" size={"sm"} />
                  <Stack style={{ flex: 1 }}>
                    <TotalCard
                      title="revenue"
                      values={[
                        { name: "Gross", value: chartData.sales.revenue.total },
                        { name: "Net", value: chartData.sales.revenue.net },
                      ]}
                      money={money}
                    />
                  </Stack>
                </Group>
              </Paper>
            </Grid.Col>
            <Grid.Col span={12}>
              <CustomAreaChart
                revenue={chartData.sales.revenue.byDate.all}
                sales={chartData.sales.count.byDate.all}
                items={chartData.sales.count.byDate.items}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Paper shadow="lg" radius={"lg"} p="lg" withBorder>
                <Title pb={10} ta={"center"} order={2}>
                  Average Revenue
                </Title>
                <Divider p={10} />
                <Group wrap="nowrap" justify="space-evenly">
                  <CustomBarChart
                    hourly={chartData.sales.revenue.average.byTime}
                    daily={chartData.sales.revenue.average.byDate.daily}
                    monthly={chartData.sales.revenue.average.byDate.monthly}
                  />
                </Group>
              </Paper>
            </Grid.Col>
            <Grid.Col span={12}>
              <Paper shadow="lg" radius={"lg"} p="lg" withBorder>
                <Title pb={10} ta={"center"} order={2}>
                  Buyers
                </Title>
                <Divider p={10} />
                <Group justify="space-evenly">
                  <CustomPieChart
                    data={chartData.buyers.byCountry}
                    initialBool={false}
                    title="Location"
                  />

                  <CustomPieChart
                    data={{
                      all: chartData.buyers.all,
                      repeat: chartData.buyers.repeat,
                    }}
                    initialBool={true}
                    title="Repeat"
                  />
                </Group>
              </Paper>
            </Grid.Col>
          </>
        )}
      </Grid>
    </>
  );
}

export default PreviewStats;
