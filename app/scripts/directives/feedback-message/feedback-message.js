'use strict';

angular.module('feedbackApp')
    .directive('feedbackMessage', function (FeedbackFactory) {
        return {
            restrict: 'E',
            templateUrl: 'scripts/directives/feedback-message/feedback-message.html',
            replace: true,
            scope: {
                feedback: "="
            },
            compile: function (element, attr) {
                angular.forEach(attr.actions, function (value) {
                    if (value === 'A') {
                        appendActionButton({ icon: 'glyphicon-folder-close', text: 'Archive', class: 'archive' });
                    } else if (value === 'E') {
                        appendActionButton({ icon: 'glyphicon-folder-close', text: 'Edit', class: 'edit' });
                    } else if (value === 'D') {
                        appendActionButton({ icon: 'glyphicon-folder-close', text: 'Remove', class: 'remove' });
                    }
                });

                function appendActionButton(action) {
                    var template = angular.element(
                        '<div class="' + action.class + '">' +
                        '<span class="glyphicon ' + action.icon + '" aria-hidden="true"></span>' +
                        '<span>' + action.text + '</span>' +
                        '</div>'
                    );
                    element.find('.actions').append(template);
                }


                return {
                    post: function (scope, element, attr) {
                        console.log(scope)
                    }
                }
            }
        }
    });