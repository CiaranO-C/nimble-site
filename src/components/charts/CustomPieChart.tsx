import { PieChart } from "@mantine/charts";
import { Checkbox, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { BuyerList, BuyersByCountry, RepeatBuyerList } from "./type";

function CustomPieChart({
  data,
  initialBool,
}: {
  data: { all: BuyerList; repeat: RepeatBuyerList } | BuyersByCountry;
  initialBool: boolean;
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
      { name: "all", value: allValue, color: "red" },
      { name: "repeat", value: repeatValue, color: "blue" },
    ];
  }

  return (
    <>
      <Checkbox
        label="Percentage"
        checked={percent}
        onChange={() => setPercent((b) => !b)}
      />
      <PieChart
        valueFormatter={percent ? (value) => `${value}%` : undefined}
        data={pieChartData()}
        withTooltip
        strokeWidth={0}
        pieProps={{ isAnimationActive: true }}
      />
    </>
  );
}

export default CustomPieChart;
