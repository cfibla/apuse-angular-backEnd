var mongoose = require ('mongoose');

let Schema = mongoose.Schema;

let centreSchema = new Schema({
	codi:{
		type: Number,
		unique: true,
		trim: true,
		required: [true, "El codi de centre és obligatori"]
	},
	password:{
		type: String
	},
	nom: String,
	telefon: Number,
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		required: [true, "L'adreça electrònica és obligatòria"]
	},
	adreca: String,
	codiPostal: Number,
	poblacio: String,
	provincia: String

});

module.exports = mongoose.model('Centre', centreSchema);