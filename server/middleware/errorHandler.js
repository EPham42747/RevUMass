const responses = require('../utils/responses');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  res.status(err.statusCode || responses.error.INTERNAL_SERVER_ERROR.code)
    .json(responses.error.INTERNAL_SERVER_ERROR.json);
}

module.exports = errorHandler;
