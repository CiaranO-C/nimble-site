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
          salesByDate {
            total
            date
          }
          totalSales {
            sales
            revenue
          }
          averageSales {
            byDate {
              daily {
                average
                date
              }
              monthly {
                average
                month
              }
            }
          }
        }
      }`,
      variables: { userId: id },
    }),
  });
  const response = await res.json();
  console.log(response);
  return response.data.salesAnalytics;
}

export { getTestData };
