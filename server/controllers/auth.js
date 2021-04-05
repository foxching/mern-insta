const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
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

/**
 * @route   POST api/auth/reset-password
 * @desc    POST request new password
 * @access  Public
 */

exports.resetPassword = (req, res) => {
  // Simple validation
  if (!req.body.email) {
    return res.status(400).json({ msg: "Please enter a value" });
  }

  crypto.randomBytes(32, (err, buffer) => {
    if (err) return res.status(422).json({ err: err });
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res
            .status(404)
            .json({ msg: "User dont exists with that email" });
        }
        user.resetToken = token;
        user.expireToken = Date.now() + 3600000;
        user.save().then(result => {
          transporter.sendMail({
            to: user.email,
            from: "no-replay@insta.com",
            subject: "password reset",
            html: `
                     <p>You requested for password reset</p>
                     <h5>click in this <a href="http://localhost:3000/reset/${token}">link</a> to reset password</h5>
                     `
          });
          res.status(200).json({ msg: "Please check your email" });
        });
      })
      .catch(err => {
        res.status(500).json({ err: err });
      });
  });
};

/**
 * @route   POST api/auth/update-password
 * @desc    POST update password
 * @access  Public
 */

exports.updatePassword = (req, res) => {
  const { password, confirmPassword } = req.body;

  if (!password || !confirmPassword) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ msg: "Password did not match" });
  }

  User.findOne({
    resetToken: req.body.token.token,
    expireToken: { $gt: Date.now() }
  })
    .then(user => {
      if (!user) {
        return res.status(404).json({ msg: "Try again session expired" });
      }
      bcrypt.hash(password, 12).then(hashedpassword => {
        user.password = hashedpassword;
        user.resetToken = undefined;
        user.expireToken = undefined;
        user.save().then(saveduser => {
          res.status(200).json({ msg: "Password updated successfully" });
        });
      });
    })
    .catch(err => {
      res.status(500).json({ err });
    });
};
