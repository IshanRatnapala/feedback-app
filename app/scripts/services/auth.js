'use strict';

angular.module('feedbackApp')
    .service('authService', function ($q, $rootScope) {
        var self = this;

        self.currentUser = function () {
            return firebase.auth().currentUser;
        }

        self.login = function () {
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/plus.login');
            firebase.auth().signInWithPopup(provider);
        }

        self.logout = function () {
            firebase.auth().signOut().then(
                    function (data) {
                        $rootScope.$emit('user-logged-out');
                    }, function (error) {
                        console.error('Sign Out Error', error);
                    });;
        }

        // Result from Redirect auth flow.
        firebase.auth().getRedirectResult().then(function (result) {
            if (result.credential) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                self.token = result.credential.accessToken;
            }

        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            if (errorCode === 'auth/account-exists-with-different-credential') {
                alert('You have already signed up with a different auth provider for that email.');
                // If you are using multiple auth providers on your app you should handle linking
                // the user's accounts here.
            } else {
                console.error(error);
            }
        });

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                console.log('user signed in:', user);
                $rootScope.$emit('user-logged-in', user);
            }
        });

    });
