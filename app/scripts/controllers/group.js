'use strict';

angular.module('feedbackApp')
    .controller('GroupController', function () {
        var self = this;
        self.groupName = '';

        self.checkGroupName = function () {
            console.log('puka')
            var groupRef = firebase.database().ref('groups/' + self.groupName);
            
            groupRef.once("value")
                .then(function(snapshot) {
                    console.log(snapshot.val());
                    // var a = snapshot.exists();  // true
                    // var b = snapshot.child("name").exists(); // true
                    // var c = snapshot.child("name/first").exists(); // true
                    // var d = snapshot.child("name/middle").exists(); // false
                });
        }
    });


