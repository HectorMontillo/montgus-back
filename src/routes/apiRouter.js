const express = require("express");
const router = express.Router();
const debug = require("debug")("Montgus-Backend:api");
const passport = require("passport");

/**
 * Controllers
 */

const authController = require("./auth");
//const apiController = require("./api");
/**
 * Index
 */
router.get("/", function (req, res, next) {
  res.status(200).json({
    mensaje: "Api en linea",
  });
});

/**
 * Autenticación
 */

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  authController.login
);
router.post("/signup", authController.signup);

/**
 * API
 */

module.exports = router;
