/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
const { nanoid } = require('nanoid');
const books = require('./books');
const { responseFail } = require('./helper/response');
const { booksWithQuery } = require('./helper/query');

const getAllbooks = (request, h) => {
  if (request.query.name) {
    const target = books.filter((item) => item.name === request.query.name);
    return booksWithQuery(request, h, target);
  }
  if (request.query.reading === '1') {
    const target = books.filter((item) => item.reading === true);
    return booksWithQuery(request, h, target);
  }
  if (request.query.reading === '0') {
    const target = books.filter((item) => item.reading === false);
    return booksWithQuery(request, h, target);
  }
  if (request.query.finished === '1') {
    const target = books.filter((item) => item.finished === true);
    return booksWithQuery(request, h, target);
  }
  if (request.query.reading === '0') {
    const target = books.filter((item) => item.finished === false);
    return booksWithQuery(request, h, target);
  }

  return booksWithQuery(request, h, books);
};

const getBooksById = (request, h) => {
  const { bookId } = request.params;

  const book = books.filter((b) => b.id === bookId)[0];

  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });

    response.code(200);
    return response;
  }
  return responseFail(h, 404, 'Buku tidak ditemukan');
};

const createBook = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  const id = nanoid(15);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  if (!name) {
    return responseFail(h, 400, 'Gagal menambahkan buku. Mohon isi nama buku');
  }

  if (readPage > pageCount) {
    return responseFail(h, 400, 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount');
  }
  const data = {
    id,
    name,
    year: Number(year),
    author,
    summary,
    publisher,
    pageCount: Number(pageCount),
    readPage: Number(readPage),
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(data);

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id,
    },
  });

  response.code(201);
  return response;
};

const updateBookById = (request, h) => {
  const { bookId } = request.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  if (!name) {
    return responseFail(h, 400, 'Gagal memperbarui buku. Mohon isi nama buku');
  }

  if (readPage > pageCount) {
    return responseFail(h, 400, 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount');
  }

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount: Number(pageCount),
      readPage: Number(readPage),
      reading,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  return responseFail(h, 404, 'Gagal memperbarui buku. Id tidak ditemukan');
};

const deleteBookById = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  return responseFail(h, 404, 'Buku gagal dihapus. Id tidak ditemukan');
};

module.exports = {
  getAllbooks,
  getBooksById,
  createBook,
  updateBookById,
  deleteBookById,
};
