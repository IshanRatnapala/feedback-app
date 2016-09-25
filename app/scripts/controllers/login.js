'use strict';

angular.module('feedbackApp')
    .controller('LoginController', function ($state, AuthService, $rootScope, $scope) {
        var self = this;
        var photoURL = "images/yeoman.png";
        self.photoURL = photoURL;

        //TODO: add loader
        self.loading = false;

        // Set Defaults
        self.loginButtonText = 'Sign in with Google';


        this.toggleLogin = function () {
            self.loading = true;
          
            console.log('loading true')

            if (!AuthService.currentUser) {
                AuthService.login();
            } else {
                AuthService.logout();
            }
        }


        function loggedIn(event, user) {
            // $scope.$apply(function () {
                self.loading = false;
                self.loginButtonText = 'Sign out';
                self.photoURL = user.photoURL;
            // });
            $state.go('app.dashboard');
        }

        function loggedOut() {
            // $scope.$apply(function () {
                self.loading = false;
                self.loginButtonText = 'Sign in with Google';
                self.photoURL = photoURL;
            // });
            $state.go('login');
        }

        $rootScope.$on('user-logged-in', loggedIn);
        $rootScope.$on('user-logged-out', loggedOut);
    });