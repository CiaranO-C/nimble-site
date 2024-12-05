import {
  AppShell,
  Group,
  rem,
  Text,
  Button,
  useMantineTheme,
  Stack,
  Title,
} from "@mantine/core";
import { useDisclosure, useHeadroom, useToggle } from "@mantine/hooks";
import { getTestData } from "../../features/demo/utils";
import { AreaChart } from "@mantine/charts";
import { Dropzone, DropzoneProps } from "@mantine/dropzone";
import LogoWithIcon from "../../components/header/LogoWithIcon";
import AuthButtons from "../../components/header/AuthButtons";
import ThemeSwitch from "../../components/header/ThemeSwitch";
import styles from "./styles/preview.module.css";
import { Link } from "react-router";
import { BounceLoader } from "react-spinners";
import { useState } from "react";
import DropErrorMsg from "../../features/preview/DropErrorMsg";

type ErrorCodes = "too-many-files" | "file-invalid-type";

type ErrorValues =
  | "Oops! Please upload CSV files only"
  | "Sign up for multi-file uploads!";

const errorMap: {
  [field: string]: {
    message: ErrorValues;
    component: (msg: ErrorValues) => React.ReactNode;
  };
} = {
  "too-many-files": {
    message: "Sign up for multi-file uploads!",
    component: (msg: string) => (
      <DropErrorMsg
        message={msg}
        button={true}
        classes={{ text: styles.errorMessage, button: styles.errorButton }}
      />
    ),
  },
  "file-invalid-type": {
    message: "Oops! Please upload CSV files only",
    component: (msg: string) => (
      <DropErrorMsg
        message={msg}
        button={false}
        classes={{ text: styles.errorMessage }}
      />
    ),
  },
};

function Preview(props: Partial<DropzoneProps>) {
  const [dropzoneKey, toggleDropzoneKey] = useToggle([0, 1]);
  const [errorCode, setErrorCode] = useState<ErrorCodes | null>(null);
  const pinned = useHeadroom({ fixedAt: 120 });
  const { colors } = useMantineTheme();
  const [loading, handler] = useDisclosure();

  const monthlyData = [
    {
      date: "Jan",
      total: 100,
    },
    {
      date: "Feb",
      total: 200,
    },
    {
      date: "Mar",
      total: 50,
    },
    {
      date: "Apr",
      total: 124,
    },
  ];

  const yearComparison = [
    { month: "Jan", 2023: 3200, 2022: 3500, 2024: 5100 },
    { month: "Feb", 2023: 2100, 2022: 2900, 2024: 1600 },
    { month: "Mar", 2023: 1800, 2022: 2400, 2024: 3300 },
    { month: "Apr", 2023: 2300, 2022: 3200, 2024: 2000 },
    { month: "May", 2023: 2700, 2022: 3800, 2024: 4500 },
    { month: "Jun", 2023: 1600, 2022: 2000, 2024: 2200 },
    { month: "Jul", 2023: 2400, 2022: 3000, 2024: 3500 },
    { month: "Aug", 2023: 3000, 2022: 2700, 2024: 4400 },
    { month: "Sep", 2023: 2800, 2022: 3500, 2024: 4000 },
    { month: "Oct", 2023: 2300, 2022: 3100, 2024: 2500 },
    { month: "Nov", 2023: 2000, 2022: 2800, 2024: 3600 },
    { month: "Dec", 2023: 2500, 2022: 3500, 2024: 3000 },
  ];

  function generateSeries(data, keyToRemove) {
    const series = Object.keys(data[0])
      .filter((elem) => elem !== keyToRemove)
      .map((field, i) => {
        return {
          name: field,
          color: colors[Object.keys(colors)[i + 1]][6],
        };
      });

    return series;
  }

  function handleFileReject(errorCode: string) {
    if (errorCode === "too-many-files" || errorCode === "file-invalid-type") {
      setErrorCode(errorCode);

      setTimeout(() => {
        toggleDropzoneKey();
      }, 2000);
    } else {
      console.error("Unexpected file drop error", errorCode);
    }
  }

  return (
    <>
      <AppShell
        header={{ height: 60, collapsed: !pinned, offset: false }}
        padding="50px"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <LogoWithIcon />
            <ThemeSwitch />
            <AuthButtons />
          </Group>
        </AppShell.Header>

        <AppShell.Main pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}>
          <Stack align="center" gap={30} mt={50}>
            <Title ta="center" fz={rem(50)} order={1}>
              Discover Your Sales Insights
            </Title>
            <Group className={styles.infoContainer}>
              <Text flex={1}>
                Simply download your sales data from your selling hub on Depop
                and drag the file into box below. Then sit back, and let us do
                the hard work for you!
              </Text>
              <Stack flex={1}>
                <Text>
                  Need some help? Follow the link below for a step by step guide
                  on getting your sales data
                </Text>
                <Link to="/help">Guide</Link>
              </Stack>
            </Group>
            <Dropzone
              mt={75}
              onDragOver={() => {
                if (errorCode === "file-invalid-type") setErrorCode(null);
              }}
              key={dropzoneKey}
              maxFiles={1}
              multiple={false}
              loading={loading}
              loaderProps={{
                children: <BounceLoader color="red" loading size={45} />,
              }}
              classNames={{
                root: styles.dropZoneRoot,
                inner: styles.dropZoneInner,
              }}
              onDrop={async (files) => {
                try {
                  handler.open();
                  const formData = new FormData();
                  formData.append("csv", files[0]);
                  const res = await fetch("http://localhost:5501/upload", {
                    method: "POST",
                    body: formData,
                  });
                  const response = await res.json();
                  if(res.status === 422) console.log("duplicate!");
                  
                  if (!res.ok) console.log("error uploading");

                  sessionStorage.setItem("popstatsUserId", response.userId);
                } catch (error) {
                  console.error("error uploading file", error);
                } finally {
                  handler.close();
                }
              }}
              onReject={(reject) => {
                const { code } = reject[0].errors[0];
                handleFileReject(code);
              }}
              accept={{
                "text/csv": [".csv"],
              }}
              {...props}
            >
              <Stack align="center" justify="center" pos="relative">
                <Text ta="center">
                  Click to upload or
                  <br /> drag and drop your sales file here
                </Text>
                <Text className={styles.csvWarning}>File not valid</Text>
              </Stack>
            </Dropzone>
            <div className={styles.errorContainer}>
              {errorCode &&
                errorMap[errorCode].component(errorMap[errorCode].message)}
            </div>
            <Group mt={50}>
              <Title order={2}>
                No file? No problem!
                <br />
              </Title>
              <Link to="/demo" className={styles.demoLink}>
                Try the demo
              </Link>
            </Group>
            <AreaChart
              h={300}
              data={yearComparison}
              dataKey="month"
              connectNulls={false}
              unit="£"
              withGradient
              series={generateSeries(yearComparison, "month")}
              curveType="natural"
            />
          </Stack>
        </AppShell.Main>
      </AppShell>
      <Button onClick={getTestData}>hello</Button>
    </>
  );
}

export default Preview;
