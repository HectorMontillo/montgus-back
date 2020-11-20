const bcrypt = require("bcrypt");
const saltRounds = 12;
async function getUsers() {
  let users = [
    //Hector Montillo
    {
      email: "hector.montillo@utp.edu.co",
      username: "HectorMontillo",
      password: await bcrypt.hash("123", saltRounds),
      gravatar:
        "https://s.gravatar.com/avatar/40011d4f10dba7c820415d08232285a6?s=100&r=g&d=retro",
    },
    {
      email: "davila7@utp.edu.co",
      username: "GustavoDavila",
      password: await bcrypt.hash("123", saltRounds),
      gravatar:
        "https://s.gravatar.com/avatar/40011d4f10dba7c820515d08232285a6?s=100&r=g&d=retro",
    },
  ];

  return users;
}

module.exports = getUsers();
