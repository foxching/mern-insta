const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../model/User");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");

  //check token
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });
  jwt.verify(token, config.get("jwtSecret"), (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "you must be logged in" });
    }
    const { id } = payload;
    User.findById(id).then(userdata => {
      req.user = userdata;
      next();
    });
  });
};
