const {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED
} = require('http-status-codes');

const DUPLICATE_EMAIL = '%email% is already associated with another account.';
const DUPLICATE_USERNAME = '%username% already exists';
const INCORRECT_PASSWORD = 'Your current password is incorrect.';
const INSUFFICIENT_CREDITS = 'There are not enough credits in your account.';
const INVALID_TOKEN = 'Your token is invalid, claimed, or expired.';
const LOGIN_FAILED = 'Please check your credentials or verify your account.';
const NOT_AUTHENTICATED = 'You must be logged in to access %path%.';
const NOT_ADMIN = 'You must be a logged in super user to access %path%.';

class CustomError extends Error {
  constructor(msg, statusCode = INTERNAL_SERVER_ERROR, code = undefined) {
    super(msg);
    this.statusCode = statusCode;
    this.code = code || this.constructor.name;
  }
  getError() {
    return {
      statusCode: this.statusCode,
      code: this.code,
      message: this.message
    };
  }
}

class DuplicateEmail extends CustomError {
  constructor(email, msg = DUPLICATE_EMAIL) {
    super(msg.replace('%email%', email), BAD_REQUEST);
  }
}

class DuplicateUsername extends CustomError {
  constructor(username, msg = DUPLICATE_USERNAME) {
    super(msg.replace('%username%', username), BAD_REQUEST);
  }
}

class InsufficientCredits extends CustomError {
  constructor(msg = INSUFFICIENT_CREDITS) {
    super(msg, BAD_REQUEST);
  }
}

class IncorrectPassword extends CustomError {
  constructor(msg = INCORRECT_PASSWORD) {
    super(msg, BAD_REQUEST);
  }
}

class InvalidToken extends CustomError {
  constructor(msg = INVALID_TOKEN) {
    super(msg, BAD_REQUEST);
  }
}

class LoginFailed extends CustomError {
  constructor(msg = LOGIN_FAILED) {
    super(msg, UNAUTHORIZED);
  }
}

class NotAdmin extends CustomError {
  constructor(path, msg = NOT_ADMIN) {
    super(msg.replace('%path%', path), UNAUTHORIZED);
  }
}

class NotAuthenticated extends CustomError {
  constructor(path, msg = NOT_AUTHENTICATED) {
    super(msg.replace('%path%', path), UNAUTHORIZED);
  }
}

class StripeChargeError extends CustomError {
  constructor(msg, code) {
    super(msg, BAD_REQUEST, code);
  }
}

module.exports = {
  CustomError,
  DuplicateEmail,
  DuplicateUsername,
  IncorrectPassword,
  InsufficientCredits,
  InvalidToken,
  LoginFailed,
  NotAdmin,
  NotAuthenticated,
  StripeChargeError
};
