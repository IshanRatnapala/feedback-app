'use strict';

angular.module('feedbackApp')
    .controller('LoginController', function ($state, AuthService, $rootScope, $scope) {
        var self = this;
        var photoURL = "images/profiledefault.png";
        self.photoURL = photoURL;
        self.showNav = false;

        self.loading = false;

        // Set Defaults
        self.loginButtonText = 'Sign in with Google';

        this.toggleLogin = function () {
            self.loading = true;
          
            console.log('loading true')

            if (!AuthService.currentUser) {
                AuthService.login().catch(function (error) {
                    console.error("Authentication failed:", error);
                    self.loading = false;
                });
            } else {
                AuthService.logout();
            }
        }

        function loggedIn(event, user) {
            self.loading = false;
            self.loginButtonText = 'Sign out';
            self.photoURL = user.photoURL;
            self.showNav = true;

            $state.go('app.dashboard');
        }

        function loggedOut() {
            self.loading = false;
            self.loginButtonText = 'Sign in with Google';
            self.photoURL = photoURL;
            self.showNav = false;

            $state.go('login');
        }

        $rootScope.$on('user-logged-in', loggedIn);
        $rootScope.$on('user-logged-out', loggedOut);
    });