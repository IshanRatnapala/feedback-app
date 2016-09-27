'use strict';

angular.module('feedbackApp')
    .directive('feedbackMessage', function (FeedbackFactory, AuthService) {
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
                    var template;
                    if (action.class === 'archive') {
                        template = angular.element(
                            '<div class="' + action.class + '">' +
                            '<label>' +
                            '<input type="checkbox" ng-model="feedback.archived">' +
                            '</label>' +
                            '</div>'
                        );
                    } else {
                        template = angular.element(
                            '<div class="' + action.class + '" ng-click="' + action.class + 'Post()">' +
                            '<span class="glyphicon ' + action.icon + '" aria-hidden="true"></span>' +
                            '<span>' + action.text + '</span>' +
                            '</div>'
                        );
                    }

                    element.find('.actions').append(template);
                }


                return {
                    post: function (scope, element, attr) {
                        // console.log(scope)

                        scope.editPost = function () {
                            // TODO: create a textbox and change the val?
                            console.log('edit post');
                            FeedbackFactory.postedFeedback.edit(userId, receiverId, postId, 'edit');
                        }
                        scope.removePost = function () {
                            console.log('delete post');
                            FeedbackFactory.postedFeedback.remove(userId, receiverId, postId, 'remove');
                        }
                    }
                }
            }
        }
    });