const response = require('./response');

function errors(error, req, res, next) {
  console.error(`[Error]: ${error}`);

  const message = error.message || 'Error interno';
  const status = error.statusCode || 500;

  response.error(res, res, message, status);
}

module.exports = errors;