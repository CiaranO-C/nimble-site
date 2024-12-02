import { Link } from "react-router";
import { em, Group, Text, Title, useMantineColorScheme } from "@mantine/core";
import styles from "./styles/landing.module.css";
import Logo from "../../../public/svg/logo.svg?react";
import { modals } from "@mantine/modals";
import { useMediaQuery } from "@mantine/hooks";

const { container, containerDark, title, content, demoLink, logo, aboutText } =
  styles;

function Landing() {
  const { colorScheme: theme } = useMantineColorScheme();
  const isMobile = useMediaQuery("(max-width: 50em)");

  return (
    <main className={`${container} ${theme === "dark" ? containerDark : ""}`}>
      <div className={content}>
        <Title data-text="popstats" className={title} size={em(200)} order={1}>
          popstats
        </Title>
        <Text
          w="700px"
          pb="20px"
          mt="30px"
          mb="50px"
          size="xl"
          lh="1.5"
          flex="1"
          className={aboutText}
        >
          Welcome to Popstats, a platform designed for Depop sellers.
          <br />
          Effortlessly upload your sales data and unlock valuable insights into
          your store's performance. Track trends, optimize pricing, and make
          data driven decisions. Taking your store to the next level has never
          been easier, start using Popstats today!
        </Text>
        <Group>
          <button
            onClick={() =>
              modals.open({
                title: "Sign up",
                fullScreen: isMobile,
                centered: true,
                children: <p>coming soon</p>,
              })
            }
            className={demoLink}
          >
            Sign up
          </button>
          <Link className={demoLink} to="/demo">
            Explore demo
          </Link>
        </Group>
      </div>
      <Logo color="red" width="700" height="700" className={logo} />
    </main>
  );
}

export default Landing;
