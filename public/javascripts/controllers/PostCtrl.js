angular.module('flapperNews').controller('PostCtrl', [
	/*injections*/
	'$scope',
	'$stateParams',
	'posts',
	'post',
	function($scope, $stateParams, posts, post /*vindo do resolve*/){
		$scope.post = post;

		$scope.addComment = function(){
			if($scope.body === '') { return; }
			
			posts.addComment(post._id, {
				body: $scope.body,
				author: 'user',
			}).success(function(comment) {
				$scope.post.comments.push(comment);
			});
			$scope.body = '';

		};

		$scope.incrementUpvotes=function(comments){
			posts.upvoteComment(post, comments);
		}
	}]
	);