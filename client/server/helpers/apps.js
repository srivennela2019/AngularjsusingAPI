var db = require("../models");
exports.getUsers = function(req, res) {
  db.users.find().then(function(users) {
    res.json(users);
  });
};
exports.getMessages = function(req, res) {
  db.messages.find().then(function(users) {
    res.json(users);
  });
};
exports.createUsers = function(req, res) {
  // if(!db.users.validate(req.body)) {
  //   res.status(403).send("Error");
  // }
  db.users.create(req.body).then(function(newUser) {
    res.status(201).json(newUser);
  });
  // res.send(req.body);
};
exports.createMessages = function(req, res) {
  db.messages.create(req.body).then(function(newMessage) {
    res.status(201).json(newMessage);
  });
  // res.send(req.body);
};
exports.getMessage = function(req, res) {
  db.messages.findById(req.params.msgId).then(function(foundmess) {
    res.json(foundmess);
  });
};
exports.updateMessage = function(req, res) {
  //res.send("update route");
  db.messages
    .findOneAndUpdate({ _id: req.params.msgId }, req.body)
    .then(function(umessage) {
      res.json(umessage);
    });
};
exports.deleteMessage = function(req, res) {
  //res.send("update route");
  db.messages.remove({ _id: req.params.msgId }).then(function() {
    res.json({ message: "deleted" });
  });
};
module.exports = exports;
