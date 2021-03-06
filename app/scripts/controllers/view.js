'use strict';

angular.module('feedbackApp')
    .controller('ViewController', function ($rootScope, $scope, FeedbackFactory) {
        var self = this;
        self.back = false;

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
            if (toParams.slide < fromParams.slide) {
                self.back = true;
            } else {
                self.back = false;
            }
            
            $rootScope.slide = 'slide-' + toParams.slide;

            // Reset feedback form
            FeedbackFactory.prepareFeedbackForm.reset();
        });

        $rootScope.$on('$viewContentAnimationEnded', function (event, toState, toParams, fromState, fromParams) {
            self.back = false;
        });
    });