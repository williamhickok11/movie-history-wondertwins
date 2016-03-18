"use strict";

let MovieHistory = angular.module("MovieApp", ["ngRoute", "firebase"])
  // define my personal firebase URL as a constant to be referenced later as firebaseURL
  .constant('firebaseURL', "https://nssmoviesapp.firebaseio.com")

/*
This directive allows us to pass a function in on an enter key to do what we want.
 */
.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
});

/*
  Define a promise for any view that needs an authenticated user
  before it will resolve (see below)
 */

let isAuth = (authFactory) => new Promise((resolve, reject) => {
  if (authFactory.isAuthenticated()) {
    console.log("User is authenticated, resolve route promise");
    resolve();
  } else {
    console.log("User is not authenticated, reject route promise");
    reject();
  }
});

/*
  Set up routes for Music History app
 */
MovieHistory.config(["$routeProvider",
  function ($routeProvider) {
    $routeProvider.
      when("/movies", {
        templateUrl: "partials/movies.html",
        controller: "MoviesCtrl",
        resolve: { isAuth }
      }).
      when("/login", {
        templateUrl: "partials/login.html",
        controller: "LoginCtrl"
      }).
      when("/logout", {
        templateUrl: "partials/login.html",
        controller: "LoginCtrl"
      }).
      when("/new-movies", {
        templateUrl: "partials/find-new.html",
        controller: "FindCtrl",
        resolve: { isAuth }
      }).
      otherwise({
        redirectTo: "/movies"
      });
  }]);

/*
  When the application first loads, redirect the user to the login
  form if there is no authentication
 */
  
MovieHistory.run([
  "$location",

  ($location) => {
    let movieHistoryRef = new Firebase("https://nssmoviesapp.firebaseio.com");

    movieHistoryRef.onAuth(authData => {
      if (!authData) {
        $location.path("/login");
      }
    });
  }
]);


