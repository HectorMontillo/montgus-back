const jwt = require("jsonwebtoken");
const models = require("../../db/models");

function login(req, res, next) {
  req.login(req.user, { session: false }, async (err) => {
    if (err) {
      return next(err);
    }
    const token = jwt.sign({ UserId: req.user.id }, process.env.JWTSECRET);

    const response = {
      token,
    };
    return res.status(200).json(response);
  });
}

module.exports = login;
