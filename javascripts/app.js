"use strict";

let MovieHistory = angular.module("MovieApp", ["ngRoute", "firebase"])
  .constant('firebaseURL', "https://wonder-twins.firebaseio.com");

/*
  Define a promise for any view that needs an authenticated user
  before it will resolve (see below)
 */

// let isAuth = (authFactory) => new Promise((resolve, reject) => {
//   if (authFactory.isAuthenticated()) {
//     console.log("User is authenticated, resolve route promise");
//     resolve();
//   } else {
//     console.log("User is not authenticated, reject route promise");
//     reject();
//   }
// });

/*
  Set up routes for Music History app
 */
MusicHistory.config(["$routeProvider",
  function ($routeProvider) {
    $routeProvider.
      // when("/", {
      //   templateUrl: "partials/song-list.html",
      //   controller: "SongCtrl",
      //   resolve: { isAuth }
      // }).
      // when("/songs/list", {
      //   templateUrl: "partials/song-list.html",
      //   controller: "SongCtrl",
      //   resolve: { isAuth }
      // }).
      // when("/login", {
      //   templateUrl: "partials/login.html",
      //   controller: "LoginCtrl"
      // }).
      // when("/logout", {
      //   templateUrl: "partials/login.html",
      //   controller: "LoginCtrl"
      // }).
      // when("/songs/new", {
      //   templateUrl: "partials/song-form.html",
      //   controller: "SongFormCtrl",
      //   resolve: { isAuth }
      // }).
      // when("/songs/:songId", {
      //   templateUrl: "partials/song-brief.html",
      //   controller: "SongDetailCtrl",
      //   resolve: { isAuth }
      // }).
      // otherwise({
      //   redirectTo: "/"
      // });
  }]);

/*
  When the application first loads, redirect the user to the login
  form if there is no authentication
 */
 
// MovieHistory.run([
//   "$location",

//   ($location) => {
//     let movieHistoryRef = new Firebase(firebaseURL);

//     movieHistoryRef.onAuth(authData => {
//       if (!authData) {
//         $location.path("/login");
//       }
//     });
//   }
// ]);
