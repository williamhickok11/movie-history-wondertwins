"use strict";

MovieHistory.controller("UnwatchedCtrl", [
  "$scope",
  "$location",
  "movieFactory",

  function ($scope, $location, movieFactory) {
    // Default property values for keys bound to input fields
    // $scope.songSearchText = {name: "", artist: "", album: ""};
    // $scope.query = "";
    $scope.unwatchedMovies = [];

    // Invoke the promise that reads from Firebase
    movieFactory().then(
      // Handle resolve() from the promise
      movieObject => Object.keys(movieObject).forEach(key => {
        movieObject[key].id = key;
        if (!movieObject[key].Watched){
          $scope.unwatchedMovies.push(movieObject[key]);
        }
        console.log($scope.unwatchedMovies);
      }),
      // Handle reject() from the promise
      err => console.log(err)
    );

  }
]);
