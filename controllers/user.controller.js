const User = require("../models/user.model");
const { handleError, generateToken } = require("../utils/helpers");

const register = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let newUser = await User.create({ email, password });

    res.status(200).json(newUser);
  } catch (err) {
    // duplicate key error code.
    if (err.code === 11000) {
      // email must be unique so it caused this error
      let error = handleError(res, 409, "User with that email already exists.");

      return next(error);
    } else {
      // in other case something else is wrong with mongo server
      let error = handleError(res, 500, "Something went wrong!");

      return next(error);
    }
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  // check data validity

  let existingUser = await User.findOne({ email: email });

  if (!existingUser) {
    let error = handleError(res, 401, "User with that email doesn't exist.");

    return next(error);
  }

  if (!(await existingUser.checkPassword(password))) {
    let error = handleError(res, 401, "Invalid credentials!");

    return next(error);
  }

  // login user
  let token = generateToken({ id: existingUser._id });

  res.status(200).json({ token });
};

const changePassword = async (req, res, next) => {
  /* const { userId } = req.userData; */ // pulled from token
  const { email, newPassword } = req.body;

  let existingUser = await User.findOne({ email: email });

  existingUser.password = newPassword;

  try {
    await existingUser.save();
  } catch (err) {
    let error = handleError(res, 500, "Something went wrong!");
    console.log(err);
    return next(error);
  }

  res.status(200).json({ message: "Password changed successfuly!" });
};

module.exports = { register, login, changePassword };
