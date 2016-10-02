'use strict';

angular.module('feedbackApp')
    .controller('PostedFeedbackController', function (AuthService, FeedbackFactory) {
        var self = this;

        self.feedbackPosted = FeedbackFactory.getPostedFeedback(
            AuthService.currentUser.uid
        );
    });