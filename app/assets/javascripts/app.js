angular.module('flapperNews', ['ui.router', 'Devise'])
.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      resolve: {
		postPromise: ['posts', function(posts){
			return posts.getAll();
		}]
	  },

      url: '/home',
      templateUrl: '/templates/home.html',
      controller: 'MainCtrl'
    })

   .state('posts', {
   		resolve: {
		  post: ['$stateParams', 'posts', function($stateParams, posts) {
		    return posts.get($stateParams.id);
		  }]
		},
		  
		url: '/posts/{id}',
		templateUrl: '/templates/posts.html',
		controller: 'PostsCtrl'
	})

   .state('login', {
      url: '/login',
      templateUrl: '/templates/_login.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'Auth', function($state, Auth) {
        Auth.currentUser().then(function (){
          $state.go('home');
        })
      }]
    })

    .state('register', {
      url: '/register',
      templateUrl: '/templates/_register.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'Auth', function($state, Auth) {
        Auth.currentUser().then(function (){
          $state.go('home');
        })
      }]
    });

  $urlRouterProvider.otherwise('home');


}])

// .factory('posts', [function(){
//   var o = {
//     posts: [
//     		  {title: 'post 1', upvotes: 5},
// 				  {title: 'post 2', upvotes: 2},
// 				  {title: 'post 3', upvotes: 15},
// 				  {title: 'post 4', upvotes: 9},
// 				  {title: 'post 5', upvotes: 4}
//     ]
//   };
//   return o;
// }])

// .controller('MainCtrl', ['$scope','posts', function($scope, posts){
// 	$scope.posts = posts.posts;

// 	$scope.addPost = function(){
// 		if(!$scope.title || $scope.title === '') { return; }
// 	  $scope.posts.push({
// 	  	title: $scope.title,
// 	  	link: $scope.link,
// 	  	upvotes: 0,
// 		  comments: [
// 		    {author: 'Joe', body: 'Cool post!', upvotes: 0},
// 		    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
// 		  ]
// 	  });
// 	  $scope.title = '';
// 	  $scope.link = ''
// 	};

// 	$scope.incrementUpvotes = function(post){
// 		post.upvotes += 1
// 	}
// }])

// .controller('PostsCtrl', ['$scope','$stateParams','posts',function($scope, $stateParams, posts){
// 	$scope.post = posts.posts[$stateParams.id];

// 	$scope.addComment = function(){
// 	  if($scope.body === '') { return; }
// 	  $scope.post.comments.push({
// 	    body: $scope.body,
// 	    author: 'user',
// 	    upvotes: 0
// 	  });
// 	  $scope.body = '';
// 	};

// }])
