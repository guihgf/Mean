var request = require('request');
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

exports.list = function(req, res, next) {
	Post.find(function(err, posts){
		if(err){ return next(err); }

		res.json(posts);
	});
};

exports.save = function(req, res, next) {
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
