// eslint-disable-next-line import/no-extraneous-dependencies
const { nanoid } = require('nanoid');
const books = require('./notes');

const getAllbooks = (request, h) => {
  const response = h.response({
    status: 'success',
    data: {
      books,
    },
  });

  return response;
};

const getBooksById = (request, h) => {
  const { id } = request.params;

  const book = books.filter((b) => b.id === id)[0];

  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        books,
      },
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });

  response.code(404);
  return response;
};

const createBook = (request, h) => {
  const {
    name, year, autho, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  let finished = false;
  if (pageCount === readPage) {
    finished = true;
  }

  const 
};
