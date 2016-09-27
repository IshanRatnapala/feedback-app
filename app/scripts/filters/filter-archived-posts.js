'use strict';

angular.module('feedbackApp')
    .filter('archived', function () {
        return function (items, model) {
            var result = {};
            angular.forEach(items, function (value, key) {
                if (value && value.archived === model) {
                    result[key] = value;
                }
            });
            return result;
        };
    });