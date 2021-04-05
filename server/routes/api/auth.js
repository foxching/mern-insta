const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {
  login,
  register,
  getLoggedUser,
  resetPassword,
  updatePassword
} = require("../../controllers/auth");

router.post("/login", login);

router.post("/signup", register);

router.get("/user", auth, getLoggedUser);

router.post("/reset-password", resetPassword);

router.post("/update-password", updatePassword);

module.exports = router;
