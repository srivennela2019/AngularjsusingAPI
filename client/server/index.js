var express = require("express"),
  app = express(),
  bodyParser = require("body-parser");
var cors = require("cors");
var appRoutes = require("./routes/apps");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/apps", appRoutes);
app.listen(3000, function() {
  console.log("port running");
});
