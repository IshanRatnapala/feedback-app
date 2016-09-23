'use strict';

angular.module('feedbackApp')
    .filter('filterObject', function () {
        return function (items, field, model) {
            if (!model) {
                return items;
            }
            var result = {};
            var re = new RegExp('\\b' + model, 'gi');

            angular.forEach(items, function (value, key) {
                if (value[field].match(re)) {
                    result[key] = value;
                }
            });
            return result;
        };
    });