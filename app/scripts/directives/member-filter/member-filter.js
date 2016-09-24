'use strict';

angular.module('feedbackApp')
    .directive('memberFilter', function () {
        return {
            restrict: 'E',
            transclude: true,
            template: '<div ng-transclude></div>',
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