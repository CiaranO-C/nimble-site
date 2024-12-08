import styles from "./header.module.css";
import AuthButton from "../auth/AuthButton";

function AuthButtons() {
  return (
    <>
      <div className={styles.authButtons}>
        <AuthButton
          title="Sign in"
          modalTitle="Welcome back"
          children={<p>This feature is coming soon!</p>}
        />
        <AuthButton
          title="Join now"
          modalTitle="Join Popstats"
          children={<p>This feature is coming soon!</p>}
        />
      </div>
    </>
  );
}

export default AuthButtons;
