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
    <Group>
      <Text className={classes.text}>{message}</Text>
      {button && (
        <Button
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
