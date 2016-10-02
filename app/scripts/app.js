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
                template: '<div class="app-view container-fluid" ui-view></div>',
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
                controllerAs: 'mainCtrl',
                params: {
                    slide: 0
                }
            })
            .state('app.leaveFeedback', {
                url: '/leaveFeedback',
                templateUrl: 'views/leave-feedback.html',
                controller: 'LeaveFeedbackController',
                controllerAs: 'leaveFeedbackCtrl',
                params: {
                    slide: 1
                }
            })
            .state('app.viewMyFeedback', {
                url: '/viewMyFeedback',
                templateUrl: 'views/received-feedback.html',
                controller: 'ReceivedFeedbackController',
                controllerAs: 'receivedFeedbackCtrl',
                params: {
                    slide: 2
                }
            })
            .state('app.viewPostedFeedback', {
                url: '/viewPostedFeedback',
                templateUrl: 'views/posted-feedback.html',
                controller: 'PostedFeedbackController',
                controllerAs: 'postedFeedbackCtrl',
                params: {
                    slide: 3
                }
            })
            .state('app.about', {
                url: '/about',
                templateUrl: 'views/about.html',
                controller: 'AboutController',
                controllerAs: 'aboutCtrl',
                params: {
                    slide: 4
                }
            })
    })

    .run(function ($state, $rootScope) {
        $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
            if (error === "AUTH_REQUIRED") {
                $state.go('login');
            }
        });
    })
