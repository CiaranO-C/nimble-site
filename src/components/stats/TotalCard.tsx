import { Paper, Stack, Text, Title } from "@mantine/core";

function TotalCard({ title, value }: { title: string; value: number }) {
  return (
    <Paper>
      <Stack>
        <Title order={3}>Total {`${title.charAt(0).toUpperCase()}${title.slice(1)}`}</Title>
        <Text>{value}</Text>
      </Stack>
    </Paper>
  );
}

export default TotalCard;
