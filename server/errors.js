const { UNAUTHORIZED, BAD_REQUEST } = require('http-status-codes');

class CustomError extends Error {
  constructor(msg, code, statusCode) {
    super(msg);
    this.code = code;
    this.statusCode = statusCode; 
  }
}

class LoginFailed extends CustomError {
  constructor(msg) {
    super(msg, "LoginFailed", UNAUTHORIZED);
  }
}

class DuplicateUsername extends CustomError {
  constructor(msg) {
    super(msg, "DuplicateUsername", BAD_REQUEST);
  }
}

class DuplicateEmail extends CustomError {
  constructor(msg) {
    super(msg,"DuplicateEmail",BAD_REQUEST);
  }
}

class InsufficientCredits extends CustomError {
  constructor(msg) {
    super(msg, "InsufficientCredits", BAD_REQUEST);
  }
}

class InvalidCredentials extends CustomError {
  constructor(msg) {
    super(msg,"InvalidCredentials", BAD_REQUEST);
  }
}

class InvalidToken extends CustomError {
  constructor(msg) {
    super(msg,"InvalidToken", BAD_REQUEST);
  }
}

class StripeChargeError extends CustomError {
  constructor(msg, code) {
    super(msg, code, BAD_REQUEST);
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
