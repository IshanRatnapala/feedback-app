'use strict';

angular.module('feedbackApp')
    .factory('FeedbackFactory', function ($firebaseObject) {
        return {
            // Get feedback for the user
            getFeedback: function (userId) {
                var feedbackRef = firebase.database().ref('receivedFeedback/' + userId);
                return $firebaseObject(feedbackRef);
            },

            postFeedback: function (userId, receiverId, feedback) {
                var feedbackWithReceiverId = feedback;
                feedbackWithReceiverId.receiverId = receiverId;
                // Get a key for a new Post.
                var newPostKey = firebase.database().ref().child('posts').push().key;
                var updates = {};
                //updates['/posts/' + newPostKey] = feedback;
                updates['/givenFeedback/' + userId + '/' + newPostKey] = feedbackWithReceiverId;
                updates['/receivedFeedback/' + receiverId + '/' + newPostKey] = feedback;

                return firebase.database().ref().update(updates);
            },

            // Get the feedback the user has posted
            getPostedFeedback: function (userId) {
                var feedbackRef = firebase.database().ref('givenFeedback/' + userId);
                return $firebaseObject(feedbackRef);
            },

            //Edit/remove posted feedback
            postedFeedback: {
                archive: function (userId, postId, undo) {
                    var receivedPostRef = firebase.database().ref('receivedFeedback/' + userId + '/' + postId);
                    return receivedPostRef.update({ archived: !undo });
                },
                edit: function () {

                },
                remove: function () {

                },
            },

            // _editPostedFeedback: function (userId, receiverId, postId, action) {
            //     //archive
            //     var receivedPostRef = firebase.database().ref('receivedFeedback/' + userId + '/' + postId);
            //     return receivedPostRef.update({ archive: true });



            //     var feedbackRef = firebase.database().ref('feedback');
            //     //Remove "POSTS" from firebase database
            //     feedbackRef.orderByKey().startAt('-KSbF_GJtxk4AXfAXoHn').on("value", function (snapshot) {
            //         console.log(snapshot);
            //     });

            //     // var userPostsRef = firebase.database().ref('posts/' + userId);
            // },

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