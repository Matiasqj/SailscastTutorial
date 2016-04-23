/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  //con schema solo guarda los atributos del modelo y no guarda los valores que no son del schema
  schema:true,
  attributes: {
  	name:{
  		type: 'string',
  		required:true

  	},
  	title:{
      type: 'string'
  	},
  	email:{
  		type: 'string',
  		email:true,
  		required:true,
  		unique:true
  	},
  	encryptedPassword:{
		type: 'string',
    required:true
  	},
 /*
toJSON: function(){
  var obj= this.toObject();
  delete obj.encryptedPassword;
  delete obj._csrf;
  return obj;

}*/
 }
};

