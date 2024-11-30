import { Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import styles from "./header.module.css";

function AuthButtons() {
  const isMobile = useMediaQuery("(max-width: 50em)");

  return (
    <>
      <div className={styles.authButtons}>
        <Button
          onClick={() => {
            modals.open({
              title: "Sign in",
              fullScreen: isMobile,
              centered: true,
              children: (
                <>
                  <p>This feature is coming soon!</p>
                </>
              ),
            });
          }}
        >
          Sign in
        </Button>
        <Button
          onClick={() => {
            modals.open({
              title: "Join popstats",
              fullScreen: isMobile,
              centered: true,
              children: (
                <>
                  <p>This feature is coming soon!</p>
                </>
              ),
            });
          }}
        >
          Sign up
        </Button>
      </div>
    </>
  );
}

export default AuthButtons;
