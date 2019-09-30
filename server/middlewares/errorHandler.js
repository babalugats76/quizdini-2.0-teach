const HttpStatus = require('http-status-codes');

/* If you want to support Custom-error-specific handling */
/* const {
  LoginFailed,
  UserAlreadyExists,
  StripeChargeError
} = require("../errors.js"); */

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || HttpStatus.getStatusText(statusCode) || '';
  const code = err.code || undefined;
  res.status(statusCode).send({ statusCode, message, code });
  next(err);
};
