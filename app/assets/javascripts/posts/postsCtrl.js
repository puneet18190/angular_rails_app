angular.module('flapperNews')
.controller('PostsCtrl', ['$scope','posts','post',function($scope, posts, post){
	$scope.post = post;//posts.posts[$stateParams.id];

	$scope.addComment = function(){
	  if($scope.body === '') { return; }
	  // $scope.post.comments.push({
	  //   body: $scope.body,
	  //   author: 'user',
	  //   upvotes: 0
	  // });
	  posts.addComment(post.id, {
	    body: $scope.body,
	    author: 'user',
	  }).success(function(comment) {
	    $scope.post.comments.push(comment);
	  });
	  $scope.body = '';
	};

	$scope.incrementUpvotes = function(comment){
	  posts.upvoteComment(post, comment);
	};

}])
