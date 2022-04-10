const express = require("express");
const router = express.Router();

const { create, update, remove, createReport } = require("../controllers/list.controller");
const { formatDate } = require("../utils/middleware");

router.post("/", create).patch("/:listId", update).delete("/:listId", remove).get("/:fromDate/:toDate", formatDate, createReport);

module.exports = router;
