'use strict';

app.controller('PostViewCtrl', function ($scope, $routeParams, Post) {
	$scope.post = Post.get($routeParams.postID);
	$scope.comments = Post.comments($routeParams.postID);

	$scope.user = Auth.user;
	$scope.signedIn = Auth.signedIn;

	$scope.addComment = function () {
		if(!$scope.commentText || $scope.commentText === '') {
			return;
		}
		var comment = {
			text: $scope.commentText,
			creator: $scope.user.profile.username,
			creatorUID: $scope.user.uid
		};
		$scope.comments.$add(comment);
		$scope.commentText = '';
	};
});