'use strict';

angular.module('feedbackApp')
    .directive('memberInfo', function (FeedbackFactory) {
        return {
            restrict: 'E',
            templateUrl: 'scripts/directives/member-info/member-info.html',
            replace: true,
            scope: {
                member: "="
            },
            link: function (scope, element, attr) {
                scope.toggleForm = function () {
                    var feedbackFactory = FeedbackFactory.prepareFeedbackForm
                    var currentReceiver = feedbackFactory.getReceiver();

                    if (currentReceiver && currentReceiver.uid === scope.member.$id) {
                        feedbackFactory.setReceiver(null);
                    } else {
                        feedbackFactory.setReceiver({
                            uid: scope.member.$id,
                            displayName: scope.member.username,
                            photoUrl: scope.member.photoURL,
                        });
                    }
                }
            }
        }
    });