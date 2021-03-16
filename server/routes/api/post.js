const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {
  getAllPost,
  getMyPost,
  createPost,
  toggleLikeUnlikePost,
  createComments
} = require("../../controllers/post");

router.post("/createPost", auth, createPost);

router.get("/allPost", auth, getAllPost);

router.get("/myPost", auth, getMyPost);

router.put("/toggleLikeUnlike", auth, toggleLikeUnlikePost);

router.put("/comment", auth, createComments);

module.exports = router;
