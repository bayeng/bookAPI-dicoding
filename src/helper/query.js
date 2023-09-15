const booksWithQuery = (request, h, target) => {
  // if (request.query.name) {
  const formatBook = target.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));
  const response = h.response({
    status: 'success',
    data: {
      books: formatBook,
    },
  });
  // }

  return response;
};

module.exports = { booksWithQuery };
