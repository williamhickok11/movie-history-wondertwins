"use strict";

MovieHistory.controller('FindCtrl', [
  "$scope",
  "$location",
  "$http",

  function ($scope, $location, $http){
    $scope.rawMovie = {};
    $scope.newMovie = {
      Actors: "",
      Poster: "",
      Rating: 1,
      Title: "",
      Watched: false,
      Year:"",
      id: ""
    };

    $scope.$watch('search', function() {
      if ($scope.search !== undefined){
        fetch();
      }
    });

    function fetch(){
      $http.get("http://www.omdbapi.com/?t=" + $scope.search )
      .then(function(response){ 
        $scope.rawMovie = response.data; 
        console.log($scope.rawMovie);
        $scope.newMovie.Actors = $scope.rawMovie.Actors;
        $scope.newMovie.Poster = $scope.rawMovie.Poster;
        $scope.newMovie.Title = $scope.rawMovie.Title;
        $scope.newMovie.Year = $scope.rawMovie.Year;
        console.log($scope.newMovie);
      });
      $scope.selectedMovie = $scope.newMovie.filter(movie => movie.id === $routeParams.movieId)[0];
    }

       $scope.addMovie = function () {

      // POST the song to Firebase
      $http.post(
        "https://wonder-twins.firebaseio.com/movies.json",

        // Remember to stringify objects/arrays before
        // sending them to an API
        JSON.stringify($scope.newMovie)

      // The $http.post() method returns a promise, so you can use then()
      ).then(
        () => $location.url("/unwatched"),      // Handle resolve
        (response) => console.log(response)  // Handle reject
      );
    };


  }
  ]);