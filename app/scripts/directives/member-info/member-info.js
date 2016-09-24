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
                scope.feedback = {
                    message: '',
                    anonymous: false
                };
                scope.fromVisible = false;
                scope.submitFeedback = function () {
                    console.log('submit feedback', scope.feedback);
                }

                scope.toggleForm = function () {
                    scope.fromVisible = !scope.fromVisible;
                }
            }
        }
    });