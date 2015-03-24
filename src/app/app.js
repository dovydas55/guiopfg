/*#######################################################################
  The project configuration file
  Authors: Dovydas Stankevicius
           Sigurgrimur Unnar Olafsson

  Contacts: dovydas13@ru.is
            sigurgrimur@ru.is

  Features:

  Known bugs:

  #######################################################################*/
  var GUIOPFG = angular.module('GUIOPFG', ['ui.router', 'angular-storage', 'ui.bootstrap']);

  GUIOPFG.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
      $urlRouterProvider.otherwise('/home');
      $stateProvider
        .state('home', {
          url: '/home',
          views:{
            "HomeView": {
              templateUrl: "src/templates/Home.html",
              controller: 'HomeController',
            }}
        })
        .state('searchResults', {
          url: '/search',
          views:{
            "SearchView": {
              templateUrl: "src/templates/SE_Results.html",
              controller: 'SE_Controller',
            }}
        })
        .state('suggestions', {
          url: '/suggestions',
          views:{
            "SuggestionsView": {
              templateUrl: "src/templates/Suggestions.html",
              controller: 'MenuController',
            }}
        })
        .state('allFiles', {
          url: '/menu/:filterBY',
          views:{
            "AllFilesView": {
              templateUrl: "src/templates/AllFiles.html",
              controller: 'MenuController',
            }}
        });
  }]);
