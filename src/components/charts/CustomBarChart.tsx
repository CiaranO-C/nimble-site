import { BarChart } from "@mantine/charts";
import { generateSeries } from "./utils";
import { useMantineTheme } from "@mantine/core";

function CustomBarChart({ data }) {
  const colors = useMantineTheme().colors;

  return (
    <>
      <BarChart
        h={500}
        data={data}
        dataKey="date"
        series={generateSeries(data, ["date", "month"], colors)}
        barProps={{ radius: 10 }}
      />
    </>
  );
}

export default CustomBarChart;
