async function customFetch(args: RequestInit) {
  const res = await fetch(import.meta.env.VITE_API_URL, args);
  return res;
}

export { customFetch };
