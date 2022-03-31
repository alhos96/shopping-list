const mongoose = require("mongoose");

const toObjectId = (id) => {
  let objectId = new mongoose.Types.ObjectId(id);

  return objectId;
};

module.exports = toObjectId;
