'use strict';

angular
    .module('feedbackApp', [
        'ngAnimate',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'firebase',
        'ui.router'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/app/");

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'LoginController',
                controllerAs: 'loginCtrl',
                resolve: {
                    "currentAuth": function (AuthService) {
                        return AuthService.auth.$waitForSignIn();
                    }
                }
            })
            .state('app', {
                abstract: true,
                url: '/app',
                template: '<ui-view/>',
                resolve: {
                    "currentAuth": function (AuthService) {
                        return AuthService.auth.$requireSignIn();
                    }
                }
            })
            .state('app.dashboard', {
                url: '/',
                templateUrl: 'views/main.html',
                controller: 'MainController',
                controllerAs: 'mainCtrl'
            })
            .state('app.about', {
                url: '/about',
                templateUrl: 'views/about.html',
                controller: 'AboutController',
                controllerAs: 'aboutCtrl'
            })
    })

    .run(function ($state, $rootScope) {
        $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
            if (error === "AUTH_REQUIRED") {
                $state.go('login');
            }
        });
    })
