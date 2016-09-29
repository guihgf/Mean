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

		console.log(req);

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

	return controller;
}



