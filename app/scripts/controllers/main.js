'use strict';

angular.module('feedbackApp')
    .controller('MainController', function ($scope, AuthService) {
        var self = this;
        self.anonymous = true;

        // save user --------------------------------------------------------------------------------------
        function writeUserData(userId, name, email, photoURL) {
            var userRef = firebase.database().ref('members/' + userId);
            userRef
                .once("value")
                .then(function (snapshot) {
                    if (!snapshot.exists()) {
                        userRef.set({
                            username: name,
                            email: email,
                            photoURL: photoURL
                        }).then(
                            function () {
                                console.log('user created!');
                            },
                            function () {
                                console.log('user creation fail!');
                            });
                    }

                    // loadFeedback();
                });
        }

        // Save user on the db
        var currentUser = AuthService.currentUser;
        writeUserData(
            currentUser.uid,
            currentUser.displayName,
            currentUser.email,
            currentUser.photoURL
        )

        // write feedback --------------------------------------------------------------------------------------
        function writeFeedback(userId, receiverId, message, isAnonymous) {
            var feedbackPost = {
                message: message,
                timestamp: new Date(),
                poster: !isAnonymous && userId
            }

            //save to feedback
            var feedbackRef = firebase.database().ref('feedback/' + receiverId);
            //save to user posts
            var userPostsRef = firebase.database().ref('posts/' + userId);

            // Get a key for a new Post.
            var newPostKey = firebase.database().ref().child('feedback/' + receiverId).push().key;
            console.log(newPostKey)
            // Write the new post's data simultaneously in the posts list and the user's post list.
            var updates = {};
            updates['/feedback/' + receiverId + '/' + newPostKey] = feedbackPost;
            updates['/posts/' + userId + '/' + newPostKey] = feedbackPost;

            return firebase.database().ref().update(updates);
        }

        var testReciverID = 'p3RooTxS2IU8oS1BytElsPJOuwG3';

        /*writeFeedback(
            currentUser.uid,
            testReciverID,
            'anon message',
            self.anonymous
        ).then(
            function () {
                console.log('feedback posting success!');
            },
            function () {
                console.log('feedback posting fail!');
            });*/

        // show feedback --------------------------------------------------------------------------------------

        function showFeedback(userId) {
            var feedbackRef = firebase.database().ref('feedback/' + userId);
            feedbackRef.on('value', function (snapshot) {
                // $scope.$apply(function () {
                    self.feedbackReceived = snapshot.val();
                // });

            });
        }

        showFeedback(
            testReciverID
        );

        // Show users -------------------------------------------------------------------------------------------

        function getMembers() {
            var membersRef = firebase.database().ref('members');
            membersRef.on('value', function (snapshot) {
                // $scope.$apply(function () {
                    self.members = snapshot.val();
                // });

            });
        }

        getMembers();


        // attempt at groups --------------------------------------------------------------------------------------

        // fake a new user
        // currentUser = currentUser+"asd";

        // var userRef = firebase.database().ref('users/' + currentUser.uid);
        // userRef.on('value', function (snapshot) {
        //     if (snapshot.val()) {
        //         // user is in the db, get the feedback
        //         console.log('user from db: ', snapshot.val())
        //     } else {
        //         // ask to enter a group, THEN save the user
        //     }

        // });
    });