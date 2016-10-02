'use strict';

angular.module('feedbackApp')
    .controller('ReceivedFeedbackController', function ($scope, AuthService, FeedbackFactory) {

        $scope.showArchived = false;
        $scope.toggleArchivedVisibility = function () {
            $scope.showArchived = !$scope.showArchived;
        };

        FeedbackFactory.getFeedback(
            AuthService.currentUser.uid
        ).$bindTo($scope, 'feedbackReceived').then(function () {
            console.log('feedbackReceived changed');
        });
    });