"use strict";

MovieHistory.controller("LoginCtrl",
[
  "$scope",
  "$location",
  "$http",
  "authFactory",
  "firebaseURL",



  function ($scope, $location, $http, authFactory, firebaseURL)  {

    // Local variables
    let ref = new Firebase(firebaseURL);

    // Variables on $scope for use in DOM
    $scope.account = { email: "", password: "" };
    $scope.message = "";

    /*
      Attempt to register a new user account.
      If successful, immediately log user in.
     */
    $scope.register = function () {
      ref.createUser({
        email    : $scope.account.email,
        password : $scope.account.password
      }, function (error, userData) {
        if (error) {
          console.log(`Error creating user: ${error}`);
        } else {
          console.log(`Created user account with uid: ${userData.uid}`);
          $scope.login();
        }
      });
    };

    /*
      Attempt to authenticate the user with the
      supplied credentials.
     */
    $scope.login = () => 
      authFactory
        .authenticate($scope.account)
        .then(() => {
          $location.path("/movies");
          $scope.$apply();  // Needed for $location.path() to succeed
        });
  }
]);
