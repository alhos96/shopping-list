const List = require("../models/list.model");
const { handleError, extractMessage } = require("../utils/helpers");

const create = async (req, res, next) => {
  const { userId } = req.userData; // pulled from token
  const { title, groceries } = req.body;

  try {
    let newList = await List.create({
      creator: userId,
      title,
      groceries,
    });

    res.status(200).json(newList);
  } catch (err) {
    if (err.code === 11000) {
      // list title must be unique so it caused this error
      let error = handleError(res, 409, "List title must be unique! Try a different one.");

      return next(error);
    } else {
      // in other case some fields are empty so find costum message set on model
      let message = extractMessage(err);
      let error = handleError(res, 400, message);

      return next(error);
    }
  }
};

const update = async (req, res, next) => {};

const remove = async (req, res, next) => {};

const getData = async (req, res, next) => {};

module.exports = { create, update, remove, getData };
