/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new':function(req,res){
		var olddate = new Date();
		var newdate = new Date(olddate.getTime()+60000);
		req.session.cookie.expires = newdate;
		req.session.authenticated = true;
		console.log(req.session);
		res.view('session/new');
	},


};

