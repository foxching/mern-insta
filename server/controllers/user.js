const User = require("../model/User");
const Post = require("../model/Post")


/**
 * @route   GET api/user/:username
 * @desc    get user info and posts
 */

exports.getUserProfile = async (req, res) => {
    try {
     const user = await User.findOne({name:req.params.username}).select("-password")
     if(!user) return res.status(404).json({msg:"User not found"})
     const posts = await Post.find({postedBy:user._id}).populate("postedBy", "_id name").exec()
     return res.status(201).json({posts, user})
    } catch (err) {
        res.status(500).json({err:err})
    }
    
}


