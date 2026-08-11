/**
 * Utility functions for pagination and array sorting
 */

export function paginateArray(items, page = 1, pageSize = 12) {
  const currentPage = Math.max(1, parseInt(page, 10) || 1);
  const limit = Math.max(1, parseInt(pageSize, 10) || 12);
  const totalCount = items.length;
  const totalPages = Math.ceil(totalCount / limit) || 1;
  const validPage = Math.min(currentPage, totalPages);
  
  const startIndex = (validPage - 1) * limit;
  const endIndex = startIndex + limit;
  const pageData = items.slice(startIndex, endIndex);

  return {
    pagination: {
      currentPage: validPage,
      pageSize: limit,
      totalPages,
      totalCount,
      hasNextPage: validPage < totalPages,
      hasPrevPage: validPage > 1
    },
    data: pageData
  };
}

export function sortStays(items, sortKey = 'price_asc') {
  const sorted = [...items];

  switch (sortKey) {
    case 'price_asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price_desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating_desc':
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    default:
      return sorted.sort((a, b) => a.price - b.price);
  }
}
