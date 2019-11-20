const { NotAdmin } = require('../errors.js');

module.exports = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    throw new NotAdmin(req.path);
  }
  next();
};
