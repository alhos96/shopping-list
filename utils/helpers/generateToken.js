const jwt = require("jsonwebtoken");
const config = require("../../config");

const generateToken = (payload) => {
  return jwt.sign(payload, config.secret);
};

module.exports = generateToken;
