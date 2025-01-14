import {
  Group,
  rem,
  Text,
  Stack,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import styles from "./styles/preview.module.css";
import { Link } from "react-router";
import CustomDropzone from "../../components/upload/CustomDropzone";
import LogoWireTransparent from "../../assets/svg/logo-wire-transparent.svg?react";

function Preview() {
  const theme = useMantineColorScheme().colorScheme;

  return (
    <>
      <LogoWireTransparent
        className={`${styles.backgroundSvg} ${styles.svgOne}`}
      />
      <LogoWireTransparent
        className={`${styles.backgroundSvg} ${styles.svgTwo}`}
      />
      <Stack align="center" gap={30} mt={40} p="0px 25px">
        <Title ta="center" fz={rem(50)} order={1}>
          Discover Your Sales Insights
        </Title>
        <Stack className={styles.infoContainer} gap={0} w="60ch">
          <Text>
            Simply download your sales data from your selling hub on Depop and
            drag the file into box below. Then sit back, and let us do the hard
            work for you!
          </Text>
          <Group align="center" justify="center" mt={10}>
            <Title fz="1.4rem" order={2}>
              No file? No problem!
              <br />
            </Title>
            <Link to="/public/stats" className={styles.demoLink}>
              Try the demo
            </Link>
          </Group>
        </Stack>
        <CustomDropzone />
        <Stack align="center">
          <Text c={theme === "dark" ? "var(--mantine-color-text)" : "#808080"}>
            Need some help?{" "}
            <Link
              to="../help"
              style={{
                color: theme === "dark" ? "white" : "black",
                textDecoration: "underline",
              }}
            >
              Follow our step-by-step guide
            </Link>{" "}
            on how to get your sales data.
          </Text>
        </Stack>
        <footer
          style={{
            width: "120%",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "var(--mantine-color-body)",
            borderTop: "1px solid var(--app-shell-border-color)",
            height: "30px",
          }}
        >
          <Group justify="center">
            <Text>contact | help | terms and conditions</Text>
          </Group>
        </footer>
      </Stack>
    </>
  );
}

export default Preview;
