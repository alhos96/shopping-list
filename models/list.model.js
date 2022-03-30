const { Schema, model, Types } = require("mongoose");

const { errorMessages } = require("../utils/helpers/customMessages");

const List = new Schema(
  {
    title: { type: String, required: errorMessages.noTitle, unique: true },
    creator: { type: Types.ObjectId, required: errorMessages.noCreator },
    groceries: [{ product: String, amount: Number }],
  },
  { timestamps: true }
);

List.methods.isListCreator = function (userId) {
  // convert creator ObjectId type to string first
  return this.creator.toString() === userId;
};

module.exports = model("List", List);
