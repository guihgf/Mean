angular.module('flapperNews').controller('MainCtrl', [
	'$scope',
	'posts',
	function($scope,posts){
		$scope.test = 'Hello world!';

		$scope.posts=posts.posts;

		$scope.addPost = function(){
			if(!$scope.title || $scope.title === '') { return; }
			try{
				posts.create({
					title: $scope.title,
					link: $scope.link,
				});
			}
			catch(err){
				console.log("Erro "+er.message);
			}
			
			$scope.title = '';
			$scope.link = '';
		};

		$scope.incrementUpvotes = function(post) {
			posts.upvote(post);
		};
	}]
); 