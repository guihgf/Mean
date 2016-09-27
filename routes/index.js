var express = require('express');
var router = express.Router();
var post = require('../controllers/PostCtrl');

router.route('/posts')
	.get(post.list)
	.post(post.save);

router.route('/posts/:id')
	.get(post.getById);


module.exports = router;
