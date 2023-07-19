const register = require("./register");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const login = require("./login");
const updateAvatar = require("./updateAvatar");
const emailSubscription = require("./emailSubscription");

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateAvatar,
  emailSubscription,
};
