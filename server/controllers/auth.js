const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const User = require("../model/User");

/**
 * @route   POST api/auth/login
 * @desc    Login user
 */

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: "User does not exists" });

    //Password validation
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Wrong credentials" });
      jwt.sign(
        { id: user.id, name: user.name },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            msg: "Successfully login",
            token,
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              pic: user.pic,
              followers: user.followers,
              following: user.following
            }
          });
        }
      );
    });
  });
};

/**
 * @route   POST api/auth/register
 * @desc    Register User
 */
exports.register = (req, res) => {
  const { name, email, password, pic } = req.body;
  console.log(req.body);

  if (!name || !email || !password) {
    return res.status(422).json({ msg: "All fields are required" });
  }

  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });
    const newUser = new User({
      name,
      email,
      password,
      pic
    });

    //create salt
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw Error();
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.status(200).json({
                msg: "Successfully signup",
                token,
                user: {
                  _id: user._id,
                  name: user.name,
                  email: user.email,
                  pic: user.pic,
                  followers: user.followers,
                  following: user.following
                }
              });
            }
          );
        });
      });
    });
  });
};

/**
 * @route   GET api/auth/user
 * @desc    Get User Data
 * @access  Private
 */
exports.getLoggedUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ err: err });
  }
};
