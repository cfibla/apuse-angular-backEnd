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

    // Comprova si existeix el CENTRE

    const codiCentre = req.body.codi;

    const existeix = await Centre.findOne({ codi: codiCentre });
    console.log(existeix);

    if (existeix) {
        return res.json({
            centre: existeix
        });
    }

    // Sinó existeix, desa el centre

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

const editarCentre = async(req, res = response) => {

    const id = req.params.id;

    try {

        const centre = await Centre.findById(id);

        if (!centre) {
            return res.status(404).json({
                ok: false,
                msg: "No es troba el centre"
            });
        }

        const canvisCentre = {
            ...req.body
        };

        const centreActualitzat = await Centre.findByIdAndUpdate(id, canvisCentre, { new: true });


        res.json({
            ok: true,
            centreActualitzat
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "No ha estat possible actualitzar el centre"
        });
    }

};

const eliminarCentre = async(req, res = response) => {
    const id = req.params.id;

    try {

        const centre = await Centre.findById(id);

        if (!centre) {
            return res.status(404).json({
                ok: false,
                msg: "No es troba el centre"
            });
        }

        await Centre.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: "Centre Eliminat"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "No ha estat possible actualitzar el centre"
        });
    }

};


module.exports = {
    getCentres,
    crearCentre,
    editarCentre,
    eliminarCentre
};