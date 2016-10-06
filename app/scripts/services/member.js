'use strict';

angular.module('feedbackApp')
    .factory('MemberFactory', function ($firebaseObject, $firebaseArray, $q, AuthService) {

        return {
            validateUser: function (userId, name, email, photoURL) {
                var userRef = firebase.database().ref('members/' + userId);
                var userObj = $firebaseObject(userRef);
                var deferred = $q.defer();
                userObj.$loaded()
                    .then(function () {
                        if (userObj.$value === null) {
                            //create user
                            userObj.$value = {
                                username: name,
                                email: email,
                                photoURL: photoURL
                            };
                            userObj.$save().then(function (ref) {
                                deferred.resolve();
                            }, function (error) {
                                console.log("Error:", error);
                                deferred.reject("Error:", error);
                            });
                        } else {
                            //update user
                            if (AuthService.currentUser.displayName !== name || AuthService.currentUser.photoURL !== photoURL) {
                                userObj.username = name;
                                userObj.photoURL = photoURL;

                                AuthService.currentUser.updateProfile({
                                    displayName: name,
                                    photoURL: photoURL
                                }).then(function () {
                                    AuthService.refreshCurrentUser();

                                    userObj.$save().then(function (ref) {
                                        deferred.resolve();
                                    }, function (error) {
                                        console.log("Error:", error);
                                        deferred.reject("Error:", error);
                                    });
                                }, function (error) {
                                    deferred.reject("Error:", error);
                                });
                            } else {
                                deferred.resolve();
                            }

                        }


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
            },

            getMember: function (id) {
                var memberRef = firebase.database().ref('members/' + id);
                return $firebaseObject(memberRef);
            }
        }
    });