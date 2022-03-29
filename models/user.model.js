const { Schema, model } = require("mongoose");

exports.User = model(
  "User",
  new Schema({
    email: String,
    password: String,
  })
);
