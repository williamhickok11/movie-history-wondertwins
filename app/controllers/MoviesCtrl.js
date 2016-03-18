"use strict";

MovieHistory.controller("MoviesCtrl", [
  "$scope",
  "$routeParams",
  "$location",
  "movieFactory",
  "authFactory",
  "$http",
  "firebaseURL",


  function ($scope, $routeParams, $location, movieFactory, authFactory, $http, firebaseURL) {


    $scope.userID = authFactory.userID();

    // used to ng-repeat in movies html (tracked movies)
    $scope.movies = [];
    // used to ng-show in movies html (untracked movie) and in the add movie function
    $scope.rawMovie = {};

    // Invoke the promise that reads from Firebase
    movieFactory().then(
      // Handle resolve() from the promise
      movieObject => Object.keys(movieObject).forEach(key => {
        movieObject[key].id = key;
        // if (!movieObject[key].Watched){
        // }
        $scope.movies.push(movieObject[key]);
        // $scope.selectedMovie = $scope.movies.filter(movie => movie.id === $routeParams.movieId)[0];
        console.log("$scope.movies", $scope.movies);
      }),
      // Handle reject() from the promise
      err => console.log(err)
    );


    $scope.searchMovie = function() {

      console.log(`searchMovie Run`);
      console.log(`$scope.search: `, $scope.search);
      $http.get(`http://www.omdbapi.com/?t=${$scope.$parent.search}&y=&plot=short&r=json`)
        .then(function(response){
          $scope.rawMovie = response.data;

          console.log(`$scope.rawMovie: `, $scope.rawMovie);
        });

    };

    $scope.starRating = function (movieId, num) {
      console.log("movieId", movieId);
      console.log("num", num);
      console.log("$scope.movies", $scope.movies);
     
      // loop through $scope.movies
      var movie = $scope.movies.filter(function(movie) {
        return movie.id === movieId;
      })[0];
     
      movie.rating = num;
     
      console.log("movie", movie);
     
      $http
        .put(`https://nssmoviesapp.firebaseio.com/movies/${movieId}.json`, movie)
        .then((response) =>  {
          console.log("response", response);
          console.log("response.data", response.data);
          // find the movie that you just updated in the array
          // and replace it with the updated version of itself

          var updatedMovie = response.data;

          console.table($scope.movies);
     
        })
        .catch((error) => {
          console.error(error); 
        });

    }

    $scope.addMovie = function () {

      // POST the song to Firebase
      $http.post(
        `${firebaseURL}/movies.json`,

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
        () => $location.url("/movies"),      // Handle resolve
        (response) => console.log(response)  // Handle reject
      );
    };


      //The cards have Id's equal to their keys in firebase, but I cant add them to the delete function properly
    $scope.deleteMovie = (eventId) => $http
        .delete(`${firebaseURL}/${eventId}.json`)
        // .then(() => $location.url("/fake"));
        .then(() => console.log(`movie successfully deleted`));


  }
]);