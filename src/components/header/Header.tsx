import { Title } from "@mantine/core";
import AuthButtons from "./AuthButtons";
import ThemeSwitch from "./ThemeSwitch";
import styles from "./header.module.css";

function Header() {
  return (
    <header className={styles.mainHeader}>
      <Title order={1}>popstats</Title>
      <ThemeSwitch />
      <AuthButtons />
    </header>
  );
}

export default Header;
