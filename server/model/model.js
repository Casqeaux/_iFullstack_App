const mongoose = require('mongoose');

var schema = new mongoose.Schema({
	
	photo_url: {
		type: String,

	},

	first_name: {
		type: String,
		required: true,
	},

	last_name: {
		type: String,
		required: true,
	},

	email: {
		type: String,
		required: true,
		unique: true
	},

	hobbies: {
		type: String,
		required: true,
	},

	country: {
		type: String,
		required: true,
	},


})

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;