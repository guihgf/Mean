var mongoose = require('mongoose');

module.exports = function() {
	var CommentSchema = new mongoose.Schema({
		body: String,
		author: String,
		upvotes: {type: Number, default: 0},
		post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
	});

	CommentSchema.methods.upvote=function(cb){
		this.upvotes+=1;
		this.save(cb);
	};


	return mongoose.model('Comment', CommentSchema);
}
