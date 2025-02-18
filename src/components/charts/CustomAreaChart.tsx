import { AreaChart } from "@mantine/charts";
import {
  generateSeries,
  generateTicks,
  getDateRange,
  isKeyOfMonthMap,
  monthMap,
} from "./utils";
import DateTooltip from "./DateTooltip";
import {
  Checkbox,
  Divider,
  Group,
  Paper,
  SegmentedControl,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import {
  RevenueData,
  RevenueByDate,
  SalesByDate,
  SaleItemsByDate,
  SaleData,
  ItemData,
} from "./type";

function CustomAreaChart(props: {
  revenue: RevenueByDate[];
  sales: SalesByDate[];
  items: SaleItemsByDate[];
}) {
  const [segmentValue, setSegmentValue] = useState<ChartDataType>("revenue");
  const [series, setSeries] = useState<{
    revenue: RevenueData[];
    sales: SaleData[];
    items: ItemData[];
  }>({
    revenue: ["total", "net"],
    sales: ["sales"],
    items: ["items"],
  });
  const colors = useMantineTheme().colors;

  //values must correspond to prop names
  const data = props[segmentValue];

  const daily = data.length <= 30;
  type ChartDataType = "revenue" | "sales" | "items";

  function handleSegment(value: string) {
    setSegmentValue(value as ChartDataType);
  }

  return (
    <>
      <Paper shadow="lg" radius={"lg"} p="lg" withBorder>
        <Title order={2} pb={10} ta={"center"}>
          {segmentValue.charAt(0).toUpperCase() + segmentValue.slice(1)}
        </Title>
        <Divider style={{ padding: "0px", paddingBottom: "0px" }} />
        <Group>
          <SegmentedControl
            radius={10}
            style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
            value={segmentValue}
            onChange={handleSegment}
            data={[
              { label: "Revenue", value: "revenue" },
              { label: "Sales", value: "sales" },
              { label: "Items", value: "items" },
            ]}
          />
          <Checkbox.Group
            value={series[segmentValue]}
            onChange={(values: string[]) => {
              const current = segmentValue;
              if (values.length === 0) return;
              setSeries((s) => ({ ...s, [current]: values }));
            }}
          >
            {segmentValue === "revenue" ? (
              <Group>
                <Checkbox value="total" label="Gross Revenue" />
                <Checkbox value="net" label="Net Revenue" />
                <Checkbox value="shipping" label="Shipping" />
              </Group>
            ) : segmentValue === "sales" ? (
              <Group>
                <Checkbox value="sales" label="Sales" />
                <Checkbox value="refunds" label="Refunds" />
                <Checkbox value="bundles" label="Bundles" />
              </Group>
            ) : (
              <Group>
                <Checkbox value="items" label="Items" />
                <Checkbox value="boosted" label="Boosted" />
              </Group>
            )}
          </Checkbox.Group>
        </Group>

        <AreaChart
          pt={20}
          h={400}
          unit={segmentValue === "revenue" ? "£" : ""}
          // referenceLines={[{ y: 10, label: "Average sale", color: "white"}]}
          data={data}
          dataKey={"date" /*daily ? "date" : "month"*/}
          // areaProps={{ isAnimationActive: true, animateNewValues: true }}
          tooltipAnimationDuration={200}
          fillOpacity={0.5}
          gridAxis={daily ? "x" : "xy"}
          tickLine="y"
          xAxisLabel={getDateRange(data)}
          yAxisLabel="Revenue"
          xAxisProps={{
            ticks: daily ? undefined : generateTicks(data),
            tickFormatter: (tick: string, i): string => {
              const date = new Date(tick);
              if (daily) {
                if ((i + 1) % 2 === 0) return "";
                return date.toLocaleString().split(",")[0].slice(0, 5);
              }
              const month = `${date.getMonth()}`;
              if (isKeyOfMonthMap(month)) return monthMap[month];
              return tick;
            },
            axisLine: true,
          }}
          yAxisProps={{
            axisLine:
              true /*domain: ([min, max], overflow): [number, number] => {
          return [min, max]
        } */,
          }}
          tooltipProps={{
            content: ({ label, payload }) => (
              <DateTooltip label={label} payload={payload} />
            ),
          }}
          series={generateSeries(data[0], series[segmentValue], colors)}
          withDots={false}
          areaProps={{ isAnimationActive: true, animateNewValues: false }}
        />
      </Paper>
    </>
  );
}

export default CustomAreaChart;
