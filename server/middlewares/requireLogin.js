const { UNAUTHORIZED } = require("http-status-codes");

module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(UNAUTHORIZED).send({ error: "You must be logged in!" });
  }

  next();
};
