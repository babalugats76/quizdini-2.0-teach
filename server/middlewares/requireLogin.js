const {
  NotAuthenticated
} = require('../errors.js');

module.exports = (req, res, next) => {
  if (!req.user) {
    throw new NotAuthenticated(req.path);
  }
  next();
};
