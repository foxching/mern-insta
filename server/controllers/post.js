const Post = require("../model/Post");


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
const { title, body,pic } = req.body;
console.log(req.body)

  if (!title || !body || !pic) {
    return res.status(422).json({ msg: "All fields are required" });
  }

  const post = new Post({
    title,
    body,
    pic,
    postedBy: req.user.id
  });

  try {
    const newPost = await post.save();
    res.status(201).json({newPost, msg:"Post created succesfully"});
  } catch (err) {
    res.status(500).json({ err: err.msg });
  }
}