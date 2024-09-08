/**
 * Calculates the pagination range.
 * @param page - The current page number.
 * @param size - The number of items per page.
 * @returns The range of items to fetch from the database.
 */
const getPagination = (page: number, size: number) => {
  const limit = size;
  const from = (page - 1) * limit;
  const to = page * limit - 1;
  return { from, to };
};

export { getPagination };
