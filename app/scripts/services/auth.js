'use strict';

app.factory('Auth', function (FIREBASE_URL, $rootScope) {
	var ref = new Firebase(FIREBASE_URL);
	var Auth = {
		register: function (user) {
			ref.createUser({
				email    : user.email,
				password : user.password
			}, function(error, userData) {
				if (error) {
					console.log("Error creating user:", error);
				} else {
					console.log("Successfully created user account with uid:", userData.uid);
					Auth.login(user);
				}
			});
		},
		login: function (user) {
			ref.authWithPassword({
				email    : user.email,
				password : user.password
			}, function(error, authData) {
				if (error) {
			    	console.log("Login Failed!", error);
				} else {
					console.log("Authenticated successfully with payload:", authData);
				}
			});
		},
		logout: function () {
			ref.unauth();
		},
		// resolveUser: function() {
		// 	return authDataStore;
		// },
		signedIn: function() {
			return !!ref.getAuth();
		},
		user: {}
	};

	$rootScope.$on('Auth.$login', function(e, user) {
		console.log('logged in');
		angular.copy(user, Auth.user);
	});
	$rootScope.$on('$firebaseSimpleLogin:logout', function() {
		console.log('logged out');
		angular.copy({}, Auth.user);
	});

	return Auth;
});