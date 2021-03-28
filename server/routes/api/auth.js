const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { login, register, getLoggedUser } = require("../../controllers/auth");

router.post("/login", login);

router.post("/signup", register);

router.get("/user", auth, getLoggedUser);

module.exports = router;
