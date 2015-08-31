'use strict';

app.factory('Post', function ($firebase, FIREBASE_URL) {
	var ref = new Firebase(FIREBASE_URL);
	var posts = $firebase(ref.child('posts')).$asArray();

	var Post = {
		all: posts,
		create: function (post) {
			return posts.$add(post);
		},
		get: function (postID) {
			return $firebase(ref.child('posts').child(postID)).$asObject();
		},
		delete: function (post) {
			return posts.$remove(post);
		}
	};
	return Post;
});
