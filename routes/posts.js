var express = require('express');
var router = express.Router();
var post = require('../controllers/PostCtrl');

router.route('/')
	.get(post.list)
	.post(post.save);

router.route('/:id')
	.get(post.getById);

router.route('/:id/upvote')
	.put(post.upVote);

router.route('/:id/comments')
	.post(post.saveComment);


module.exports = router;
