const debug = require("debug")("Montgus-Backend:rolePermissions");
const { unauthorized } = require("../../lib/newError");

function rolePermissions(roles) {
  const roleIds = {
    1: "SuperAdmin",
  };
  return function (req, res, next) {
    debug(roleIds[req.user.RoleId]);
    if (roles.includes(roleIds[req.user.RoleId])) {
      return next();
    }
    return next(unauthorized());
  };
}

module.exports = rolePermissions;
