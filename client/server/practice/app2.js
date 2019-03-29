const mod = require("./mod1");
mod.fn1(["user0", "user1", "user2"], function(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});
// process.stdout.write("Please enter your name");
// process.stdin.on("data", function(data) {
//   process.stdout.write(" name" + data);
//   process.exit();
// });
// const express = require("express");
// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
// //get
// //post
// //all
// const middle = function(req, res, next) {
//   console.log("my middle function");
//   next();
// };
// app.use(middle); // order matters
// app.get("/", function(req, res) {
//   req.send("hello!!");
// });
// app.get("/home", function(req, res) {
//   req.sendFile(__dirname + "/views/home.html");
// });
// app.get("/senddata/:uname/:email", function() {
//   console.log(req.params);
//   console.log(req.params);
// });
// app.post("/save", function(req, res) {
//   //console.log('save called');
//   console.log(req.body);
//   res.redirect("/");
// });
// app.listen(8080, function() {
//   console.log("running");
// });
