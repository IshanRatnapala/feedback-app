'use strict';

angular.module('feedbackApp')
    .factory('FeedbackFactory', function ($firebaseArray) {
        return {
            // Get feedback for the user
            getFeedback: function (userId) {
                var feedbackRef = firebase.database().ref('feedback/' + userId);
                return $firebaseArray(feedbackRef);
            },

            postFeedback: function (userId, receiverId, feedback) {
                //I doubt we need angularfire here
                var feedbackRef = firebase.database().ref('feedback/' + receiverId);
                var userPostsRef = firebase.database().ref('posts/' + userId);
                // Get a key for a new Post.
                var newPostKey = firebase.database().ref().child('feedback/' + receiverId).push().key;
                var updates = {};
                updates['/feedback/' + receiverId + '/' + newPostKey] = feedback;
                updates['/posts/' + userId + '/' + newPostKey] = feedback;

                return firebase.database().ref().update(updates);
            },

            // Get the feedback the user has posted
            getPostedFeedback: function (userId) {
                var feedbackRef = firebase.database().ref('posts/' + userId);
                return $firebaseArray(feedbackRef);
            },

            //Edit/remove posted feedback
            editPostedFeedback: function (receiverId) {
                var feedbackRef = firebase.database().ref('feedback');
//Remove "POSTS" from firebase database
                feedbackRef.orderByKey().startAt('-KSbF_GJtxk4AXfAXoHn').on("value", function (snapshot) {
                    console.log(snapshot);
                });

                // var userPostsRef = firebase.database().ref('posts/' + userId);
            },

            // Helper object for submiting feedback
            prepareFeedbackForm: {
                receiver: null,
                setReceiver: function (receiver) {
                    this.receiver = receiver;
                    console.log('Set: ', this.receiver);
                },
                getReceiver: function () {
                    console.log('Get: ', this.receiver);
                    return this.receiver;
                }
            }
        }
    });