var mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.connect("mongodb://localhost/message-api", { useNewUrlParser: true });
mongoose.Promise = Promise;
module.exports = require("./app");
