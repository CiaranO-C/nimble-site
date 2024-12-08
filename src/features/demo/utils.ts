async function getTestData() {
  const id = sessionStorage.getItem("popstatsUserId");
  if (id === null) {
    console.log("No user id provided");
    return;
  }
  const res = await fetch("http://localhost:5501/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `{
        salesAnalytics {
          totalSales
          averageSaleValue
          }
        }`,
      variables: { userId: "3ea560b7-54e8-4cc1-bf91-732aae17efee" },
    }),
  });
  const response = await res.json();
  console.log(response);
}

export { getTestData };
