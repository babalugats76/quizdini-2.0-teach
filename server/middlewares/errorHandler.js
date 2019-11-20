const HttpStatus = require('http-status-codes');
const { CustomError } = require('../errors.js');

module.exports = (err, req, res, next) => {
  const error =
    err instanceof CustomError
      ? err.getError()
      : {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          code: err.constructor.name,
          message:
            err.message ||
            HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) ||
            ''
        };
  res.status(error.statusCode).send(error);
  //next(err);
};
