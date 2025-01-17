import AuthButtons from "./AuthButtons";
import ThemeSwitch from "./ThemeSwitch";
import styles from "./header.module.css";
import { useLocation } from "react-router";
import LogoWithIcon from "./LogoWithIcon";

function Header() {
  const { pathname } = useLocation();
  const isLanding = pathname === "/";

  if (isLanding) return;

  return (
    <header className={styles.mainHeader}>
      {!isLanding && <LogoWithIcon />}
      <ThemeSwitch />
      <AuthButtons />
    </header>
  );
}

export default Header;
