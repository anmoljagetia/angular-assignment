'use strict';

app.controller('AuthCtrl', function ($scope, $location, Auth) {
	if ($scope.user) {
		$location.path('/');
	}

	$scope.login = function () {
		Auth.login($scope.user).then(function () {
			$location.path('/');
		})
	};

	$scope.register = function () {
		console.log($scope.user + " has been registered");
		Auth.register($scope.user).then(function() {
			return Auth.login($scope.user).then(function() {
				$location.path('/');
			});
		});
	};
});