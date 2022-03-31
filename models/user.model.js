const bcrypt = require("bcrypt");
const { Schema, model } = require("mongoose");

const { errorMessages } = require("../utils/helpers/customMessages");

const User = new Schema({
  email: {
    type: String,
    unique: true,
    required: errorMessages.noEmail,
  },
  password: { type: String, required: errorMessages.noPassword },
});

// validate email
User.path("email").validate(function (email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}, errorMessages.invalidEmail);

// check is password correct on login
User.methods.checkPassword = async function (enteredPassword) {
  let match = await bcrypt.compare(enteredPassword, this.password);

  return match;
};

// hash passowrd before saving document
User.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }

  next();
});

module.exports = model("User", User);
