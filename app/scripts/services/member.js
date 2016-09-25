'use strict';

angular.module('feedbackApp')
    .factory('MemberFactory', function ($firebaseObject, $firebaseArray, $q) {
        return {
            validateUser: function (userId, name, email, photoURL) {
                var userRef = firebase.database().ref('members/' + userId);
                var userObj = $firebaseObject(userRef);
                var deferred = $q.defer();
                userObj.$loaded()
                    .then(function () {
                        console.log("loaded record:", userObj.$id, userObj.$value);

                        if (userObj.$value === null) {
                            //create user
                            userObj.$value = {
                                username: name,
                                email: email,
                                photoURL: photoURL
                            };
                            userObj.$save().then(function (ref) {
                                deferred.resolve(userObj.$id);
                            }, function (error) {
                                console.log("Error:", error);
                                deferred.reject("Error:", error);
                            });
                        }
                        deferred.resolve(userObj.$id);
                    })
                    .catch(function (error) {
                        console.error("Error:", error);
                        deferred.reject("Error:", error);
                    });
                return deferred.promise;
            },

            getMembers: function () {
                var membersRef = firebase.database().ref('members');
                return $firebaseArray(membersRef);
            }
        }
    });