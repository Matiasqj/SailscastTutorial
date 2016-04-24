/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypjs = require('bcryptjs');
module.exports = {
	'new':function(req,res){
		/*var olddate = new Date();
		var newdate = new Date(olddate.getTime()+60000);
		req.session.cookie.expires = newdate;
		req.session.authenticated = true;
		console.log(req.session);
		*/
		res.view('session/new');
	},

	create: function(req, res , next){

		if(!req.param('email') || !req.param('encryptedPassword')){
			var usernamepasswordrequired =[{name: 'usernamepasswordrequired', message: 'yo must enter username and password'}] 
				req.session.flash={
			err: errorpass
		}
		res.redirect('/session/new');
		return;
		}

		User.findOneByEmail(req.param('email'),  function foundUser(err,user){
			if(err) return next(err);
			//if not user is found
			if(!user){
				var noaccounterror=[{name: 'noaccount', message: 'The email adress'+req.param('email')+' is not found'}]
			req.session.flash={
				err:noaccounterror
			}
				res.redirect('/session/new');
				return;
			}
		
		//si no hay error compara el password con el guardado
		bcrypjs.compare(req.param('encryptedPassword'), user.encryptedPassword, function(err,valid){
			if(!valid){
				var errorcomp=[{name: 'errorcomp', message: 'password invalido'}]
				req.session.flash={
				err:errorcomp
			}
				res.redirect('/session/new');
				return;
			}
			//loguea al usuario
			req.session.authenticated=true;
			req.session.User= user;
			res.redirect('user/show/'+user.id);
		});

	});

	},
	destroy: function(req,res,next){
			req.session.destroy();
			res.redirect('/session/new');
	}


};

