const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {getUserProfile, followUser, unFollowUser} = require("../../controllers/user")


router.get("/:username", auth, getUserProfile )

router.put("/follow", auth, followUser)

router.put("/unfollow", auth, unFollowUser)


module.exports = router;