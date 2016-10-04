var jwt = require('express-jwt');
//middleware
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

module.exports=function(app){

	var post=app.controllers.PostCtrl;

	app.route('/')
	.get(function(req,res){
		res.render('index.ejs');
	});
	
	
	app.route('/posts')
	.get(post.list)
	.post(auth,post.save);

	app.route('/posts/:id')
		.get(post.getById);

	app.route('/posts/:id/upvote')
		.put(auth,post.upVote);

	app.route('/posts/:id/comments')
		.post(auth,post.saveComment);

	app.route('/posts/:id/comments/:id_comment/upvote')
		.put(auth,post.upVoteComment);

};

