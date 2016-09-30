'use strict';

angular.module('feedbackApp')
    .directive('feedbackMessage', function ($window, FeedbackFactory, AuthService) {
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
                            console.log('edit post');

                            var prepareFeedback = FeedbackFactory.prepareFeedbackForm;
                            var currentReceiver = prepareFeedback.getData('receiver');

                            prepareFeedback.setData('receiver', {
                                uid: scope.feedback.receiverId,
                                displayName: AuthService.currentUser.displayName,
                                photoUrl: AuthService.currentUser.photoUrl
                            });
                            prepareFeedback.setData('post', {
                                postId: scope.feedback.$id,
                                message: scope.feedback.message,
                                anonymous: scope.feedback.anonymous,
                                timestamp: scope.feedback.timestamp
                            });
                        }
                        scope.removePost = function () {
                            if ($window.confirm('Are you sure you want to delete the post?')) {
                                console.log('delete post');

                                FeedbackFactory.postFeedback(
                                    AuthService.currentUser.uid,
                                    scope.feedback.receiverId,
                                    null,
                                    scope.feedback.$id
                                ).then(
                                    function () {
                                        console.log('feedback deleting success!!!');
                                        // TODO: post success message
                                    },
                                    function () {
                                        console.log('feedback deleting fail!');
                                        // TODO: post fail message
                                    });
                            }
                        }
                    }
                }
            }
        }
    });