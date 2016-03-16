"use strict";

MovieHistory.controller("WatchedCtrl", [
  "$scope",
  "$location",
  "movieFactory",

  function ($scope, $location, movieFactory) {
    // Default property values for keys bound to input fields
    // $scope.songSearchText = {name: "", artist: "", album: ""};
    // $scope.query = "";
    $scope.watchedMovies = [];

    // Invoke the promise that reads from Firebase
    movieFactory().then(
      // Handle resolve() from the promise
      movieObject => Object.keys(movieObject).forEach(key => {
        movieObject[key].id = key;
        if (movieObject[key].Watched){
          $scope.watchedMovies.push(movieObject[key]);
        }
        console.log($scope.watchedMovies);
      }),
      // Handle reject() from the promise
      err => console.log(err)
    );

  }
]);
