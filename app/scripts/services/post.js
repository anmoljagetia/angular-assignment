'use strict';

app.factory('Post', function ($firebase, FIREBASE_URL) {
	var ref = new Firebase(FIREBASE_URL);
	var posts = $firebase(ref.child('posts')).$asArray();

	var Post = {
		all: posts,
		create: function (post) {
			return posts.$add(post).then(function(postRef) {
				$firebase(ref.child('user_posts').child(post.creatorUID)).$push(postRef.name());
				return postRef;
			});
		},
		get: function (postID) {
			return $firebase(ref.child('posts').child(postID)).$asObject();
		},
		delete: function (post) {
			return posts.$remove(post);
		},
		comments: function (postID) {
			return $firebase(ref.child('comments').child(postID)).$asArray();
		}
	};
	return Post;
});
