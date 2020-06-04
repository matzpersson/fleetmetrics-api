import User from '../models/user';
import bcrypt from 'bcrypt';

const jwt = require("jsonwebtoken");

// Handle index actions
exports.index = function (req, res) {
  User.find(req.query, function (err, users) {
    if (err) {
        res.json({
            status: "error",
            message: err,
        });
    }
    res.json({
        status: "success",
        message: "Users retrieved successfully",
        data: users
    });
  });
};

// Handle create actions
exports.new = async (req, res) => {
  var user = new User();
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.dashboard = req.body.dashboard;
  user.groups = ['stalker'];
  
  bcrypt.hash(req.body.password, 10, function(err, hash){
    user.password = hash;
    console.log("hash", hash)
    user.save(function (err) {
      // if (err)
      //     res.json(err);
      res.json({
          message: 'New user created!',
          data: user
      });
    });
  });

};

// Handle findById
exports.view = function (req, res) {
  console.log("REQUEST ID", req.params.permissions)
  User.findById(req.params.id, '-password -_id -created', function (err, user) {
    if (err)
      res.send(err);

    res.json({
      message: 'Success..',
      data: user,
      permissions: req.params.permissions
    });
  });
};

// Handle updateById
exports.update = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) res.send(err);
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.dashboard = req.body.dashboard || user.dashboard;

    user.save(function (err) {
      console.log("USER", user, err)
        if (err)
            res.json(err);
        res.json({
            message: 'User updated',
            data: user
        });
    });
  });
};

// Handle remove 
exports.delete = function (req, res) {
  User.remove({_id: req.params.id}, function (err, user) {
    if (err) res.send(err);
    res.json({
        status: "success",
        message: 'User deleted'
    });
  });
};

exports.login = async (req, res) => {
  if (!req.body.password || !req.body.email) return res.status(400).send("Missing Login Details")

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Login failed.");

  if (! await bcrypt.compare(req.body.password , user.password)) return res.status(400).send("Authentication Failed. Try again...");

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({
    authorized: true
  });
};

// Handle findById
exports.viewCurrent = function (req, res) {
  const token = req.headers["x-access-token"] || req.headers["Authorization"];
  const userId = jwt.verify(token, process.env.LOGIN_SECRET);

  User.findById(userId, '-password -_id -created', function (err, user) {
    if (err)
      res.send(err);

    res.json({
      message: 'Success..',
      data: user,
      permissions: req.params.permissions
    });
  });
};

// Handle updateById
exports.updateCurrent = function (req, res) {
  const token = req.headers["x-access-token"] || req.headers["Authorization"];
  const userId = jwt.verify(token, process.env.LOGIN_SECRET);

  User.findById(userId, function (err, user) {
    if (err) res.send(err);
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.dashboard = req.body.dashboard || user.dashboard;

    user.save(function (err) {
      console.log("USER", user, err)
        if (err)
            res.json(err);
        res.json({
            message: 'User updated',
            data: user
        });
    });
  });
};