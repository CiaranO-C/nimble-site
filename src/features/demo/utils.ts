import { customFetch } from "../../api/customFetch";
import { previewQuery } from "./query";

function getUserId() {
  const id = sessionStorage.getItem("popstatsUserId");

  return id;
}

async function getPreviewData() {
  let id = getUserId();

  const isDemo = id === null;
  if (isDemo) id = import.meta.env.VITE_DEMO_ID;
  console.log(import.meta.env.VITE_API_URL);

  const res = await customFetch({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: previewQuery,
      variables: { userId: id },
    }),
  });
  const response = await res.json();
  return response.data;
}

export { getPreviewData, getUserId };
