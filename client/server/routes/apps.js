var express = require("express");
var router = express.Router();
var db = require("../models");
var helpers = require("../helpers/apps");
router
  .route("/")
  .get(helpers.getUsers)
  .post(helpers.createUsers);
router
  .route("/messages")
  .get(helpers.getMessages)
  .post(helpers.createMessages);
router
  .route("/messages/:msgId")
  .get(helpers.getMessage)
  .delete(helpers.deleteMessage)
  .put(helpers.updateMessage);
module.exports = router;
