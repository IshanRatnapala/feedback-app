'use strict';

angular.module('feedbackApp')
    .directive('feedbackForm', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/feedback-form.html',
            replace: true,
            controller: function ($scope, FeedbackFactory, AuthService) {
                $scope.fromVisible = false;
                $scope.receiver = null;
                $scope.prepareFeedback = FeedbackFactory.prepareFeedbackForm;
                $scope.feedback = {
                    message: '',
                    anonymous: false,
                    timestamp: null
                };

                $scope.$watch('prepareFeedback.receiver', toggleForm);

                function toggleForm() {
                    var receiverData = $scope.prepareFeedback.getData('receiver');
                    var postData = $scope.prepareFeedback.getData('post');

                    var receiver = receiverData;

                    $scope.feedback = postData || { message: '', anonymous: false, timestamp: null };

                    // $scope.feedback = {
                    //     message: postInfo.message || '',
                    //     anonymous: postInfo.anonymous || false,
                    //     timestamp: postInfo.timestamp || null
                    // };

                    //TODO add edited timestamp

                    if (receiver) {
                        $scope.receiver = receiver;
                        $scope.fromVisible = true;
                    } else {
                        $scope.receiver = null;
                        $scope.fromVisible = false;
                    }
                }

                $scope.closeForm = function () {
                    $scope.prepareFeedback.reset();
                }

                $scope.submitFeedback = function () {
                    console.log('submit feedback', $scope.feedback);

                    var userId = AuthService.currentUser.uid;
                    var receiverId = $scope.receiver.uid;
                    var postId = $scope.feedback.postId;
                    if (postId) {
                        delete $scope.feedback.postId; //Because we dont need it anymore
                    }

                    if (!receiverId) {
                        // No funny stuff people!
                        $scope.prepareFeedback.reset();
                        console.warn('Invalid form data.')
                        return;
                    }

                    // Poster HAS to be the current user on new posts and edits
                    if (!$scope.feedback.anonymous) {
                        $scope.feedback.poster = {
                            name: AuthService.currentUser.displayName,
                            photoUrl: AuthService.currentUser.photoURL,
                        };
                    }

                    // TODO: Deal with the timestamp for edits with a 'edited on' later
                    $scope.feedback.timestamp = new Date();

                    FeedbackFactory.postFeedback(
                        userId,
                        receiverId,
                        $scope.feedback,
                        postId
                    ).then(
                        function () {
                            console.log('feedback posting success!!!');
                            $scope.$apply(function () {
                                $scope.closeForm();
                            });
                            // TODO: post success message
                        },
                        function () {
                            console.log('feedback posting fail!');
                            // TODO: post fail message
                        });
                }
            }
        }
    });
