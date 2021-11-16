const { Schema, model } = require('mongoose');

//const schema = require ('./schema');
const usuari = require('./usuari');
//const schemaCentres = require('./centre');

//const schemaesp = require('./schema_usersEsp');
//const schemaee = require('./schema_usersEe');

//var Centre = mongoose.model('Centre',schemacentres, 'Centres');
//var User = mongoose.model('User', schema_users, 'Users');
//var UserEsp = mongoose.model('UserEsp', schemaesp,'UserEsps');
//var UserEe = mongoose.model('UserEe', schemaee, 'UserEes');



let alumneSchema = new Schema({
    nom: {
        type: String,
        required: true,
        uppercase: true
    },
    cognom1: {
        type: String,
        required: true,
        uppercase: true
    },
    cognom2: {
        type: String,
        uppercase: true
    },
    nivell: {
        type: String,
        required: true
    },
    classe: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    adresa: {
        type: String
    },
    repetidor: {
        type: Boolean,
        default: false
    },
    cursRepetit: String,
    dataNaixement: String,
    seguretatSoc: {
        type: String,
        uppercase: true
    },
    observacions: String,
    email: String,
    password: String,
    telefon1: String,
    telefon2: String,
    atencioDiversitat: {
        type: Boolean,
        default: false
    },
    atencioDiversitatSeguiment: {
        type: Boolean,
        default: false
    },
    serveisExternsSeguiment: {
        type: Boolean,
        default: false
    },
    aill: {
        type: Boolean,
        default: false
    },
    beca: {
        type: Boolean,
        default: false
    },
    serveisSocials: {
        type: Boolean,
        default: false
    },
    // Tipus de PI
    piCurricular: {
        type: Boolean,
        default: false
    },
    piMetodologic: {
        type: Boolean,
        default: false
    },
    piConductual: {
        type: Boolean,
        default: false
    },
    // Assignatures amb PI
    piCatala: {
        type: Boolean,
        default: false
    },
    piMates: {
        type: Boolean,
        default: false
    },
    piCastellano: {
        type: Boolean,
        default: false
    },
    piMedi: {
        type: Boolean,
        default: false
    },
    piEducacioFisica: {
        type: Boolean,
        default: false
    },
    piEducacioArtistica: {
        type: Boolean,
        default: false
    },
    materialDiferenciat: {
        type: Boolean,
        default: false
    },
    adequacioContingutsMates: {
        type: Boolean,
        default: false
    },
    adequacioContingutsCatala: {
        type: Boolean,
        default: false
    },
    adequacioContingutsCastella: {
        type: Boolean,
        default: false
    },
    adequacioContingutsMedi: {
        type: Boolean,
        default: false
    },
    fullDerivacio: {
        type: Boolean,
        default: false
    },
    fullDerivacioAutor: {
        type: String
    },
    fullDerivacioMotiu: {
        type: String
    },
    certificatDisminucio: {
        type: Boolean,
        default: false
    },
    percetatgeDisminucio: {
        type: String
    },
    valoracioEap: {
        type: Boolean,
        default: false
    },
    valoracioEapAny: {
        type: String
    },
    dictamen: {
        type: Boolean,
        default: false
    },
    motiuDictamen: {
        type: String
    },
    // Seguiment Serveis Externs
    seguimentEap: {
        type: Boolean,
        default: false
    },
    seguimentTsEap: {
        type: Boolean,
        default: false
    },
    seguimentCredag: {
        type: Boolean,
        default: false
    },
    seguimentCredv: {
        type: Boolean,
        default: false
    },
    seguimentCsmij: {
        type: Boolean,
        default: false
    },
    seguimentSeetdic: {
        type: Boolean,
        default: false
    },
    seguimentCdiap: {
        type: Boolean,
        default: false
    },
    //Seguiment mèdic
    seguimentPediatria: {
        type: Boolean,
        default: false
    },
    seguimentNeuropediatria: {
        type: Boolean,
        default: false
    },
    seguimentAltresEspecialitats: {
        type: String
    },
    atencioServeisPrivats: {
        type: String
    },
    estat: {
        type: Boolean,
        default: true
    },

    //SEGUIMENT
    segActuacions: [{ date: String, body: String }],
    segInformacioCAD: [{ date: String, body: String }],
    segAltresCoord: [{ date: String, body: String }],
    //REUNIONS PARES
    reunionsPares: [{
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
    //PROPIETARIS
    centre: {
        type: Schema.ObjectId,
        ref: 'Centre'
    },
    tutor: {
        required: true,
        type: Schema.ObjectId,
        ref: 'Usuari'
    },
    esp: {
        type: Schema.ObjectId,
        ref: 'UserEsp'
    },
    ee: {
        type: Schema.ObjectId,
        ref: 'UserEe'
    },
    //NOTES
    primer: {

        mates: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        cat: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        cast: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        mediNat: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        mediSoc: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        medi: {
            mitja_1t: Number,
            mitja_2t: Number,
            mitja_3t: Number,
            mitjaCurs: Number
        },

        musica: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        plastica: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        eAritstica: {
            mitja_1t: Number,
            mitja_2t: Number,
            mitja_3t: Number,
            mitjaCurs: Number
        },

        frances: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        angles: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        eValors: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        eFisica: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        proj: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        }
    },

    segon: {

        mates: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        cat: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        cast: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        mediNat: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        mediSoc: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        medi: {
            mitja_1t: Number,
            mitja_2t: Number,
            mitja_3t: Number,
            mitjaCurs: Number
        },

        musica: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        plastica: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        eAritstica: {
            mitja_1t: Number,
            mitja_2t: Number,
            mitja_3t: Number,
            mitjaCurs: Number
        },

        frances: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        angles: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        eValors: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        eFisica: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        proj: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        }
    },

    tercer: {

        mates: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        cat: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        cast: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        mediNat: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        mediSoc: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        medi: {
            mitja_1t: Number,
            mitja_2t: Number,
            mitja_3t: Number,
            mitjaCurs: Number
        },

        musica: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        plastica: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        eAritstica: {
            mitja_1t: Number,
            mitja_2t: Number,
            mitja_3t: Number,
            mitjaCurs: Number
        },

        frances: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        angles: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        eValors: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        eFisica: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        proj: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        }
    },

    quart: {

        mates: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        cat: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        cast: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        mediNat: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        mediSoc: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        medi: {
            mitja_1t: Number,
            mitja_2t: Number,
            mitja_3t: Number,
            mitjaCurs: Number
        },

        musica: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        plastica: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        eAritstica: {
            mitja_1t: Number,
            mitja_2t: Number,
            mitja_3t: Number,
            mitjaCurs: Number
        },

        frances: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        angles: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        eValors: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        eFisica: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        proj: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        }
    },

    cinque: {

        mates: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        cat: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        cast: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        mediNat: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        mediSoc: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        medi: {
            mitja_1t: Number,
            mitja_2t: Number,
            mitja_3t: Number,
            mitjaCurs: Number
        },

        musica: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        plastica: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        eAritstica: {
            mitja_1t: Number,
            mitja_2t: Number,
            mitja_3t: Number,
            mitjaCurs: Number
        },

        frances: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        angles: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        eValors: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        eFisica: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        proj: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        }
    },

    sise: {

        mates: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        cat: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        cast: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        mediNat: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        mediSoc: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        medi: {
            mitja_1t: Number,
            mitja_2t: Number,
            mitja_3t: Number,
            mitjaCurs: Number
        },

        musica: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        plastica: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        eAritstica: {
            mitja_1t: Number,
            mitja_2t: Number,
            mitja_3t: Number,
            mitjaCurs: Number
        },

        frances: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        angles: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        eValors: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        eFisica: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        },

        proj: {
            notes_1t: [Number],
            mitja_1t: Number,
            notes_2t: [Number],
            mitja_2t: Number,
            notes_3t: [Number],
            mitja_3t: Number,
            mitjaCurs: Number
        }
    }

});

alumneSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Alumne', alumneSchema);