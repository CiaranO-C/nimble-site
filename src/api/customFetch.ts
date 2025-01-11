async function customFetch(args: RequestInit) {
  const res = await fetch("http://localhost:5501/graphql", args);
  return res;
}

export { customFetch };
