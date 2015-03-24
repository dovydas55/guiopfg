/*#######################################################################
  The project configuration file
  Authors: Dovydas Stankevicius
           Sigurgrimur Unnar Olafsson

  Contacts: dovydas13@ru.is
            sigurgrimur@ru.is

  Features:

  Known bugs:

  #######################################################################*/
  var GUIOPFG = angular.module('GUIOPFG', ['ui.router']);

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
        });
  }]);