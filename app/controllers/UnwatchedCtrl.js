"use strict";

MovieHistory.controller("UnwatchedCtrl", [
  "$scope",
  "$routeParams",
  "$location",
  "movieFactory",
  "$http",

  function ($scope, $routeParams, $location, movieFactory, $http) {
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
        $scope.selectedMovie = $scope.unwatchedMovies.filter(movie => movie.id === $routeParams.movieId)[0];
      }),
      // Handle reject() from the promise
      err => console.log(err)
    );


      //The cards have Id's equal to their keys in firebase, but I cant add them to the delete function properly
    $scope.deleteMovie = (eventId) => $http
        .delete(`https://wonder-twins.firebaseio.com/movies/${eventId}.json`)
        .then(() => $location.url("/fake"));
      

  }
]);