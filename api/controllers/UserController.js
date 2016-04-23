/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new': function (req,res){
		//res locals dura por el tiempo de la vista
	
		res.view();
		

	},
	create: function(req,res,next){
		User.create(req.allParams(), function userCreated(err,user){
			if(err) {
				//req.session dura el tiempo de la sesion hasta que el browser cierra
				req.session.flash = { err:err}
				console.log(err);
			return res.redirect('/user/new');
			}
			//res.json(user);
			req.session.flash={};
			req.session.email = user.name;
			res.redirect('/user/show/'+user.id);
		});

	},
	show: function(req, res, next){
		User.findOne(req.param('id'), function foundUser(err,user){
			if(err) return next(err);
			if(!user) return next();
			res.view({user:user});
		});

	}


};

