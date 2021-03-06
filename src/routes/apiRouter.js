const express = require("express");
const router = express.Router();
const debug = require("debug")("Montgus-Backend:api");
const passport = require("passport");

/**
 * Controllers
 */

const authController = require("./auth");
const apiController = require("./api");
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
/**
 * Usuarios
 */
router.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  apiController.users.getUser
);
/**
 * Lecciones
 */
router.post(
  "/lecciones",
  passport.authenticate("jwt", { session: false }),
  apiController.lecciones.createLeccion
);
router.post(
  "/lecciones/take/:leccionId",
  passport.authenticate("jwt", { session: false }),
  apiController.lecciones.tomarLeccion
);
router.post(
  "/lecciones/finish/:leccionId",
  passport.authenticate("jwt", { session: false }),
  apiController.lecciones.terminarLeccion
);
router.put(
  "/lecciones/:leccionId",
  passport.authenticate("jwt", { session: false }),
  apiController.lecciones.updateLeccion
);
router.delete(
  "/lecciones/:leccionId",
  passport.authenticate("jwt", { session: false }),
  apiController.lecciones.eliminarLeccion
);
router.post(
  "/lecciones/content/:leccionId",
  passport.authenticate("jwt", { session: false }),
  apiController.lecciones.setContentLeccion
);
router.get(
  "/lecciones/content/:leccionId",
  passport.authenticate("jwt", { session: false }),
  apiController.lecciones.getContentLeccion
);
router.get(
  "/lecciones/creadas",
  passport.authenticate("jwt", { session: false }),
  apiController.lecciones.getLeccionesCreadas
);
router.get(
  "/lecciones/recomendadas",
  passport.authenticate("jwt", { session: false }),
  apiController.lecciones.getLeccionesRecomendadas
);
router.get(
  "/lecciones/not_finished",
  passport.authenticate("jwt", { session: false }),
  apiController.lecciones.getLeccionesNoTerminadas
);
module.exports = router;
