"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LeccionesTomadas extends Model {
    static associate(models) {
      models.LeccionesTomadas.belongsTo(models.Users);
      models.LeccionesTomadas.belongsTo(models.Lecciones);
    }
  }
  LeccionesTomadas.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
      },
      finished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      index: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "LeccionesTomadas",
    }
  );
  return LeccionesTomadas;
};
