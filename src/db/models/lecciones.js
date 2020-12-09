"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lecciones extends Model {
    static associate(models) {
      models.Lecciones.belongsTo(models.Users);
      models.Lecciones.hasMany(models.LeccionesTomadas);
    }
  }
  Lecciones.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      public: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      content: {
        type: DataTypes.JSON,
      },
      promotion: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
      },
      score: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Lecciones",
    }
  );
  return Lecciones;
};
