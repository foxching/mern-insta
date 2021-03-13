const Post = require("../model/User");


/**
 * @route   GET api/posts
 * @desc    get all posts
 */

exports.getAllPost = async (req, res) => {
    try {
        const posts = await Post.find()
          .populate("postedBy", "name")
          .exec();
        res.status(200).json(posts);
      } catch (err) {
        res.status(500).json({ err: err.msg });
    }
}


/**
 * @route   GET api/posts
 * @desc    get all posts by signed user
 */

exports.getMyPost = async (req, res) => {
    try {
        const posts = await Post.find({ postedBy: req.user.id })
          .populate("postedBy", "name")
          .exec();
        res.status(200).json(posts);
      } catch (err) {
        res.status(500).json({ err: err.msg });
      }
}


/**
 * @route   POST api/posts
 * @desc    Create a Post
 */
exports.createPost = async (req, res) => {
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
}