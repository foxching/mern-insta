const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth")
const {getAllPost, getMyPost, createPost} = require("../../controllers/post")


router.post("/createPost", auth, createPost);

router.get("/allPost", auth, getAllPost);

router.get("/myPost", auth, getMyPost);



module.exports = router;
