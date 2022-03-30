const List = require("../models/list.model");
const { handleError, extractMessage } = require("../utils/helpers");

// error helper
const listError = (err, res, next) => {
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
};

// controllers
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
    listError(err, res, next);
  }
};

const update = async (req, res, next) => {
  const { userId } = req.userData;
  const { listId } = req.params;
  const { title, groceries } = req.body;

  let existingList;

  try {
    existingList = await List.findById(listId);
  } catch (err) {
    let error = handleError(res, 400, "Please make sure list ID is correct format!");

    return next(error);
  }

  // if list doesn't exist
  if (!existingList) {
    let error = handleError(res, 404, "List you are trying to update is not found!");

    return next(error);
  }

  // check is this user a creator of a list
  if (!existingList.isListCreator(userId)) {
    let error = handleError(res, 401, "Seems like this is not your list!");

    return next(error);
  }

  existingList.title = title;
  existingList.groceries = groceries;

  try {
    await existingList.save();

    res.status(200).json({ message: "List updated successfuly!" });
  } catch (err) {
    listError(err, res, next);
  }
};

const remove = async (req, res, next) => {
  const { userId } = req.userData;
  const { listId } = req.params;

  let existingList;

  // check which list is being delted
  try {
    existingList = await List.findById(listId);
  } catch (err) {
    let error = handleError(res, 400, "Please make sure list ID is correct format!");

    return next(error);
  }

  // if list doesn't exist
  if (!existingList) {
    let error = handleError(res, 404, "List you are trying to delete is not found!");

    return next(error);
  }

  // check is this user a creator of a list
  if (!existingList.isListCreator(userId)) {
    let error = handleError(res, 401, "Seems like this is not your list!");

    return next(error);
  }

  console.log(existingList.isListCreator(userId));

  // delete the list
  try {
    await List.deleteOne({ _id: listId });

    res.status(200).json({ message: "List delted successfuly!" });
  } catch (err) {
    let error = handleError(res, 500, "Could not delete list!");

    return next(error);
  }
};

const getData = async (req, res, next) => {};

module.exports = { create, update, remove, getData };
