const name = "vennela";
const email = "venenla@gmail.com";
const fn = function() {
  return "Hello";
};
const fn1 = function(users, cFn) {
  if (!users.length) {
    cFn("Error no input");
  } else {
    var myObj = {};
    for (var i = 0; i < users.length; i++) {
      myObj["u" + i] = users[i];
    }
  }
  cFn("", myObj);
};
module.exports = { name, fn, fn1 };
