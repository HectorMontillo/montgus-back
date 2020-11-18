//Cargando variables de entorno
require("dotenv").config();

//Importando paquetes
const debug = require("debug")("Montgus-Backend:server");
const http = require("http");

//Importando modulos locales
const app = require("./src/app");
const models = require("./src/db/models");
const pkgInfo = require("./package.json");

//Estableciendo puerto
const port = process.env.PORT || "3000";
app.set("port", port);

//Creando http server
const server = http.createServer(app);
/*
const io = require("./src/socket.io").listen(server);
app.io = io;*/

//Estableciendo eventos
server.on("error", onError);
server.on("listening", onListening);

//Probando conexión con la DB e Inicializando server
models.sequelize
  .authenticate()
  .then(function () {
    debug("General Database authenticate DONE");
    debug(
      "Database %s running on %s",
      models.sequelize.options.database,
      models.sequelize.options.host
    );
    server.listen(port);
  })
  .catch((err) => {
    debug("Unable to connect to the database:", err);
  });

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
  console.log(
    "Plataforma Version: " +
      pkgInfo.version +
      " corriendo en el puerto " +
      addr.port
  );
}
