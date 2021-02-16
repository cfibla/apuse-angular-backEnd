const { response } = require('express');

const Alumne = require('../models/alumne');
const Usuari = require('../models/usuari');
const Centre = require('../models/centre');
//
const { auth, adminRole, superRole } = require('../middlewares/autenticacio');
//

const getGlobal = async(req, res = response) => {
    const cerca = req.params.cerca;
    const regex = new RegExp(cerca, 'i');

    // Fa les 3 cerques alhora
    const [usuaris, alumnes, centres] = await Promise.all([
        Usuari.find({ $or: [{ nom: regex }, { cognom: regex }] }),
        Alumne.find({ $or: [{ nom: regex }, { cognom1: regex }] }),
        Centre.find({ nom: regex }),
    ]);

    res.json({
        ok: true,
        usuaris,
        alumnes,
        centres
    });
};

const getColeccio = async(req, res = response) => {
    const taula = req.params.taula;
    const cerca = req.params.cerca;
    const regex = new RegExp(cerca, 'i');

    let data;

    switch (taula) {
        case 'alumnes':
            data = await Alumne.find({ $or: [{ nom: regex }, { cognom1: regex }] })
                .populate('tutor', 'nom email')
                .populate('centre', 'nom email');
            break;

        case 'usuaris':
            data = await Usuari.find({ $or: [{ nom: regex }, { cognom: regex }] })
                .populate('centre', 'nom email');
            break;

        case 'centres':
            data = await Centre.find({ nom: regex });
            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'Taula de la DB no vàlida'
            });
    }

    res.json({
        ok: true,
        resultats: data
    });

};

module.exports = {
    getGlobal,
    getColeccio
};