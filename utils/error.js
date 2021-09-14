//* Creamos un error personalizado

function error(message, code) {
  let new_error = new Error(message);

  if (code) {
    new_error.statusCode = code;
  }

  return new_error;
}

module.exports = error;