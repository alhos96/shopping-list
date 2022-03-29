const express = require("express");
const router = express.Router();

const { register, login, changePassword } = require("../controllers/user.controller");
const auth = require("../utils/helpers/auth");

router.post("/register", register);
router.post("/login", login);
router.patch("/", auth, changePassword);

module.exports = router;
