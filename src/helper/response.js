const responseFail = (handler, code, m) => {
  const response = handler.response({
    status: 'fail',
    message: m,
  });
  response.code(code);
  return response;
};

module.exports = {
  responseFail,
};
