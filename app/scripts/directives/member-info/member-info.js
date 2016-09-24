'use strict';

angular.module('feedbackApp')
    .directive('memberInfo', function () {
        return {
            restrict: 'E',
            templateUrl: 'scripts/directives/member-info/member-info.html',
            replace: true,
            scope: {
                member: "="
            },
            link: function (scope, element, attr) {
                scope.$root.$on('feedback-form-open', function (event, openedFormScope) {
                    if (scope !== openedFormScope) {
                        scope.fromVisible = false;
                    }
                });

                scope.feedback = {
                    message: '',
                    anonymous: false
                };
                scope.fromVisible = false;
                scope.submitFeedback = function () {
                    console.log('submit feedback', scope.feedback);
                }

                scope.toggleForm = function () {
                    scope.$root.$emit('feedback-form-open', scope);
                    scope.fromVisible = !scope.fromVisible;
                }
            }
        }
    });