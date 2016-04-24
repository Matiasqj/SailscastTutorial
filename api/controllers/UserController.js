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
			req.session.authenticated=true;
			req.session.User=user;
			res.redirect('/user/show/'+user.id);
		});

	},
	show: function(req, res, next){
		User.findOne(req.param('id'), function foundUser(err,user){

			if(err) return next(err);
			if(!user) return next();
			res.view({user:user});
		});

	},
	//vista de todos los usuarios
	view: function(req,res,next){
		User.find(function foundUsers(err,users){
			//console.log(new Date());
			//console.log(req.session.authenticated);
			if(err) return next(err);
			res.view({users:users});
		});

	},
	//dos partes para editar
	//la primera es cargar la accion edit cuando se envia el submit
	edit: function(req,res,next){
		User.findOne(req.param('id'), function foundUSer(err,user){
			if(err) return next(err);
			if(!user) return next();
			res.view({
				user:user
			});

		});
	},
	//la segunda es realizar el update
	update: function(req,res,next){
		User.update(req.param('id'), req.allParams(), function userUPdated(err){
			if(err){
				return res.redirect('/user/edit/'+ req.param('id'));
			}
			res.redirect('user/show/'+req.param('id'));
		});
	},
	//delete: function(req,res,next){},
	destroy: function(req,res,next){
		User.findOne(req.param('id'),function foundUser(err,user){
			if(err) return next(err);
			if(!user) return next('User doesnt exist');
			User.destroy(req.param('id'), function userDestroyed(err){
				if(err) return next(err);
			});
			res.redirect('/user/view/');
		});

	}



};

