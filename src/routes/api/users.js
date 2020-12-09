const { notData, newError } = require("../../lib/newError");
const models = require("../../db/models");

async function getUser(req, res, next) {
  return res.status(200).json(req.user);
}

module.exports = { getUser };
