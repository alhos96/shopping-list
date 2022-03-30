const { Schema, model, Types } = require("mongoose");

const List = new Schema(
  {
    title: { type: String, required: "The list must have a title!", unique: true },
    creator: { type: Types.ObjectId, required: "There must be a creator of a list!" },
    groceries: [{ product: String, amount: Number }],
  },
  { timestamps: true }
);

List.methods.isListCreator = function (userId) {
  // convert creator ObjectId type to string first
  return this.creator.toString() === userId;
};

module.exports = model("List", List);
