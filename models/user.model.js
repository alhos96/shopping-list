const bcrypt = require("bcrypt");
const { Schema, model } = require("mongoose");

const { errorMessages } = require("../utils/helpers/customMessages");

const User = new Schema({
  email: { type: String, unique: true, required: errorMessages.noEmail },
  password: { type: String, required: errorMessages.noPassword },
});

User.methods.checkPassword = async function (enteredPassword) {
  let match = await bcrypt.compare(enteredPassword, this.password);

  return match;
};

User.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }

  next();
});

module.exports = model("User", User);
