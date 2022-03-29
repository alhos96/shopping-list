const express = require("express");
const router = express.Router();

const { create, update, remove, getData } = require("../controllers/list.controller");
const auth = require("../utils/helpers/auth");

router.post("/", auth, create).patch("/", auth, update).delete("/", auth, remove).get("/", auth, getData);

module.exports = router;
