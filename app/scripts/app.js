var app = angular
	.module('angNewsApp', [
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'firebase'
		])

	.config(function ($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: 'views/posts.html',
			controller: 'PostsCtrl'
		})
		.when('/posts/:postID', {
			templateUrl : 'views/showpost.html',
			controller : 'PostViewCtrl'
		})
		.when('/register', {
			templateUrl: 'views/register.html',
			controller: 'AuthCtrl',
			resolve: {
				user: function(Auth) {
					return Auth.resolveUser();
				}
			}
		})
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'AuthCtrl',
			resolve: {
				user: function(Auth) {
					return Auth.resolveUser();
				}
			}
		})
		.otherwise({
			redirectTo : '/'
		});
	})

	.constant('FIREBASE_URL', 'https://sizzling-fire-7670.firebaseio.com/');


