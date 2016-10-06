'use strict';

angular.module('feedbackApp')
    .factory('FeedbackFactory', function ($firebaseObject, $firebaseArray) {
        return {
            // Get feedback for the user
            getFeedback: function (userId) {
                var feedbackRef = firebase.database().ref('receivedFeedback/' + userId);
                return $firebaseObject(feedbackRef);
            },

            postFeedback: function (userId, receiverId, feedback, postId) {
                // For new posts: send - userId, receiverId, feedback
                // For editing posts: send - userId, receiverId, feedback and the postId for the edit
                // For deleting posts: send - userId, receiverId, feedback as NULL and the postId for the delete

                var feedbackWithReceiverId = feedback;
                if (feedbackWithReceiverId) { //feedback can be null if it's a delete operation; so check it.
                    feedbackWithReceiverId.receiverId = receiverId; 
                }

                // Get a key for a new Post or use the given post id for editing.
                var newPostKey = postId || firebase.database().ref().child('posts').push().key;
                var updates = {};
                updates['/givenFeedback/' + userId + '/' + newPostKey] = feedbackWithReceiverId;
                updates['/receivedFeedback/' + receiverId + '/' + newPostKey] = feedback;

                return firebase.database().ref().update(updates);
            },

            // Get the feedback the user has posted
            getPostedFeedback: function (userId) {
                var feedbackRef = firebase.database().ref('givenFeedback/' + userId);
                return $firebaseArray(feedbackRef);
            },

            // Helper object for submiting feedback
            prepareFeedbackForm: {
                receiver: null,
                post: null,
                setData: function (key, data) {
                    this[key] = data;
                },
                getData: function (key) {
                    return this[key];
                },
                reset: function () {
                    this.post = null;
                    this.receiver = null;
                }
            }
        }
    });