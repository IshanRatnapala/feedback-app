'use strict';

angular.module('feedbackApp')
    .directive('feedbackForm', function () {
        return {
            restrict: 'E',
            templateUrl: 'scripts/directives/feedback-form/feedback-form.html',
            replace: true,
            controller: function ($scope, FeedbackFactory, AuthService) {
                $scope.fromVisible = false;
                $scope.receiver = null;
                $scope.feedbackFactory = FeedbackFactory.prepareFeedbackForm;
                $scope.feedback = {
                    message: '',
                    anonymous: false,
                    timestamp: null
                };

                $scope.$watch('feedbackFactory.receiver', toggleForm);

                function toggleForm() {
                    var receiver = $scope.feedbackFactory.receiver;
                    $scope.feedback = {
                        message: '',
                        anonymous: false,
                        timestamp: null
                    };

                    if (receiver) {
                        $scope.receiver = receiver;
                        $scope.fromVisible = true;
                    } else {
                        $scope.receiver = null;
                        $scope.fromVisible = false;
                    }
                }

                $scope.closeForm = function () {
                    $scope.feedbackFactory.setReceiver(null);
                }

                $scope.submitFeedback = function () {
                    console.log('submit feedback', $scope.feedback);

                    var userId = AuthService.currentUser.uid;
                    var receiverId = $scope.receiver.uid;

                    if (!receiverId) {
                        // No funny stuff people!
                        $scope.feedbackFactory.setReceiver(null);
                        console.warn('Invalid form data.')
                        return;
                    }

                    if (!$scope.feedback.anonymous) {
                        $scope.feedback.poster = {
                            name: AuthService.currentUser.displayName,
                            photoUrl: AuthService.currentUser.photoURL,
                        };
                    }

                    $scope.feedback.timestamp = new Date();

                    FeedbackFactory.postFeedback(
                        userId,
                        receiverId,
                        $scope.feedback
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