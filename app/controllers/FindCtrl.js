"use strict";

MovieHistory.controller('FindCtrl', [
  "$scope",
  "$http",

  function ($scope, $http){
    $scope.rawMovie = {};

    $scope.$watch('search', function() {
      fetch();
    });

    function fetch(){
      $http.get("http://www.omdbapi.com/?t=" + $scope.search )
      .then(function(response){ 
        $scope.rawMovie = response.data; 
        console.log($scope.rawMovie);
      });

    }


  }
  ]);