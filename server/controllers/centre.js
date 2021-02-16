const { response } = require('express');
const Centre = require('../models/centre');

const getCentres = async(req, res = response) => {

    const centres = await Centre.find();

    res.json({
        ok: true,
        centres
    });

};

const crearCentre = async(req, res = response) => {
    // const url = 'https://analisi.transparenciacatalunya.cat/resource/e2ef-eiqj.json?codi_centre=17008237&any=2019'

    const centre = new Centre(req.body);

    try {

        const centreDB = await centre.save();

        res.json({
            ok: true,
            msg: "S'ha desat el centre correctament",
            centre: centreDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "No s'ha pogut desar el centre"
        });
    }
};

const editarCentre = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'putCentres'
    });
};

const eliminarCentre = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'deleteCentres'
    });
};


module.exports = {
    getCentres,
    crearCentre,
    editarCentre,
    eliminarCentre
};