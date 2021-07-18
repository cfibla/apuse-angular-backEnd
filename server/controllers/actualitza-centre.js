const { response } = require('express');
const { actualitzaCentre } = require('../helpers/actualitzar-centre');

const actualitzarCentre = async(req, res = response) => {

    const uidUsuari = req.params.id;
    const uidCentre = req.body.centre.uid;

    const usuariActualitzat = await actualitzaCentre(uidUsuari, uidCentre);

    res.json({
        ok: true,
        msg: 'BACKEND: usuari actualitzat',
        uidCentre,
        usuariActualitzat
    });
};

module.exports = {
    actualitzarCentre
};