var app = angular.module('flapperNews', ['ui.router']);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	'$httpProvider',
	function($stateProvider, $urlRouterProvider,$httpProvider) {

		var interceptor = ['$q', '$window', '$location', '$injector', function($q, $window, $location, $injector) {

	        return {
	            request: function (config) {
	                config.headers = config.headers || {};
	                if ($window.localStorage['flapper-news-token']) {
	                    config.headers.Authorization = 'Bearer ' + $window.localStorage['flapper-news-token'];
	                }
	                return config;
	            },

	            requestError: function(rejection) {
	                return $q.reject(rejection);
	            },

	            response: function (response) {
	                return response || $q.when(response);
	            },

	            responseError: function(rejection) {

	                var AuthenticationService = $injector.get('auth');

	                if (rejection != null && rejection.status === 401) {
	                	AuthenticationService.logOut();
	                }

	                return $q.reject(rejection);
	            }
	        };
	    }];

    	$httpProvider.interceptors.push(interceptor);

		$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/partials/home.html',
			controller: 'MainCtrl',
			resolve: {
				postPromise: ['posts', function(posts){
					return posts.getAll();
				}]
			}
		})
		.state('posts', {
			url: '/posts/{id}',
			templateUrl: '/partials/posts.html',
			controller: 'PostCtrl',
			resolve: {
				post: ['$stateParams', 'posts', function($stateParams, posts) {
					return posts.get($stateParams.id);
				}]
			}

		})
		.state('login', {
			url: '/login',
			templateUrl: '/partials/login.html',
			controller: 'AuthCtrl',
			onEnter: ['$state', 'auth', function($state, auth){
				if(auth.isLoggedIn()){
					$state.go('home');
				}
			}]
		})
		.state('register', {
			url: '/register',
			templateUrl: '/partials/register.html',
			controller: 'AuthCtrl',
			onEnter: ['$state', 'auth', function($state, auth){
				if(auth.isLoggedIn()){
					$state.go('home');
				}
			}]
		});

		$urlRouterProvider.otherwise('home');
	}]);




