const SocketIo = require("socket.io");
const debug = require("debug")("Montgus-Backend:Socket.io");
const jwt = require("jsonwebtoken");
const models = require("../db/models");
const bcryp = require("bcrypt");
const {
  badCredentials,
  newError,
  notData,
  badToken,
} = require("../lib/newError");

function listen(server) {
  let io = SocketIo.listen(server);
  io.on("connection", (socket) => {
    debug("Usuario conectado");
  });
  require("socketio-auth")(io, {
    authenticate: async function (socket, data, callback) {
      //get credentials sent by the client
      let token = data.token;
      if (!token) {
        return callback(notData());
      }
      jwt.verify(token, process.env.JWTSECRET, async function (err, decoded) {
        if (err) {
          debug(err);
          return callback(badToken());
        }
        try {
          const user = await models.Users.findOne({
            attributes: ["EstablecimientoId"],
            where: {
              id: decoded.userId,
            },
            raw: true,
          });
          if (!user) {
            return callback(newError("Usuario no encontrado"));
          }
          debug(`Usuario autenticado socketId: ${socket.id}`);

          socket.join(user.EstablecimientoId);
          return callback(null, true);
        } catch (err) {
          debug("Auth", err);
          return callback(err);
        }
      });
    },

    postAuthenticate: async function (socket, data) {
      let token = data.token;
      if (!token) {
        return callback(notData());
      }
      jwt.verify(token, process.env.JWTSECRET, async function (err, decoded) {
        if (err) {
          debug(err);
          return callback(badToken());
        }
        try {
          const user = await models.Users.findOne({
            attributes: ["EstablecimientoId"],
            where: {
              id: decoded.userId,
            },
            include: {
              model: models.Establecimientos,
              attributes: ["conteo", "nombre"],
            },
          });
          debug("User connected to : " + user.Establecimiento.nombre);
          io.to(user.EstablecimientoId).emit("conteo", {
            conteo: user.Establecimiento.conteo,
          });
        } catch (err) {
          debug("PostAuth", err);
        }
      });
    },

    disconnect: function (socket) {
      debug("Usuario desconectado: " + socket.id);
    },
    timeout: 5000,
  });

  return io;
}

module.exports = { listen };
