const express = require("express");
const router = express.Router();

const { create, update, remove, createReport } = require("../controllers/list.controller");
const { auth, formatDate } = require("../utils/middleware");

router
  .post("/", auth, create)
  .patch("/:listId", auth, update)
  .delete("/:listId", auth, remove)
  .get("/:fromDate/:toDate", auth, formatDate, createReport);

module.exports = router;
