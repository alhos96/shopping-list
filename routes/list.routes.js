const express = require("express");
const router = express.Router();

const { create, update, remove, createReport } = require("../controllers/list.controller");

router.post("/", create).patch("/:listId", update).delete("/:listId", remove).get("/:fromDate/:toDate", createReport);

module.exports = router;
