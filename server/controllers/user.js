const ObjectId = require("mongodb").ObjectID;
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

/**
 * @route   PUT api/user/follow
 * @desc   follow user
 */

exports.followUser = async (req, res) => {
    try{
        const user = await User.findOneAndUpdate({ _id: ObjectId(req.body.followId) }, {
            $push:{followers:req.user.id}
        },{
            new:true
        })
        await User.findOneAndUpdate({ _id: ObjectId(req.user.id) }, {
            $push:{following:req.body.followId}
        },{
            new:true
        })   
        res.status(200).json({ msg: "User followed successfully" });
    }catch(err){
        res.status(500).json({err:err})
    }
}


/**
 * @route   PUT api/user/unfollow
 * @desc   unfollow user
 */

 exports.unFollowUser = async (req, res) => {
    try{
        const user = await User.findOneAndUpdate({ _id: ObjectId(req.body.unfollowId) }, {
            $pull:{followers:req.user.id}
        },{
            new:true
        })
        await User.findOneAndUpdate({ _id: ObjectId(req.user.id) }, {
            $pull:{following:req.body.unfollowId}
        },{
            new:true
        })   
        res.status(200).json({ msg: "User unfollowed successfully" });
    }catch(err){
        res.status(500).json({err:err})
    }
}

