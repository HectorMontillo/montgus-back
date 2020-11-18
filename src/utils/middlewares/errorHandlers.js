const debug = require("debug")("Montgus-Backend:errorHandler");

function errorHandlerHTML(err, req, res, next) {
  // set locals, only providing error in development
  debug("ERROR", err.message, err.status);
  res.locals.message = err.message;
  res.locals.error =
    req.app.get("env") === "development" || req.app.get("env") === "test"
      ? err
      : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
}

function errorHandler(err, req, res, next) {
  debug(
    process.env.NODE_ENV === "development"
      ? err.stack
      : err.message + err.status || 500
  );
  res.status(err.status || 500).json({
    status: err.status || 500,
    mensaje: err.message,
    error: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
}

function notFoundErrorHandler(req, res, next) {
  let error404 = new Error();
  error404.status = 404;
  error404.message = "Not found!";
  next(error404);
}

module.exports = {
  errorHandler,
  errorHandlerHTML,
  notFoundErrorHandler,
};
