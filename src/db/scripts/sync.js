const { sequelize } = require("../models");

(async () => {
  let force = process.env.FORCE == 1 ? true : false;
  try {
    console.log("Sincronizando Bade de datos: ", force ? "Forzada" : "");
    await sequelize.sync({ force });
    console.log("Success sync!!");
  } catch (err) {
    console.log(err);
  }
})();
