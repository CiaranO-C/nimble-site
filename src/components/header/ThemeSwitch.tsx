import {
  rem,
  Switch,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

function ThemeSwitch() {
  const { setColorScheme } = useMantineColorScheme({ keepTransitions: true });
  const computedColorScheme = useComputedColorScheme();
  const darkMode = computedColorScheme === "dark";

  const toggleColorScheme = () => {
    setColorScheme(darkMode ? "light" : "dark");
  };

  return (
    <Switch
      checked={darkMode}
      onChange={toggleColorScheme}
      offLabel={
        <IconMoon style={{ width: rem(16), height: rem(16) }} stroke={2.5} />
      }
      onLabel={
        <IconSun style={{ width: rem(16), height: rem(16) }} stroke={2.5} />
      }
    />
  );
}

export default ThemeSwitch;
