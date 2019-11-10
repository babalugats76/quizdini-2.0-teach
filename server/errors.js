const { BAD_REQUEST, INTERNAL_SERVER_ERROR, UNAUTHORIZED } = require('http-status-codes');

class CustomError extends Error {
  constructor(msg, statusCode = INTERNAL_SERVER_ERROR, code = undefined) {
    super(msg);
    this.statusCode = statusCode; 
    this.code = code || this.constructor.name;
  }
}

class LoginFailed extends CustomError {
  constructor(msg) {
    super(msg, UNAUTHORIZED);
  }
}

class DuplicateUsername extends CustomError {
  constructor(msg) {
    super(msg, BAD_REQUEST);
  }
}

class DuplicateEmail extends CustomError {
  constructor(msg) {
    super(msg, BAD_REQUEST);
  }
}

class InsufficientCredits extends CustomError {
  constructor(msg) {
    super(msg, BAD_REQUEST);
  }
}

class InvalidCredentials extends CustomError {
  constructor(msg) {
    super(msg, BAD_REQUEST);
  }
}

class InvalidToken extends CustomError {
  constructor(msg) {
    super(msg, BAD_REQUEST);
  }
}

class StripeChargeError extends CustomError {
  constructor(msg, code) {
    super(msg, BAD_REQUEST, code);
  }
}

module.exports = {
  LoginFailed,
  DuplicateUsername,
  DuplicateEmail,
  InsufficientCredits,
  InvalidCredentials,
  InvalidToken,
  StripeChargeError
};
