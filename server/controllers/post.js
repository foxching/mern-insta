const ObjectId = require("mongodb").ObjectID;
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
};

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
};

/**
 * @route   POST api/posts
 * @desc    Create a Post
 */
exports.createPost = async (req, res) => {
  const { title, body, pic } = req.body;
  console.log(req.body);

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
    res.status(201).json({ newPost, msg: "Post created succesfully" });
  } catch (err) {
    res.status(500).json({ err: err.msg });
  }
};

/**
 * @route   POST api/posts
 * @desc    toggle like/unlike post
 */

exports.toggleLikeUnlikePost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: ObjectId(req.body.postId) });
    if (post == null) {
      res.status(404).json({ msg: "Post not found" });
    }
    let isLiked = false;

    if (post.likes.includes(req.user.id)) {
      isLiked = true;
    }

    if (isLiked) {
      await Post.updateOne(
        { _id: ObjectId(req.body.postId) },
        {
          $pull: { likes: req.user.id }
        }
      );
    } else {
      await Post.updateOne(
        { _id: ObjectId(req.body.postId) },
        {
          $push: { likes: req.user.id }
        }
      );
    }
    res.status(200).json({ msg: "likes updated successfully" });
  } catch (err) {
    res.status(500).json({ err: err.msg });
  }
};

/**
 * @route   PUT api/posts
 * @desc    add comment to post
 */

exports.createComments = async (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user.id
  };

  try {
    const post = await Post.findOne({ _id: ObjectId(req.body.postId) });
    if (post == null) {
      res.status(404).json({ msg: "Post not found" });
    }
    await Post.updateOne(
      { _id: ObjectId(req.body.postId) },
      {
        $push: { comments: comment }
      },
      {
        new: true
      }
    );
    res.status(200).json({ post, msg: "Commented Successfully" });
  } catch (error) {
    res.status(500).json({ err: err.msg });
  }
};
