const { addNoteHandler, getAllNotes } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotes,
  },
  {
    method: 'PATCH',
    path: '/notes/:id',
    handler: getAllNotes,
  },

];

module.exports = routes;
