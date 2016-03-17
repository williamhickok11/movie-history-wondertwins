"use strict";

MovieHistory.controller('FindCtrl', [
  "$scope",
  "$location",
  "$http",

  function ($scope, $location, $http){

    $scope.userID = authFactory.userID();

    $scope.rawMovie = {};
    // $scope.newMovie = {
    //   Actors: "",
    //   Poster: "",
    //   Rating: 0,
    //   Title: "",
    //   Watched: false,
    //   Year:"",
    //   id: ""
    // };

    // $scope.$watch('search', function() {
    //   if ($scope.search !== undefined){
    //     fetch();
    //   }
    // });

    // function searchMovie () {
    //   $http.get("http://www.omdbapi.com/?t=" + $scope.search )
    //   .then(function(response){ 
    //     $scope.rawMovie = response.data; 
    //     console.log($scope.rawMovie);
    //     $scope.newMovie.Actors = $scope.rawMovie.Actors;
    //     $scope.newMovie.Poster = $scope.rawMovie.Poster;
    //     $scope.newMovie.Title = $scope.rawMovie.Title;
    //     $scope.newMovie.Year = $scope.rawMovie.Year;
    //     console.log($scope.newMovie);
    //   });
    //   $scope.selectedMovie = $scope.newMovie.filter(movie => movie.id === $routeParams.movieId)[0];
    // }

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


  }
  ]);