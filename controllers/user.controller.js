const { User } = require("../models/user.model");

const register = async (req, res, next) => {
  const { email, password } = req.body;
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
};

module.exports = { register, login };
