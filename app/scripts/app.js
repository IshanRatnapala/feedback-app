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
    // .config(function ($routeProvider) {
    //     $routeProvider
    //         .when('/', {
    //             templateUrl: 'views/main.html',
    //             controller: 'MainCtrl',
    //             controllerAs: 'main'
    //         })
    //         .when('/about', {
    //             templateUrl: 'views/about.html',
    //             controller: 'AboutCtrl',
    //             controllerAs: 'about'
    //         })
    //         .otherwise({
    //             redirectTo: '/'
    //         });
    // });
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/app/");
        
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'LoginController',
                controllerAs: 'loginCtrl',
                data: {
                    requireLogin: false
                }
            })
            .state('app', {
                abstract: true,
                url: '/app',
                template: '<ui-view/>',
                data: {
                    requireLogin: true
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
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
            var requireLogin = toState.data.requireLogin;

            if (requireLogin && !firebase.auth().currentUser) {
                event.preventDefault();
                $state.go('login');
            }
        })
    })
