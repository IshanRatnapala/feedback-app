'use strict';

angular.module('feedbackApp')
    .directive('memberInfo', function (FeedbackFactory) {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/member-info.html',
            replace: true,
            scope: {
                member: "="
            },
            link: function (scope, element, attr) {
                scope.toggleForm = function () {
                    var prepareFeedback = FeedbackFactory.prepareFeedbackForm;
                    //var currentReceiver = prepareFeedback.getData('receiver');

                    //Don't need the condition coz we filter out the current user?
                    // if (currentReceiver && currentReceiver.uid === scope.member.$id) {
                    //     prepareFeedback.reset();
                    // } else {
                    //     prepareFeedback.setData('receiver', {
                    //         uid: scope.member.$id,
                    //         displayName: scope.member.username,
                    //         photoUrl: scope.member.photoURL
                    //     });
                    //     prepareFeedback.setData('post', null);
                    // }

                    prepareFeedback.setData('receiver', {
                        uid: scope.member.$id,
                        displayName: scope.member.username,
                        photoUrl: scope.member.photoURL
                    });
                    prepareFeedback.setData('post', null);

                    //TODO update profile info on login??
                };
            }
        };
    });
