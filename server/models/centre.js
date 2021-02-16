const { Schema, model } = require('mongoose');

// https://analisi.transparenciacatalunya.cat/resource/e2ef-eiqj.json?codi_centre=17008237&any=2019

let centreSchema = new Schema({
    codi: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    nom: {
        type: String,
        trim: true,
        required: true
    },
    telefon: {
        type: String,
        trim: true
    },
    adre_a: {
        type: String,
        trim: true
    },
    municipi: {
        type: String,
        trim: true
    },
    provincia: {
        type: String,
        trim: true
    },
    codi_postal: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    titularitat: {
        type: String,
        trim: true
    },
    client: {
        type: Boolean,
        default: false
    },
    password: {
        type: String
    }

});

centreSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});


module.exports = model('Centre', centreSchema);




// var mongoose = require ('mongoose');

// let Schema = mongoose.Schema;

// let centreSchema = new Schema({
// 	codi:{
// 		type: Number,
// 		unique: true,
// 		trim: true,
// 		required: [true, "El codi de centre és obligatori"]
// 	},
// 	password:{
// 		type: String
// 	},
// 	nom: String,
// 	telefon: Number,
// 	email: {
// 		type: String,
// 		unique: true,
// 		lowercase: true,
// 		trim: true,
// 		required: [true, "L'adreça electrònica és obligatòria"]
// 	},
// 	adreca: String,
// 	codiPostal: Number,
// 	poblacio: String,
// 	provincia: String

// });

// module.exports = mongoose.model('Centre', centreSchema);