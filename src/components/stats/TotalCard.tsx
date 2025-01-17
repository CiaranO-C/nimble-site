import { Stack, Text, Title } from "@mantine/core";

function TotalCard({
  title,
  values,
  money,
}: {
  title: string;
  values: { name: string; value: number }[];
  money?: string;
}) {
  return (
    <Stack
      style={{
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Title
        order={3}
        style={{ textAlign: "center" }}
      >{`${title.charAt(0).toUpperCase()}${title.slice(1)}`}</Title>
      <Stack style={{ maxWidth: "180px", width: "100%" }}>
        {values.map(({ name, value }) => (
          <Text
            key={name} 
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span style={{ flex: 1, textAlign: "left" }}>{name}</span>
            <span style={{ flex: 1, textAlign: "right" }}>
              {money ? `${money}${value}` : value}
            </span>
          </Text>
        ))}
      </Stack>
    </Stack>
  );
}

export default TotalCard;
