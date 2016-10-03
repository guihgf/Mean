angular.module('flapperNews').controller('MainCtrl', [
	'$scope',
	'posts',
	'auth',
	function($scope,posts,auth){
		$scope.test = 'Hello world!';

		$scope.posts=posts.posts;

		$scope.isLoggedIn = auth.isLoggedIn;

		$scope.addPost = function(){
			if(!$scope.title || $scope.title === '') { return; }
			try{
				posts.create({
					title: $scope.title,
					link: $scope.link,
					author:auth.currentUser()
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