import { Button, Title } from "@mantine/core";
import { getTestData } from "../../features/demo/utils";
import { useState } from "react";
import CustomAreaChart from "../../components/charts/CustomAreaChart";
function PreviewStats() {
  const [areaData, setAreaData] = useState<any | null>(null);

  return (
    <>
      <Title>Stats!</Title>
      <Button
        onClick={async () => {
          const data = await getTestData();
          setAreaData(data);
        }}
      >
        hello
      </Button>
      {areaData && <CustomAreaChart data={areaData} />}
    </>
  );
}

export default PreviewStats;
