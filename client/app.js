var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
  $routeProvider.when("/register", {
    templateUrl: "/views/registration.html",
    controller: "regController"
  });
  $routeProvider.when("/messaged/:id", {
    templateUrl: "/views/messagedetail.html",
    controller: "messagedController",
    resolve: [
      "auth",
      function(auth) {
        return auth.validate();
      }
    ]
  });
  $routeProvider.when("/message", {
    templateUrl: "/views/message.html",
    controller: "messageController",
    resolve: [
      "auth",
      function(auth) {
        return auth.validate();
      }
    ]
  });
  $routeProvider.when("/home", {
    templateUrl: "/views/home.html",
    controller: "homeController",
    resolve: [
      "auth",
      function(auth) {
        return auth.validate();
      }
    ]
  });
  $routeProvider.when("/login", {
    templateUrl: "/views/login.html",
    controller: "loginController"
  });
  $routeProvider
    .when("/logout", {
      templateUrl: "/views/login.html",
      controller: "loginController"
    })
    .otherwise({
      template: "invalid page access"
    });
});
app.run(function($rootScope, $window, $location, $timeout) {
  $rootScope.$on("$locationChangeStart", function(event, next, current) {
    // handle route changes
    var compare = next.split(/[\s/]+/).pop();
    console.log(compare);
    if (compare == "home" || compare == "message") {
      $timeout(function() {
        $rootScope.items = ["home", "message", "logout"];
      }, 1000);
    }
    if (compare == "login" || compare == "register" || compare == "logout") {
      $rootScope.items = ["login", "register"];
    }
    if (compare == "logout") {
      console.log("entered logout");
      $window.localStorage.removeItem("isSession");
    }
  });
  $rootScope.getClass = function(path) {
    var cur_path = $location.path().substr(0, path.length);
    if (cur_path == path) {
      if ($location.path().substr(0).length > 1 && path.length == 1) return "";
      else return "active";
    } else {
      return "";
    }
  };
});
app.controller("appController", function($scope, $rootScope, $location) {
  (function() {
    $scope.url = $location.url();
    console.log($location.path());
  })();
});
app.controller("regController", function($scope, $window, $location, $http) {
  $scope.registration = function() {
    $http({
      method: "POST",
      url: "http://localhost:3000/api/apps",
      data: {
        username: $scope.username,
        password: $scope.password,
        fname: $scope.fname,
        lname: $scope.lname,
        phone: $scope.phone,
        gender: $scope.gender
      }
    }).then(
      function(response) {
        console.log("user inserted");
        alert("you are registered successfully");
        $location.path(["/login"]);
      },
      function(response) {
        console.log(response);
      }
    );
  };
});
app.factory("userDataService", function($http) {
  return {
    users: function() {
      return $http.get("http://localhost:3000/api/apps");
    }
  };
});
app.factory("messageDataService", function($http) {
  return {
    messages: function() {
      return $http.get("http://localhost:3000/api/apps/messages");
    }
  };
});
app.controller("loginController", function(
  $scope,
  $window,
  $location,
  userDataService
) {
  $scope.usernames = [];
  $scope.passwords = [];
  $scope.login = function() {
    userDataService.users().then(
      function(response) {
        console.log(response);
        angular.forEach(response.data, function(value, key) {
          angular.forEach(value, function(value, key) {
            console.log("double loop");
            if (key == "username") {
              $scope.usernames.push(value);
            }
            if (key == "password") {
              $scope.passwords.push(value);
            }
          });
        });
        console.log($scope.usernames);
        console.log($scope.values);
        var keepGoing = true;
        angular.forEach($scope.usernames, function(value, key) {
          if (keepGoing) {
            if (
              $scope.usernames[key] == $scope.username &&
              $scope.passwords[key] == $scope.password
            ) {
              $location.path(["/home"]);
              $window.localStorage.setItem("isSession", $scope.username);
              keepGoing = false;
            }
          }
        });
        if (keepGoing) {
          alert("please enter valid details");
        }
      },
      function(response) {
        console.log(response);
      }
    );
  };
});
app.controller("homeController", function(
  $scope,
  $window,
  $http,
  userDataService,
  messageDataService
) {
  userDataService.users().then(
    function(res) {
      $scope.users = res.data;
    },
    function(res) {
      console.log(res);
    }
  );
  $scope.sentid = $window.localStorage.getItem("isSession");
  messageDataService.messages().then(
    function(res) {
      $scope.messages = res.data;
    },
    function(res) {
      console.log(res);
    }
  );
  $scope.sendMessage = function() {
    $scope.sentid = $window.localStorage.getItem("isSession");
    $http({
      method: "POST",
      url: "http://localhost:3000/api/apps/messages",
      data: {
        sendid: $scope.sentid, //sender id
        userid: $scope.userId, // receiver id
        message: $scope.message,
        imp: false
      }
    }).then(
      function(response) {
        alert("Message Sent");
      },
      function(response) {
        console.log(response);
      }
    );
  };
});
app.controller("messageController", function(
  $scope,
  $window,
  $location,
  messageDataService
) {
  messageDataService.messages().then(
    function(res) {
      $scope.messages = res.data;
    },
    function(res) {
      console.log(res);
    }
  );
  $scope.loggedin = $window.localStorage.getItem("isSession");
});
app.controller("messagedController", function(
  $scope,
  $routeParams,
  $window,
  $location,
  $http,
  messageDataService,
  $timeout
) {
  $scope.messages = [];
  messageDataService.messages().then(
    function(res) {
      // angular.forEach(res.data, function(value, key) {
      //   console.log(key);
      //   $scope.msgs.push(value);
      //   console.log($scope.msgs);
      //   console.log(Array.isArray($scope.msgs));
      $scope.messages = res.data;
      // });
      console.log("mid" + typeof mid, mid);
      $scope.message = $scope.messages[mid];

      console.log(
        "msg" + $scope.message,
        $scope.messages[3],
        $scope.messages["3"]
      );
    },
    function(res) {
      console.log(res);
    }
  );
  var mid = parseInt($routeParams.id);
  // $timeout(function() {
  //   console.log("mid" + typeof mid, mid);
  //   $scope.message = $scope.messages[mid];

  //   console.log(
  //     "msg" + $scope.message,
  //     $scope.messages[3],
  //     $scope.messages["3"]
  //   );
  // }, 100);
  $scope.sendReply = function() {
    $http({
      method: "POST",
      url: "http://localhost:3000/api/apps/messages",
      data: {
        sendid: $scope.messages[mid].userid, //sender id
        userid: $scope.messages[mid].sendid, // receiver id
        message: $scope.reply,
        imp: false
      }
    }).then(
      function(response) {
        alert("Reply sent");
      },
      function(response) {
        console.log(response);
      }
    );
  };

  $scope.deleteMessage = function() {
    confirm("do you want to delete the message ?");
    $http({
      method: "DELETE",
      url: "http://localhost:3000/api/apps/messages/" + $scope.messages[mid]._id
    }).then(
      function(response) {
        $location.path(["/message"]);
      },
      function(response) {
        console.log(response);
      }
    );
  };
  $scope.markImp = function() {
    $http({
      method: "PUT",
      url:
        "http://localhost:3000/api/apps/messages/" + $scope.messages[mid]._id,
      data: {
        imp: $scope.message.imp
      }
    }).then(
      function(response) {
        console.log("marked important");
      },
      function(response) {
        console.log(response);
      }
    );
  };
  $scope.backToMessages = function() {
    $location.path(["/message"]);
  };
});
app.factory("auth", function($window, $location, $timeout, $q) {
  return {
    validate: function() {
      var defer = $q.defer();
      $timeout(function() {
        if (!window.localStorage.isSession) {
          defer.reject();
          $location.path(["/login"]);
        } else {
          defer.resolve();
        }
      }, 1000);
      return defer.promise;
    }
  };
});
