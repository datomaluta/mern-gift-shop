export const queryBuilder = (
  searchParams: URLSearchParams,
  limit: number,
  searchFields: string[]
) => {
  const obj: Record<string, string> = { page: searchParams.get("page") || "1" };

  if (searchParams.get("search")) {
    obj["search"] = searchParams.get("search") as string;
    obj["searchFields"] = searchFields.join(",");
  }
  if (searchParams.get("category")) {
    obj["category"] = searchParams.get("category") as string;
  }

  // Build the query string using map and join for cleaner concatenation
  const queryString = Object.keys(obj)
    .map((key) => {
      if (key === "page") {
        return `${key}=${encodeURIComponent(obj[key])}&limit=${limit}`;
      }
      return `${key}=${encodeURIComponent(obj[key])}`;
    })
    .join("&");

  return queryString;
};
