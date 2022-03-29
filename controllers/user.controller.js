const User = require("../models/user.model");
const { handleError, generateToken, extractMessage } = require("../utils/helpers");

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
      // in other case some fields are empty so find costum message set on model
      let message = extractMessage(err);
      let error = handleError(res, message ? 400 : 500, message || "Something went horribly wrong!"); // if something goes horribly wrong we can't do much about it

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
  const { userId } = req.userData; // pulled from token
  const { newPassword } = req.body;

  let existingUser = await User.findById(userId);

  existingUser.password = newPassword;

  try {
    await existingUser.save();

    res.status(200).json({ message: "Password changed successfuly!" });
  } catch (err) {
    // duplicate key error code.
    if (err.code === 11000) {
      // email must be unique so it caused this error
      let error = handleError(res, 409, "User with that email already exists.");

      return next(error);
    } else {
      // in other case some fields are empty so find costum message set on model
      let message = extractMessage(err);
      let error = handleError(res, message ? 401 : 500, message || "Something went horribly wrong!"); // if something goes horribly wrong we can't do much about it

      return next(error);
    }
  }
};

module.exports = { register, login, changePassword };
