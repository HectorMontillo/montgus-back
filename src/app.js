// Importando paquetes
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const exphbs = require("express-handlebars");
const fileUpload = require("express-fileupload");
const cors = require("cors");

//Importando utilidades
const {
  errorHandler,
  notFoundErrorHandler,
} = require("./utils/middlewares/errorHandlers");
const rolePermissions = require("./utils/middlewares/rolePermissions");
// Importando routers
const indexRouter = require("./routes/indexRouter");
const apiRouter = require("./routes/apiRouter");
//const superAdminRouter = require("./routes/superAdminRouter");

// Cargando configuracion de estrategias de autenticacion
require("./utils/auth/passport");

const app = express();

// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);
// Habilitando CORS
app.use(cors());

// Configurando view engine
app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Middlewares globales
app.use(
  logger("dev", {
    skip: function (req, res) {
      return res.statusCode == 304;
    },
  })
);
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(process.env.PATH_UPLOADS)));
app.use(passport.initialize());

// Estableciendo routers
app.use("/", indexRouter);
app.use("/api", apiRouter);
/*
app.use(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  rolePermissions(["SuperAdmin"]),
  superAdminRouter
);*/

// 404 error handler
app.use(notFoundErrorHandler);
// error handler
app.use(errorHandler);

module.exports = app;
