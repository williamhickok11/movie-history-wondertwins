"use strict";

MovieHistory.factory("movieFactory", ($q, $http, firebaseURL) =>
  () =>
    $q((resolve, reject) =>
      $http
        .get(`${firebaseURL}/movies/.json`)
        .then(
          movieObject => resolve(movieObject.data),
          error => reject(error)
        )
    )
);
