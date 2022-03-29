const express = require("express");
const router = express.Router();

const { register, login, changePassword } = require("../controllers/user.controller");

router.post("/register", register);
router.post("/login", login);
router.patch("/", changePassword);

module.exports = router;
