const sha256 = require("sha256");

const { notData, newError } = require("../../lib/newError");
const models = require("../../db/models");
const path = require("path");

async function createLeccion(req, res, next) {
  const { nombre, descripcion } = req.body;
  const permitedMimes = ["image/jpeg", "image/png"];

  if (!nombre || !descripcion || !req.files.portada) {
    return next(notData());
  }

  if (!permitedMimes.includes(req.files.portada.mimetype)) {
    return next(
      newError("La imagen de portada debe estar en formato png o jpg", 400)
    );
  }
  /*
  console.log("User: ", req.user.username);
  console.log(req.body, req.files);*/
  try {
    let portada = req.files.portada;

    const sha256Hash = sha256(portada.data);

    const savedName = sha256Hash;

    portada.mv(path.join(process.env.PATH_UPLOADS, "portadas", savedName));

    const createdLeccion = await models.Lecciones.create({
      titulo: nombre,
      username: req.user.username,
      description: descripcion,
      image: savedName,
      UserId: req.user.id,
    });

    return res.status(201).json({
      status: 201,
      mensaje: "Lección creada satisfactoriamente",
      id: createdLeccion.id,
    });
  } catch (err) {
    return next(err);
  }
}

async function setContentLeccion(req, res, next) {
  const slides = req.body.slides;
  const leccionId = req.params.leccionId;
  if (!slides) {
    return next(notData());
  }
  try {
    const [updated] = await models.Lecciones.update(
      { content: slides, public: true },
      { where: { id: leccionId, UserId: req.user.id } }
    );
    if (!updated) {
      return next(newError("Un error inesperado guardando la lección"));
    }
    return res.status(201).json({
      status: 201,
      mensaje: "Leccion guarda satisfactoriamente",
    });
  } catch (err) {
    return next(err);
  }
}
module.exports = {
  createLeccion,
  setContentLeccion,
};
