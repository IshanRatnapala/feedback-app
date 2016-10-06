'use strict';

angular.module('feedbackApp')
    .directive('feedbackMessage', function ($window, FeedbackFactory, AuthService, MemberFactory) {
        return {
            restrict: 'E',
            templateUrl: 'scripts/directives/feedback-message/feedback-message.html',
            replace: true,
            scope: {
                feedback: "=",
                type: "@"
            },
            compile: function (element, attr) {
                angular.forEach(attr.actions, function (value) {
                    if (value === 'A') {
                        appendActionButton({ icon: 'fa fa-check', text: 'Archive', class: 'archive' });
                    } else if (value === 'E') {
                        appendActionButton({ icon: 'fa fa-pencil', text: 'Edit', class: 'edit' });
                    } else if (value === 'D') {
                        appendActionButton({ icon: 'fa fa-trash', text: 'Remove', class: 'remove' });
                    }
                });

                function appendActionButton(action) {
                    var template;
                    if (action.class === 'archive') {
                        template = angular.element(
                            '<div class="' + action.class + '">' +
                            '<label>' +
                            '<input type="checkbox" ng-model="feedback.archived">' +
                            '<span class="button-text"></span>' +
                            '</label>' +
                            '</div>'
                        );
                    } else {
                        template = angular.element(
                            '<div class="' + action.class + '" ng-click="' + action.class + 'Post()">' +
                            // '<span class="' + action.icon + '" aria-hidden="true"></span>' +
                            '<span class="button-text">' + action.text + '</span>' +
                            '</div>'
                        );
                    }

                    element.find('.actions').append(template);
                }


                return {
                    post: function (scope, element, attr) {

                        if (scope.type === 'incoming') {
                            scope.receiver = false;
                            scope.poster = true;
                        } else if (scope.type === 'outgoing') {
                            scope.receiver = MemberFactory.getMember(scope.feedback.receiverId);
                            scope.poster = false;
                        }

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