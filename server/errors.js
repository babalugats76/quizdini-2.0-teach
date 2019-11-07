const { UNAUTHORIZED, BAD_REQUEST } = require('http-status-codes');

class CustomError extends Error {
  constructor(msg) {
    super(msg);
  }
}

class LoginFailed extends CustomError {
  constructor(msg) {
    super(msg);
    this.statusCode = UNAUTHORIZED;
  }
}

class DuplicateUsername extends CustomError {
  constructor(msg) {
    super(msg);
    this.statusCode = BAD_REQUEST;
  }
}

class DuplicateEmail extends CustomError {
  constructor(msg) {
    super(msg);
    this.statusCode = BAD_REQUEST;
  }
}

class InsufficientCredits extends CustomError {
  constructor(msg, code) {
    super(msg);
    this.statusCode = BAD_REQUEST;
    this.code = code;
  }
}

class InvalidCredentials extends CustomError {
  constructor(msg, code) {
    super(msg);
    this.statusCode = BAD_REQUEST;
    this.code = code;
  }
}

class InvalidToken extends CustomError {
  constructor(msg, code) {
    super(msg);
    this.statusCode = BAD_REQUEST;
    this.code = code;
  }
}

class StripeChargeError extends CustomError {
  constructor(msg, code) {
    super(msg);
    this.statusCode = BAD_REQUEST;
    this.code = code;
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
