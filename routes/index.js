var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
	res.send('Bem vindo ao estudo com Mean.');
});

module.exports = router;
