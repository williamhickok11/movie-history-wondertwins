"use strict";

MovieHistory.controller("PageCtrl",
[
  "$scope",
  "$location",
  "$http",
  "authFactory",
  "firebaseURL",

  ($scope, $location, $http, authFactory, firebaseURL) => {

    // Local variables
    let ref = new Firebase(firebaseURL);

    $scope.search = 'jeff';

    $scope.isAuthenticated = () => {
      return authFactory.isAuthenticated();
    };

    $scope.logout = () => {
      console.log("Unauthenticating user");
      ref.unauth();
    };

    $scope.userID = authFactory.userID();

    $scope.searchMovie = function() {

    console.log(`searchMovie Run`);
    console.log(`$scope.search: `, $scope.search);
    $http.get(`http://www.omdbapi.com/?t=${$scope.search}&y=&plot=short&r=json`)
      .then(function(response){
        $scope.rawMovie = response.data;
        console.log(`$scope.rawMovie: `, $scope.rawMovie);

      });
      $scope.search = '';
  };

  }
]);