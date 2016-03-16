"use strict";

MovieHistory.controller("WatchedCtrl", [
  "$scope",
  "$routeParams",
  "$location",
  "movieFactory",
  "$http",

  function ($scope, $routeParams, $location, movieFactory, $http) {
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
        $scope.selectedMovie = $scope.watchedMovies.filter(movie => movie.id === $routeParams.movieId)[0];
      }),
      // Handle reject() from the promise
      err => console.log(err)
    );

   $scope.deleteMovie = (eventId) => $http
        .delete(`https://wonder-twins.firebaseio.com/movies/${eventId}.json`)
        .then(() => $location.url("/fake"));
       
  }
]);
