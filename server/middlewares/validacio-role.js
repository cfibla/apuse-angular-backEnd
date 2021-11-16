const Usuari = require('../models/usuari');

const validacioADMIN = async(req, res, next) => {

    const uid = req.uid;

    try {
        const usuariDB = await Usuari.findById(uid);


        if (!usuariDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuari inexistent'
            });
        }

        if (usuariDB.role === 'ADMIN_ROLE' || usuariDB.role === 'SUPER_ROLE') {
            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'No teniu permissos per fer aquesta operació'
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Parli amb l'administrador",
            error: error
        });
    }


};

const validacioSUPER = async(req, res, next) => {

    const uid = req.uid;

    try {
        const usuariDB = await Usuari.findById(uid);


        if (!usuariDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuari inexistent'
            });
        }

        if (usuariDB.role === 'SUPER_ROLE') {
            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'No teniu permissos per fer aquesta operació'
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Parli amb l'administrador",
            error: error
        });
    }

};

const validacioPropia = async(req, res, next) => {

    const uid = req.uid;
    const id = req.params.id;

    try {
        const usuariDB = await Usuari.findById(uid);


        if (!usuariDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuari inexistent'
            });
        }

        if (usuariDB.role === 'SUPER_ROLE' || usuariDB.role === 'SUPER_ROLE' || uid === id) {
            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'No teniu permissos per fer aquesta operació'
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Parli amb l'administrador",
            error: error
        });
    }
};

module.exports = {
    validacioADMIN,
    validacioSUPER,
    validacioPropia
};