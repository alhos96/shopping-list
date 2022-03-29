const express = require("express");
const router = express.Router();

const { create } = require("../controllers/list.controller");

router.post("/", create);

module.exports = router;
