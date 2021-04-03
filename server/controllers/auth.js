const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_SECRET, EMAIL, PASSWORD } = require("../config/keys");
const User = require("../model/User");
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD
  }
});

/**
 * @route   POST api/auth/register
 * @desc    Register User
 */
exports.register = (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ msg: "All fields are required" });
  }

  User.findOne({
    $or: [
      {
        email: email
      },
      {
        name: name
      }
    ]
  })
    .then(user => {
      if (user)
        return res
          .status(400)
          .json({ msg: "Email or username already exists" });
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
            let mailOptions = {
              from: "InstaClone",
              to: user.email,
              subject: "Welcome to InstaClone",
              text: "Hi" + "" + user.name + " welcome to Insta Clone "
            };

            transporter.sendMail(mailOptions, (err, info) => {
              if (err) return res.status(500).json({ err: err });
              jwt.sign(
                { id: user.id },
                JWT_SECRET,
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
    })
    .catch(err => {
      console.log(err);
    });
};

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
        JWT_SECRET,
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
