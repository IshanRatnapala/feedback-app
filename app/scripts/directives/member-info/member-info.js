'use strict';

angular.module('feedbackApp')
    .directive('memberInfo', function (FeedbackFactory, AuthService) {
        return {
            restrict: 'E',
            templateUrl: 'scripts/directives/member-info/member-info.html',
            replace: true,
            scope: {
                member: "="
            },
            link: function (scope, element, attr) {

                // TODO: dont show current user

                scope.$root.$on('feedback-form-open', function (event, openedFormScope) {
                    if (scope !== openedFormScope) {
                        scope.fromVisible = false;
                    }
                });

                scope.feedback = {
                    message: '',
                    anonymous: false,
                    archive: false,
                    timestamp: null
                };
                scope.fromVisible = false;
                scope.submitFeedback = function () {
                    console.log('submit feedback', scope.feedback);

                    var userId = AuthService.currentUser.uid;
                    var receiverId = scope.member.$id;

                    if (!scope.feedback.anonymous) {
                        scope.feedback.poster = {
                            name: AuthService.currentUser.displayName,
                            photoUrl: AuthService.currentUser.photoURL,
                        };
                    }
                    
                    scope.feedback.timestamp = new Date();

                    FeedbackFactory.postFeedback(
                        userId,
                        receiverId,
                        scope.feedback
                    ).then(
                        function () {
                            console.log('feedback posting success!');
                        },
                        function () {
                            console.log('feedback posting fail!');
                        });
                }

                scope.toggleForm = function () {
                    scope.$root.$emit('feedback-form-open', scope);
                    scope.fromVisible = !scope.fromVisible;
                }
            }
        }
    });