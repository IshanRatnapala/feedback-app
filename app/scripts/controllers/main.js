'use strict';

angular.module('feedbackApp')
    .controller('MainController', function ($scope, $rootScope, $firebaseArray, $firebaseObject, AuthService, MemberFactory) {
        var self = this;

        self.loading = true;

        var currentUser = AuthService.currentUser;

        if (currentUser) {
            validateUser(null, currentUser);
        } else {
            $rootScope.$on('user-logged-in', validateUser);
        }

        function validateUser(event, user) {
            MemberFactory.validateUser(
                user.uid,
                user.providerData[0].displayName,
                user.providerData[0].email,
                user.providerData[0].photoURL
            ).then(
                function () {
                    var now = new Date();
                    var hrs = now.getHours();
                    var msg = "";

                    if (hrs > 0) {
                        msg = "Good morning";
                    }
                    if (hrs > 12) {
                        msg = "Good afternoon";
                    }
                    if (hrs > 17) {
                        msg = "Good evening";
                    }

                    self.loading = false;
                    self.greeting =  msg + ' ' + user.displayName.substr(0, user.displayName.indexOf(" "));
                    self.photoURL = user.photoURL;

                },
                function (err) {
                    console.log('User not validated', err);
                    alert('Invalid user');
                    AuthService.logout();
                });
        }
    });
