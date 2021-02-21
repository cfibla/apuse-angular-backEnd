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

    // {"curs":"2019/2020","any":"2019","codi_centre":"17008237","denominaci_completa":"Escola Montserrat Vayreda","codi_naturalesa":"1","nom_naturalesa":"Públic","codi_titularitat":"01","nom_titularitat":"Dep. Educació","adre_a":"rda. de Dalt, 27-31","codi_postal":"17480","tel_fon":"972 458 083","codi_delegaci":"0117","nom_delegaci":"Girona","codi_comarca":"02","nom_comarca":"Alt Empordà","codi_municipi_5":"17152","codi_municip_6":"171523","nom_municipi":"Roses","codi_districte_municipal":"00","codi_localitat":"08","nom_localitat":"Roses","coordenades_utm_x":"514843.165","coordenades_utm_y":"4679526.058","coordenades_geo_x":"3.179983728","coordenades_geo_y":"42.267799363","e_mail_centre":"b7008237@xtec.cat","einf2c":"EINF2C","epri":"EPRI","geocoded_column":{"latitude":"42.267799363","longitude":"3.179983728"}}
    // MODEL
    // codi: { required: true },
    // nom: { required: true },
    // email: { required: true },
    // telefon: {},
    // adre_a: {},
    // municipi: {},
    // provincia: {},
    // codi_postal: {},
    // titularitat: {},
    // client: {},
    // password: {}

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