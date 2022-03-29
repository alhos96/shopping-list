const { Schema, model, Types } = require("mongoose");

const List = new Schema(
  {
    title: { type: String, required: true, unique: true },
    creator: { type: Types.ObjectId, required: true },
    groceries: [{ product: String, amount: Number }],
  },
  { timestamps: true }
);

module.exports = model("List", List);
