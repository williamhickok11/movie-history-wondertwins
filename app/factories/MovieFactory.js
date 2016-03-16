"use strict";

MovieHistory.factory("movieFactory", ($q, $http) =>
  () =>
    $q((resolve, reject) => 
      $http
        .get("https://wonder-twins.firebaseio.com/movies.json")
        .success(
          movieObject => resolve(movieObject),
          error => reject(error)
        )
    )
);
