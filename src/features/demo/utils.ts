import { customFetch } from "../../api/customFetch";
import { previewQuery } from "./query";

async function getPreviewData() {
  let id = sessionStorage.getItem("popstatsUserId");

  const isDemo = id === null;
  if (isDemo) id = import.meta.env.VITE_DEMO_ID;

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

export { getPreviewData };
