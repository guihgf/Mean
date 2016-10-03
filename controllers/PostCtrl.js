module.exports = function (app) {

	var Post=app.models.Posts;
	var Comment=app.models.Comments;

	var controller={};

	controller.list = function(req, res, next) {
		Post.find(function(err, posts){
			if(err){ return next(err); }

			return res.json(posts);
		});
	};

	controller.save = function(req, res, next) {
		var post = new Post(req.body);

		post.author=req.payload.username

		post.save(function(err, post){
			if(err){ return next(err); }

			return res.json(post);
		});
	};

	controller.getById = function(req,res,next){

		var _id = req.params.id;

		Post.findById(_id).exec()
		.then(
			function(post) {
				if (!post) 
					return res.status(404).send('Post não encontrado');

				post.populate('comments', function(err, post) {
				    if (err) { return next(err); }

				    return res.json(post);
			  	});
			}, 
			function(erro) {
				console.log(erro);
				return res.status(404).json(erro)
			}
		); 
	};

	controller.upVote = function(req,res,next){
		var _id = req.params.id;

		Post.findById(_id).exec()
		.then(
			function(post) {
				if (!post) 
					return res.status(404).send('Post não encontrado');
				
				post.upvote(function(err, post){
					if (err) { return next(err); }

					return res.json(post);
				});
			}, 
			function(erro) {
				console.log(erro);
				res.status(404).json(erro)
			}
			); 
	}

	controller.saveComment= function(req,res,next){
		var _id=req.params.id;

		Post.findById(_id).exec()
		.then(
			function(post) {
				if (!post) 
					return res.status(404).send('Post não encontrado');

				var comment = new Comment(req.body);
				comment.author = req.payload.username;
				comment.post=post;

				comment.save(function(err, comment){
					if(err){ return next(err); }

					post.comments.push(comment);

					post.save(function(err, post) {
						if(err){ return next(err); }

						return res.json(comment);
					});

				});  
			}, 
			function(erro) {
				console.log(erro);
				return res.status(404).json(erro)
			}
		); 
	}

	controller.upVoteComment = function(req,res,next){
		var _id_post = req.params.id;
		var _id_comment = req.params.id_comment;

		Comment.findOne({ 'post': _id_post,'_id':_id_comment}).exec()
		.then(
			function(comment) {
				if (!comment) 
					return res.status(404).send('Comentario não encontrado');
				
				comment.upvote(function(err, comment){
					if (err) { return next(err); }

					return res.json(comment);
				});
			}, 
			function(erro) {
				console.log(erro);
				res.status(404).json(erro)
			}
		); 
	}
	return controller;
}



