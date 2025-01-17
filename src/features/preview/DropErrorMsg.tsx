import { Button, Group, Text } from "@mantine/core";
import { modals } from "@mantine/modals";

function DropErrorMsg({
  message,
  button,
  classes,
}: {
  message: string;
  button: boolean;
  classes: { text: string; button?: string };
}) {
  return (
    <Group
      style={{
        display: "flex",
        border: "1px dashed red",
        borderRadius: "25px",
        height: "40px",
        alignItems: "center",
        justifyContent: "center",
        gap: "0",
      }}
    >
      <Text className={classes.text}>{message}</Text>
      {button && (
        <Button
          style={{ height: "100%", border: "none", borderRadius: "25px" }}
          onClick={() =>
            modals.open({
              title: "Sign up",
              fullScreen: false,
              centered: true,
              children: <p>coming soon</p>,
            })
          }
          className={classes.button}
        >
          Sign up
        </Button>
      )}
    </Group>
  );
}

export default DropErrorMsg;
