"use strict";

MovieHistory.controller("MoviesCtrl", [
  "$scope",
  "$routeParams",
  "$location",
  "movieFactory",
  "authFactory",
  "$http",

  function ($scope, $routeParams, $location, movieFactory, authFactory, $http) {


    $scope.userID = authFactory.userID();

    $scope.movies = [];
    $scope.rawMovie = {};

    // Invoke the promise that reads from Firebase
    movieFactory().then(
      // Handle resolve() from the promise
      movieObject => Object.keys(movieObject).forEach(key => {
        movieObject[key].id = key;
        // if (!movieObject[key].Watched){
        // }
        $scope.movies.push(movieObject[key]);
        console.log($scope.movies);
        // $scope.selectedMovie = $scope.movies.filter(movie => movie.id === $routeParams.movieId)[0];
      }),
      // Handle reject() from the promise
      err => console.log(err)
    );


    $scope.searchMovie = function() {

      $http.get(`http://www.omdbapi.com/?t=${$scope.search}&y=&plot=short&r=json`)
        .then(function(response){ 
          $scope.rawMovie = response.data; 
          console.log(`$scope.rawMovie: `, $scope.rawMovie);
        });

    };


    $scope.addMovie = function () {

      // POST the song to Firebase
      $http.post(
        "https://wonder-twins.firebaseio.com/movies.json",

        // Remember to stringify objects/arrays before
        // sending them to an API
        
        JSON.stringify({
          name: $scope.rawMovie.Title,
          year: $scope.rawMovie.Year,
          actors: $scope.rawMovie.Actors,
          rating: 0,
          watched: false,
          poster: $scope.rawMovie.Poster,
          user: $scope.userID
          })

      // The $http.post() method returns a promise, so you can use then()
      ).then(
        () => $location.url("/unwatched"),      // Handle resolve
        (response) => console.log(response)  // Handle reject
      );
    };


      //The cards have Id's equal to their keys in firebase, but I cant add them to the delete function properly
    $scope.deleteMovie = (eventId) => $http
        .delete(`https://wonder-twins.firebaseio.com/movies/${eventId}.json`)
        // .then(() => $location.url("/fake"));
        .then(() => console.log(`movie successfully deleted`));
      

  }
]);