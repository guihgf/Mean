var request = require('request');
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

exports.list = function(req, res, next) {
	Post.find(function(err, posts){
		if(err){ return next(err); }

		res.json(posts);
	});
};

exports.save = function(req, res, next) {
	console.log(req.body);
	var post = new Post(req.body);

	post.save(function(err, post){
		if(err){ return next(err); }

		res.json(post);
	});
};

exports.getById = function(req,res,next){

	var _id = req.params.id;
	Post.findById(_id).exec()
	.then(
		function(post) {
			if (!post) 
				return res.status(404).send('Post não encontrado');
			res.json(post)   
		}, 
		function(erro) {
			console.log(erro);
			res.status(404).json(erro)
		}
		); 
};

exports.upVote = function(req,res,next){
	var _id = req.params.id;

	Post.findById(_id).exec()
	.then(
		function(post) {
			if (!post) 
				return res.status(404).send('Post não encontrado');
			
			post.upvote(function(err, post){
			    if (err) { return next(err); }

			    res.json(post);
		    });
		}, 
		function(erro) {
			console.log(erro);
			res.status(404).json(erro)
		}
	); 
}

exports.saveComment= function(req,res,next){
	var _id=req.params.id;

	var post=Post.findById(_id).exec();

	if(post){
		var comment = new Comment(req.body);
		comment.post=post;

		comment.save(function(err, comment){
	    	if(err){ return next(err); }

	   		post.comments.push(comment);
	    	
	    	post.save(function(err, post) {
	      	if(err){ return next(err); }

	      		res.json(comment);
	    	});

	  	});

	}
	else{
		res.status(404).send('Post não encontrado');
	}
}

