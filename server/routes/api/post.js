const express = require("express");
const router = express.Router();
const Post = require("../../model/Post");
const auth = require("../../middleware/auth");

/**
 * @route   POST api/posts
 * @desc    Create a Post
 */

router.post("/createPost", auth, async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(422).json({ msg: "Please enter all fields" });
  }

  const post = Post({
    title,
    body,
    postedBy: req.user.id
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ err: err.msg });
  }
});

module.exports = router;
