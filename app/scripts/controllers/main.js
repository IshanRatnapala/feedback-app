'use strict';

angular.module('feedbackApp')
    .controller('MainController', function ($scope, $firebaseArray, $firebaseObject, AuthService, FeedbackFactory, MemberFactory) {
        var self = this;

        self.loading = true;
        
        var currentUser = AuthService.currentUser;

        MemberFactory.validateUser(
            currentUser.uid,
            currentUser.providerData[0].displayName,
            currentUser.providerData[0].email,
            currentUser.providerData[0].photoURL
        ).then(
            function () {
                console.log('dun dun du du dun dun');

                var now = new Date();
                var hrs = now.getHours();
                var msg = "";

                if (hrs > 0) msg = "Good morning";
                if (hrs > 12) msg = "Good afternoon";
                if (hrs > 17) msg = "Good evening";

                self.loading = false;
                self.greeting =  msg + ' ' + currentUser.displayName.substr(0, currentUser.displayName.indexOf(" "));
                self.photoURL = currentUser.photoURL;

            },
            function (err) {
                console.log('User not validated', err);
                alert('Invalid user');
                AuthService.logout();
            });
    });