import { AppShell, Group, rem } from "@mantine/core";
import { useHeadroom } from "@mantine/hooks";
import { Outlet } from "react-router";
import LogoWithIcon from "../../../components/header/LogoWithIcon";
import AuthButtons from "../../../components/header/AuthButtons";
import ThemeSwitch from "../../../components/header/ThemeSwitch";

function PublicLayout() {
  const pinned = useHeadroom({ fixedAt: 120 });

  return (
    <>
      <AppShell
        header={{ height: 60, collapsed: !pinned, offset: false }}
        padding="50px 50px 0px"
        pos="relative"
        style={{ overflow: "hidden", width: "100vw" }}
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <LogoWithIcon />
            <ThemeSwitch />
            <AuthButtons />
          </Group>
        </AppShell.Header>
        <AppShell.Main pt={`calc(${rem(60)} + var(--mantine-spacing-md))`} pl={"xl"} pr={"xl"} pb={"xl"}>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </>
  );
}

export default PublicLayout;
