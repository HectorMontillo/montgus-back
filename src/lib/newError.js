function newError(message, status = 500) {
  let newError = new Error();
  newError.status = status;
  newError.message = message;
  return newError;
}

function notStore() {
  let newError = new Error();
  newError.status = 401;
  newError.message = "El usuario no está relacionado a ningún establecimiento";
  return newError;
}

function notData(fields = [""]) {
  let newError = new Error();
  newError.status = 400;
  newError.message =
    "Datos incompletos" +
    (fields.length ? `: Los campos ${fields.join(" ")} son requeridos` : "");
  return newError;
}

function badFormat(field = "") {
  let newError = new Error();
  newError.status = 400;
  newError.message = "Formato incorrecto" + (field ? `: ${field}` : "");
  return newError;
}

function badPassword() {
  let newError = new Error();
  newError.status = 400;
  newError.message =
    "Contraseña insegura: Debe contener como mínimo 8 caracteres";
  return newError;
}

function badCredentials() {
  let newError = new Error();
  newError.status = 401;
  newError.message = "Usuario o Contraseña incorrecta. Vuelva a intentarlo";
  return newError;
}

function unauthorized() {
  let newError = new Error();
  newError.status = 401;
  newError.message = "Necesita mas privilegios";
  return newError;
}

function disable() {
  let newError = new Error();
  newError.status = 401;
  newError.message = "Se encuentra desactivado";
  return newError;
}

function badToken() {
  let newError = new Error();
  newError.status = 401;
  newError.message = "Falló la autenticación";
  return newError;
}
function accessDenied() {
  let newError = new Error();
  newError.status = 401;
  newError.message = "Acceso denegado";
  return newError;
}

function alreadyRegistered() {
  let newError = new Error();
  newError.status = 500;
  newError.message = "Ya se encuentra registrado, intenta iniciar sesión";
  return newError;
}

function celularRegistered() {
  let newError = new Error();
  newError.status = 500;
  newError.message =
    "Celular ya se encuentra registrado, intenta iniciar sesión";
  return newError;
}

module.exports = {
  newError,
  notData,
  notStore,
  badFormat,
  badPassword,
  badCredentials,
  unauthorized,
  disable,
  badToken,
  alreadyRegistered,
  celularRegistered,
  accessDenied,
};
