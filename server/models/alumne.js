const mongoose = require ('mongoose');

//const schema = require ('./schema');
const usuari = require ('./usuari');
//const schemaCentres = require('./centre');

//const schemaesp = require('./schema_usersEsp');
//const schemaee = require('./schema_usersEe');

//var Centre = mongoose.model('Centre',schemacentres, 'Centres');
//var User = mongoose.model('User', schema_users, 'Users');
//var UserEsp = mongoose.model('UserEsp', schemaesp,'UserEsps');
//var UserEe = mongoose.model('UserEe', schemaee, 'UserEes');

/*

CAL AFEGIR:

repetidor = body['radios.0'];
aill = body['checks.2'];
servSoc = body['checks.29'];

*/

let Schema = mongoose.Schema;

let alumneSchema = new Schema ({
	nomAlumne: {
		type: String,
		required: [true, "El nom de l'alumne és obligatori"],
		uppercase: true
	},
	cognomAlumne1: {
		type: String,
		required: [true, "El cognom de l'alumne és obligatori"],
		uppercase: true
	},
	cognomAlumne2: {
		type: String,
		uppercase: true
	},
	dataNaixement: {
		type: Date
	},
	seguretatSoc: {
		type: String,
		uppercase: true
	},
	observacions: String,
	mailAlum: String,
	passwordAl: String,
	telefon: String,
	codiEscola: Number,
	eeUsee: Boolean,
	curs: {
		type: String,
		required: [true, "El curs de l'alumne és obligatori"],
		uppercase: true
	},
	estat: {
		type: Boolean,
		default: true
	},
//REUNIONS PARES
	reunionsPares:[{
		curs: String,
		date: String,
		convocada: String,
		assistencia: String,
		body: String,
		conclusions: String,
		composicio: String,
		creat: String,
		userMail: String,
		dataIso: Date
	}],
//ASSISTÈNCIA
	assist: [{
		date: String,
		mati: String,
		tarda: String,
		justificant: String,
		dataIso: Date
	}],
//MENJADOR
	menjador: [{
		menu: String,
		dataMen: String,
		dataIsoMen: Date
	}],
//CHECKS & RADIOS
	checks:[Boolean],
	radios:[Boolean],
//ATENCIÓ DIVERSITAT
	altresEsp: String,
	atServPrivats: String,
	percentDim: String,
	motiuDic: String,
	anyVal: String,
	derivacio: String,
	motiuDer: String,
//SEGUIMENT
	segActuacions: [{ date: String, body: String }],
	segInformacioCAD: [{ date: String, body: String }],
	segAltresCoord: [{ date: String, body: String }],
//PROPIETARIS
	centre: {
		type: mongoose.Schema.ObjectId,
		ref: 'Centre'
	},
	tutor: {
		type: mongoose.Schema.ObjectId,
		ref: 'Usuari'
	},
	esp: {
		type: mongoose.Schema.ObjectId,
		ref: 'UserEsp'
	},
	ee: {
		type: mongoose.Schema.ObjectId,
		ref: 'UserEe'
	},
//NOTES
	primer:{
		mates:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number
		},

		cat:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number			
		},

		cast:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number					
		},

		medi:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		musica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		plastica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		frances:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		angles:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		eValors:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		eFisica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		proj:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		}
	},

	segon:{
		mates:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number
		},

		cat:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number			
		},

		cast:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number					
		},

		medi:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		musica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		plastica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		frances:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		angles:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		eValors:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		eFisica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		proj:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		}
	},

	tercer:{
		mates:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number
		},

		cat:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number			
		},

		cast:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number					
		},

		medi:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		musica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		plastica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		frances:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		angles:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		eValors:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		eFisica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		proj:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		}
	},

	quart:{
		mates:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number
		},

		cat:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number			
		},

		cast:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number					
		},

		medi:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		musica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		plastica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		frances:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		angles:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		eValors:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		eFisica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		proj:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		}
	},

	cinque:{
		mates:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number
		},

		cat:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number			
		},

		cast:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number					
		},

		medi:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		musica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		plastica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		frances:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		angles:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		eValors:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		eFisica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		proj:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		}
	},

	sise:{
		mates:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number
		},

		cat:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number			
		},

		cast:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number					
		},

		medi:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		musica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		plastica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		frances:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		angles:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		eValors:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		eFisica:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		},

		proj:{
			notes_1t:[Number],
			mitja_1t: Number,
			notes_2t:[Number],
			mitja_2t: Number,
			notes_3t:[Number],
			mitja_3t: Number,
			mitjaCurs: Number		
		}
	}

})

module.exports = mongoose.model('Alumne', alumneSchema);