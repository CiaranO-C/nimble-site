import { Switch } from "@mantine/core";
import { useTheme } from "../../app/providers/ThemeProvider";
import { IconMoon, IconSun } from "@tabler/icons-react";
import styled from "styled-components";

function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  const darkTheme = theme === "dark";
    console.log("dark theme is", darkTheme);
    
  return (
    <SwitchContainer>
      <Switch
        checked={darkTheme}
        onChange={toggleTheme}
      />
      {darkTheme ? <IconSun /> : <IconMoon />}
    </SwitchContainer>
  );
}

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export default ThemeSwitch;
