'use strict';

angular.module('feedbackApp')
    .controller('LeaveFeedbackController', function (MemberFactory) {
        var self = this;

        self.members = MemberFactory.getMembers();
    });