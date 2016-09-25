'use strict';

angular.module('feedbackApp')
    .filter('filterByNames', function () {
        return function (items, field, model) {
            if (!model) {
                return items;
            }
            var result = [];
            var re = new RegExp('\\b' + model, 'gi');

            angular.forEach(items, function (value) {
                if (value[field].match(re)) {
                    result.push(value);
                }
            });
            return result;
        };
    });