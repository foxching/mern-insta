const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth")
const {
  getAllPost,
  getMyPost,
  createPost,
  toggleLikeUnlikePost,
  createComments,
  deletePost
} = require("../../controllers/post");

router.post("/createPost", auth, createPost);

router.get("/allPost", auth, getAllPost);

router.get("/myPost", auth, getMyPost);

router.put("/toggleLikeUnlike", auth, toggleLikeUnlikePost);

router.put("/comment", auth, createComments);

router.delete("/deletePost/:postId", auth, deletePost)

module.exports = router;
