"use strict";

MovieHistory.controller("PageCtrl",
[
  "$scope",
  "$location",
  "$http",
  "authFactory",
  "firebaseURL",

  ($scope, $location, $http, authFactory, firebaseURL) => {

    $scope.tester = () => { console.log("tester function run"); };

    $scope.search = "";

    // Local variables
    let ref = new Firebase(firebaseURL);

    $scope.isAuthenticated = () => {
      return authFactory.isAuthenticated();
    };

    $scope.logout = () => {
      console.log("Unauthenticating user");
      ref.unauth();
    };

  }
]);