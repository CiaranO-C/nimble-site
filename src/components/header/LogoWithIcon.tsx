import { Link } from "react-router";
import { Title } from "@mantine/core";
import styles from "./header.module.css";
import Logo from "../../assets/svg/popstatsLogo.svg?react"

function LogoWithIcon() {
  return (
    <div className={styles.logoContainer}>
      <Link to="/">
        <Title order={1}>popstats</Title>
      </Link>
      <Logo height={30} width={30} />
    </div>
  );
}

export default LogoWithIcon;
