const ObjectId = require("mongodb").ObjectID;
const Post = require("../model/Post");

/**
 * @route   GET api/posts
 * @desc    get all posts of user following and own post
 */

exports.getAllPost = async (req, res) => {
  following = req.user.following
  following.push(req.user._id)
  try {
    const posts = await Post.find({postedBy:{$in:req.user.following}})
      .populate("postedBy", "name")
      .populate("comments.postedBy","name")
      .exec();
    //console.log(posts)
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
    const posts = await Post.find({ postedBy: req.user._id })
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
  if (!title || !body || !pic) {
    return res.status(422).json({ msg: "All fields are required" });
  }

  const post = new Post({
    title,
    body,
    pic,
    postedBy: req.user._id
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

    if (post.likes.includes(req.user._id)) {
      isLiked = true;
    }

    if (isLiked) {
      await Post.updateOne(
        { _id: ObjectId(req.body.postId) },
        {
          $pull: { likes: req.user._id }
        }
      );
    } else {
      await Post.updateOne(
        { _id: ObjectId(req.body.postId) },
        {
          $push: { likes: req.user._id }
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
    postedBy: req.user._id
  };

  try{
    const post = await Post.findOneAndUpdate(req.body.postId,{
      $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec()
    res.status(200).json({post, msg:"Commented successfully"})
  }catch(err){
    return res.status(422).json({error:err})
  }
};



/**
 * @route   DELETE posts/
 * @desc    delete post 
 */

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findOne({_id:req.params.postId})
    if(post.postedBy.toString() === req.user._id.toString()) {
      await post.remove()
      return res.status(201).json({msg:"Post deleted successfully"})
    }else {
      return res.status(401).json({msg:"You are not authorized to delete this post"})
    }
  } catch (err) {
    return res.status(500).json({err:err})
  }
}