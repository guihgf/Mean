module.exports=function(app){

	var post=app.controllers.PostCtrl;
	
	app.route('/posts')
	.get(post.list)
	.post(post.save);

	app.route('/posts/:id')
		.get(post.getById);

	app.route('/posts/:id/upvote')
		.put(post.upVote);

	app.route('/posts/:id/comments')
		.post(post.saveComment);

};

