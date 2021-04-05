const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {
  login,
  register,
  getLoggedUser,
  resetPassword
} = require("../../controllers/auth");

router.post("/login", login);

router.post("/signup", register);

router.get("/user", auth, getLoggedUser);

router.post("/reset-password", resetPassword);

module.exports = router;
