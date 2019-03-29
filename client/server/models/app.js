var mongoose = require("mongoose");
var userschema = mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  fname: {
    type: String
  },
  lname: {
    type: String
  },
  phone: {
    type: String
  },
  gender: {
    type: String
  }
});
var messageschema = mongoose.Schema({
  sendid: {
    type: String
  },
  userid: {
    type: String
  },
  message: {
    type: String
  },
  imp: {
    type: Boolean,
    default: false
  }
});
var users = mongoose.model("users", userschema);
var messages = mongoose.model("messages", messageschema);
module.exports = { users, messages };
