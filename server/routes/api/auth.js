const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {login,register,getUser} = require("../../controllers/auth")


router.post("/login", login);

router.post("/signup",register);

router.get('/user', auth, getUser)

module.exports = router;
