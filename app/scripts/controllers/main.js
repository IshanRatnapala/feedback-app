'use strict';

angular.module('feedbackApp')
    .controller('MainController', function ($scope, $firebaseArray, $firebaseObject, AuthService, FeedbackFactory, MemberFactory) {
        var self = this;

        var testReciverID = 'p3RooTxS2IU8oS1BytElsPJOuwG3';

        self.currentUser = AuthService.currentUser;

        MemberFactory.validateUser(
            self.currentUser.uid,
            self.currentUser.displayName,
            self.currentUser.email,
            self.currentUser.photoURL
        ).then(
            function (data) {
                self.members = MemberFactory.getMembers();

                FeedbackFactory.getFeedback(
                    AuthService.currentUser.uid
                    // testReciverID
                ).$bindTo($scope, 'feedbackReceived').then(function () {
                    console.log('feedbackReceived changed');
                });

                self.feedbackPosted = FeedbackFactory.getPostedFeedback(
                    AuthService.currentUser.uid
                );

            },
            function (err) {
                console.log(err);
            });

        // TODO: archive todos' and undo archive'
    });