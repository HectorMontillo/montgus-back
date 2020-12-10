const sha256 = require("sha256");

const { notData, newError } = require("../../lib/newError");
const models = require("../../db/models");
const path = require("path");
const { Op } = require("sequelize");

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

async function updateLeccion(req, res, next) {
  const { nombre, descripcion } = req.body;
  const { leccionId } = req.params;
  const permitedMimes = ["image/jpeg", "image/png"];

  if (!nombre || !descripcion) {
    return next(notData());
  }

  if (req.files && !req.files.portada) {
    return next(notData());
  }

  if (req.files && !permitedMimes.includes(req.files.portada.mimetype)) {
    return next(
      newError("La imagen de portada debe estar en formato png o jpg", 400)
    );
  }

  try {
    const data = {
      titulo: nombre,
      description: descripcion,
    };
    if (req.files) {
      let portada = req.files.portada;

      const sha256Hash = sha256(portada.data);

      const savedName = sha256Hash;

      portada.mv(path.join(process.env.PATH_UPLOADS, "portadas", savedName));

      data.image = savedName;
    }
    await models.Lecciones.update(
      {
        ...data,
      },
      {
        where: {
          id: leccionId,
        },
      }
    );

    return res.status(201).json({
      status: 201,
      mensaje: "Lección actualizada satisfactoriamente",
    });
  } catch (err) {
    return next(err);
  }
}

async function getContentLeccion(req, res, next) {
  const { leccionId } = req.params;
  try {
    const leccion = await models.Lecciones.findOne({
      where: {
        id: leccionId,
        UserId: req.user.id,
      },
    });

    if (!leccion) {
      return next(newError("Lección no encontrada", 404));
    }

    return res.status(201).json(leccion);
  } catch (err) {
    return next(err);
  }
}

async function getLeccionesCreadas(req, res, next) {
  try {
    const lecciones = await models.Lecciones.findAll({
      where: { UserId: req.user.id },
    });

    return res.status(201).json(lecciones);
  } catch (err) {
    return next(err);
  }
}

async function getLeccionesRecomendadas(req, res, next) {
  try {
    const lecciones = await models.Lecciones.findAll({
      where: {
        public: true,
        content: {
          [Op.ne]: null,
        },
      },
      order: [
        // Will escape title and validate DESC against a list of valid direction parameters
        ["score", "DESC"],
      ],
    });

    return res.status(201).json(lecciones);
  } catch (err) {
    return next(err);
  }
}

async function eliminarLeccion(req, res, next) {
  const { leccionId } = req.params;
  try {
    await models.Lecciones.destroy({
      where: {
        id: leccionId,
        UserId: req.user.id,
      },
    });

    return res.status(200).json({
      status: 200,
      mensaje: "Lección eliminada",
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  createLeccion,
  setContentLeccion,
  getContentLeccion,
  getLeccionesCreadas,
  getLeccionesRecomendadas,
  updateLeccion,
  eliminarLeccion,
};
