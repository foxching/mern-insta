const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {getUserProfile} = require("../../controllers/user")


router.get("/:username", auth, getUserProfile )

module.exports = router;