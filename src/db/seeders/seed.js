const models = require("../models");

const users = require("./usuariosIniciales");

(async () => {
  try {
    console.log("Usuarios Iniciales...");
    console.log("\t* Hashing passwords...");
    const usersGet = await users;
    await models.Users.bulkCreate(usersGet, {
      ignoreDuplicates: true,
    });
    console.log("-----------------------\nSeed exitoso");
  } catch (err) {
    console.log(err.message);
    console.log("-----------------------\nError en el seed");
  }
})();
