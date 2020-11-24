const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const models = require("../../db/models");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const { notData, newError } = require("../../lib/newError");

async function signup(req, res, next) {
  const { email, username, password } = req.body;

  //Validadtion
  if (!email || !password || !username) {
    return next(notData(["email", "password", "username"]));
  }

  try {
    const checkUser = await models.Users.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });

    if (checkUser) {
      return next(newError("El usuario ya se encuentra resgistrado!"));
    }

    const hash = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
    const avatar = gravatar.url(email, { s: "100", r: "g", d: "retro" }, true);

    const newUser = await models.Users.create({
      email,
      password: hash,
      gravatar: avatar,
      username,
    });
    const token = jwt.sign({ userId: newUser.id }, process.env.JWTSECRET);
    return res.status(201).json({ token, gravatar: newUser.gravatar });
  } catch (err) {
    return next(err);
  }
}

module.exports = signup;
