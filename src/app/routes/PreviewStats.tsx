import { Button, Grid, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { getTestData } from "../../features/demo/utils";
import { useState } from "react";
import CustomAreaChart from "../../components/charts/CustomAreaChart";
import TotalCard from "../../components/stats/TotalCard";
import { AverageSales, SaleByDate } from "../../components/charts/type";
import CustomBarChart from "../../components/charts/CustomBarChart";

interface ChartData {
  totalSales: Record<string, number>; 
  salesByDate: SaleByDate[]; 
  averageSales: AverageSales;
}

function PreviewStats() {
  const [chartData, setChartData] = useState<ChartData | null>(null);

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
              <Group>
                {Object.entries(chartData.totalSales).map(
                  ([key, value]: [string, number]) => (
                    <TotalCard key={key} title={key} value={value} />
                  ),
                )}
              </Group>
            </Grid.Col>
            <Grid.Col span={12}>
              <CustomAreaChart data={chartData.salesByDate} />
            </Grid.Col>
            <Grid.Col span={6}>
              <CustomBarChart data={chartData.averageSales.byDate.monthly} />
            </Grid.Col>
            <Grid.Col span={6}>
              <Stack>
                <Paper>

                </Paper>
              </Stack>
            </Grid.Col>
          </>
        )}
      </Grid>
    </>
  );
}

export default PreviewStats;
