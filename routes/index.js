module.exports=function(app){
	app.route('/').get(function(req,res,next){
		res.send('Bem vindo ao estudo com Mean.');
	});
};
