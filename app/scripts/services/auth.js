'use strict';

angular.module('feedbackApp')
    .service('AuthService', function ($rootScope, $firebaseAuth) {
        var self = this;

        self.auth = $firebaseAuth();

        self.currentUser = null;

        self.login = function () {
            return self.auth.$signInWithPopup("google");
        };

        self.logout = function () {
            self.auth.$signOut();
        };

        self.refreshCurrentUser = function () {
            self.currentUser = self.auth.currentUser;
        };

        self.auth.$onAuthStateChanged(function (firebaseUser) {
            if (firebaseUser) {
                self.currentUser = firebaseUser;
                console.log("Signed in");
                $rootScope.$emit('user-logged-in', firebaseUser);
                //TODO add messages
                // $scope.message = Signed in ;
            } else {
                self.currentUser = null;
                console.log("Signed out");
                $rootScope.$emit('user-logged-out');
                //TODO add messages
                // $scope.message = Signed out;
            }
        });

    });
