// const { object } = require('underscore');

// const uniqueValidator = require('mongoose-unique-validator');
//const schemaCentres = require('./centre');
//const Centre = mongoose.model('Centre',schemaCentres, 'Centres');

//const schemaHoraris = require('./schema_horari');
//const Horari = mongoose.model('Horari',schemaHoraris, 'Horaris');


const { Schema, model } = require('mongoose');


let rolesValidos = {
    values: ['SUPER_ROLE', 'ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no és un rol vàlid'
};

// valors vàlids a: mestre

let usuariSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nom: {
        type: String,
        required: true
    },
    cognom: {
        type: String,
        required: true
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
    mestre: {
        type: String,
        required: true
    },
    nivell: {
        type: String,
        required: true
    },
    classe: {
        type: String,
        required: true
    },
    lastLogin: String,

    //PROPIETARIS
    centre: {
        type: Schema.Types.ObjectId,
        ref: 'Centre'
    },
    horari: {
        type: Schema.Types.ObjectId,
        ref: 'Horari'
    }
});

// Amaga password
// usuariSchema.methods.toJSON = function() {

//     let user = this;
//     let userObject = user.toObject();
//     delete userObject.password;

//     return userObject;

// };

// Validació e-mail únic
// usuariSchema.plugin(uniqueValidator, { message: 'Ja existeix un/a usuari/a amb aquest {PATH}' });
usuariSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});


module.exports = model('Usuari', usuariSchema);