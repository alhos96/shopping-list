const bcrypt = require("bcrypt");
const { Schema, model } = require("mongoose");

const User = new Schema({
  email: String,
  password: String,
});

User.methods.checkPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// hash password before user is saved
User.pre("save", async function (next) {
  if (!this.isModified) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = model("User", User);
