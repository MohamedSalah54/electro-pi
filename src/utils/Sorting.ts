export const getSorting = (query: any) => {
  const sortBy = query.sort || "createdAt";
  const order = query.order === "asc" ? 1 : -1;

  return {
    [sortBy]: order,
  };
};