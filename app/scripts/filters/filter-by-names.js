'use strict';

angular.module('feedbackApp')
    .filter('filterByNames', function (AuthService) {
        function removeCurrentUser (members) {
            var filteredMembers = [];
            angular.forEach(members, function (value) {
                if (value.$id !== AuthService.currentUser.uid) {
                    filteredMembers.push(value);
                }
            });
            return filteredMembers;
        }

        return function (members, field, model) {
            if (!model) {
                removeCurrentUser(members);
                return removeCurrentUser(members);
            }
            var result = [];
            var re = new RegExp('\\b' + model, 'gi');

            angular.forEach(members, function (value) {
                if (value[field].match(re)) {
                    result.push(value);
                }
            });
            return removeCurrentUser(result);
        };
    });