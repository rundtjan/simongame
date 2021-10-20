var app = angular.module("simon", []);

app.controller("myCtrl", function ($scope, $timeout) {
  $scope.pace = 1000;
  $scope.level = "easy";
  $scope.go = "no";
  $scope.power = "off";
  $scope.playerArr = [];
  $scope.count = 0;
  $scope.strict = "off";
  $scope.machArr = [];
  var greensound = new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
  );
  var yellowsound = new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
  );
  var redsound = new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
  );
  var bluesound = new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
  );
  $scope.onoff = function () {
    if ($scope.power === "off") {
      $scope.power = "on";
      $scope.on = {
        left: "108px",
      };
    } else {
      $scope.go = "no";
      $scope.power = "off";
      $scope.on = {};
      $scope.reset();
    }
  };
  $scope.start = function () {
    if ($scope.power === "off") {
      return;
    }
    if ($scope.go === "yes") {
      $scope.reset();
      return;
    } else {
      $scope.go = "yes";
      $timeout($scope.mach, 500);
    }
  };
  $scope.hard = function () {
    if ($scope.level === "easy") {
      $scope.level = "hard";
      $scope.pace = $scope.pace * 0.75;
      $scope.hardstyle = {
        left: "108px",
      };
    } else {
      $scope.level = "easy";
      $scope.pace = $scope.pace * 1.33;
      $scope.hardstyle = {};
    }
  };
  $scope.strictly = function () {
    if ($scope.power === "off") {
      return;
    }
    if ($scope.strict === "off") {
      $scope.strict = "on";
      $scope.strictstyle = {
        background: "red",
      };
    } else {
      $scope.strict = "off";
      $scope.strictstyle = {};
    }
  };
  $scope.reset = function () {
    $timeout.cancel($scope.checkforLate);
    $scope.playerArr = [];
    $scope.machArr = [];
    $scope.count = 0;
    $scope.go = "no";
    switch ($scope.level) {
      case "easy":
        $scope.pace = 1000;
        break;
      case "hard":
        $scope.pace = 750;
        break;
    }
  };
  $scope.display = function (x) {
    if ($scope.power === "on") {
      if (x === 1) {
        if ($scope.count > 9 && $scope.count < 20) {
          return "1";
        } else if ($scope.count === 20) {
          return "2";
        } else if ($scope.count < 10) {
          return "0";
        } else {
          return $scope.count;
        }
      } else if (x === 2) {
        if ($scope.count < 10) {
          return $scope.count;
        } else if ($scope.count < 20) {
          return $scope.count - 10;
        } else if ($scope.count === 20) {
          return 0;
        } else {
          return $scope.count;
        }
      }
    }
  };
  $scope.greenlightOn = function () {
    $scope.greenlight = {
      background: "#00ff00",
    };
    greensound.play();
    $timeout(function () {
      $scope.greenlight = {};
    }, 400);
  };
  $scope.yellowlightOn = function () {
    $scope.yellowlight = {
      background: "#ffff00",
    };
    yellowsound.play();
    $timeout(function () {
      $scope.yellowlight = {};
    }, 400);
  };
  $scope.redlightOn = function () {
    $scope.redlight = {
      background: "#ff4242",
    };
    redsound.play();
    $timeout(function () {
      $scope.redlight = {};
    }, 400);
  };
  $scope.bluelightOn = function () {
    $scope.bluelight = {
      background: "#919eff",
    };
    bluesound.play();
    $timeout(function () {
      $scope.bluelight = {};
    }, 400);
  };
  $scope.lightArr = [
    $scope.greenlightOn,
    $scope.yellowlightOn,
    $scope.redlightOn,
    $scope.bluelightOn,
  ];
  $scope.faulty = function () {
    $scope.greenlightOn();
    $scope.yellowlightOn();
    $scope.redlightOn();
    $scope.bluelightOn();
    if ($scope.strict === "on") {
      $timeout(function () {
        $scope.greenlightOn();
        $scope.yellowlightOn();
        $scope.redlightOn();
        $scope.bluelightOn();
      }, 500);
      $scope.reset();
      return;
    } else {
      $timeout(function () {
        $scope.mach("repeat");
      }, 1000);
      $scope.playerArr = [];
      return;
    }
  };
  $scope.win = function () {
    $timeout(function () {
      $scope.yellowlightOn();
      $timeout(function () {
        $scope.bluelightOn();
        $timeout(function () {
          $scope.redlightOn();
          $timeout(function () {
            $scope.greenlightOn();
            $timeout(function () {
              $scope.yellowlightOn();
              $timeout(function () {
                $scope.bluelightOn();
                $timeout(function () {
                  $scope.redlightOn();
                  $timeout(function () {
                    $scope.greenlightOn();
                    $timeout(function () {
                      $scope.yellowlightOn();
                      $timeout(function () {
                        $scope.bluelightOn();
                        $timeout(function () {
                          $scope.redlightOn();
                          $timeout(function () {
                            $scope.greenlightOn();
                            $timeout(function () {
                              $scope.yellowlightOn();
                              $scope.redlightOn();
                              $timeout(function () {
                                $scope.greenlightOn();
                                $scope.bluelightOn();
                              }, 500);
                            }, 500);
                          }, 900);
                        }, 700);
                      }, 500);
                    }, 300);
                  }, 200);
                }, 200);
              }, 200);
            }, 200);
          }, 400);
        }, 400);
      }, 400);
    }, 400);
    $timeout(function () {
      $scope.count = 0;
      $timeout(function () {
        $scope.count = 20;
        $timeout(function () {
          $scope.count = 0;
          $timeout(function () {
            $scope.count = 20;
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
    $timeout($scope.reset, 6000);
  };
  $scope.checkforlate;
  $scope.player = function (x) {
    if ($scope.go === "no") {
      return;
    }
    console.log($timeout.cancel($scope.checkforLate));
    if ($scope.turn === "mach") {
      return;
    } else {
      $scope.playerArr.push(x);
      if (
        !$scope.playerArr.every(function (element, index) {
          return element === $scope.machArr[index];
        })
      ) {
        $scope.faulty();
        return;
      }
      var run = $scope.lightArr[x];
      run();
      console.log($scope.playerArr);
    }
    if ($scope.playerArr.length === $scope.machArr.length) {
      if ($scope.machArr.length === 20) {
        $scope.win();
        return;
      }
      $scope.err = 0;
      $scope.playerArr = [];
      $timeout(function () {
        $scope.mach();
      }, 1000);
    } else {
      $scope.checkforLate = $timeout($scope.faulty, 5000);
    }
  };
  $scope.machPlay = function (x) {
    if ($scope.go === "no") {
      return;
    }
    var machRun = $scope.lightArr[$scope.machArr[x]];
    machRun();
    if (x < $scope.machArr.length - 1) {
      x++;
      $timeout(function () {
        $scope.machPlay(x);
      }, $scope.pace);
    } else {
      $scope.turn = "player";
      $scope.checkforLate = $timeout($scope.faulty, 5000);
    }
  };
  $scope.mach = function (x) {
    if ($scope.go === "no") {
      return;
    }
    $scope.turn = "mach";
    if (x !== "repeat") {
      if (x !== "randomagain") {
        $scope.count++;
      }
      if ($scope.machArr.length === 0) {
        $scope.machArr.push(Math.floor(Math.random() * 4));
      } else {
        var random = Math.floor(Math.random() * 4);
        if (random === $scope.machArr[$scope.machArr.length - 1]) {
          console.log("same");
          if (Math.random() < 0.75) {
            $scope.mach("randomagain");
            return;
          } else {
            $scope.machArr.push(random);
          }
        } else {
          $scope.machArr.push(random);
        }
      }
      switch ($scope.machArr.length) {
        case 5:
          $scope.pace = $scope.pace * 0.9;
          break;
        case 9:
          $scope.pace = $scope.pace * 0.83;
          break;
        case 13:
          $scope.pace = $scope.pace * 0.8;
          break;
      }
    }
    $scope.machPlay(0);
    console.log($scope.machArr);
  };
});
