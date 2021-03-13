const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth")
const {getAllPost, getMyPost, createPost} = require("../../controllers/post")


router.get("/allPost", auth, getAllPost);

router.get("/myPost", auth, getMyPost);

router.post("/createPost", auth, createPost);

module.exports = router;
