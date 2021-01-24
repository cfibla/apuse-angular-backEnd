const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { object } = require('underscore');

//const schemaCentres = require('./centre');
//const Centre = mongoose.model('Centre',schemaCentres, 'Centres');

//const schemaHoraris = require('./schema_horari');
//const Horari = mongoose.model('Horari',schemaHoraris, 'Horaris');

let rolesValidos = {
    values: ['SUPER_ROLE', 'ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no és un rol vàlid'
};

//BORRAR: codiescola, mestre, admin, escola

let usuariSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: [true, "L'adreça electrònica és obligatòria"]
    },
    password: {
        type: String,
        required: [true, "La contrasenya és obligatoria"]
    },
    nom: {
        type: String,
        required: [true, "El nom és obligatori"]
    },
    cognom: {
        type: String,
        required: [true, "El cognom és obligatori"]
    },
    img: {
        type: String
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    google: {
        type: Boolean,
        default: false
    },
    estat: {
        type: Boolean,
        default: true
    },
    codiEscola: Number,
    mestre: String,
    curs: String,
    lastLogin: String,
    admin: String,

    //PROPIETARIS
    centre: {
        type: Schema.ObjectId,
        ref: 'Centre'
    },
    horari: {
        type: Schema.ObjectId,
        ref: 'Horari'
    },
    escola: {
        type: Number,
        ref: 'Escola'
    }
});

// Amaga password
usuariSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;

};

// Validació e-mail únic
usuariSchema.plugin(uniqueValidator, { message: 'Ja existeix un/a usuari/a amb aquest {PATH}' });
usuariSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});


module.exports = model('Usuari', usuariSchema);