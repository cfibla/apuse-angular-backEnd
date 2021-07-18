const { response } = require('express');
const brcrypt = require('bcryptjs');

const Usuari = require('../models/usuari');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuariDB = await Usuari.findOne({ email }).populate('centre');
        console.log('BACKEND:', usuariDB);

        if (!usuariDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Les dades són incorrectes',
                email,
                password
            });
        }

        const passwordValid = brcrypt.compareSync(password, usuariDB.password);

        if (!passwordValid) {
            return res.status(404).json({
                ok: false,
                msg: 'Les dades són incorrectes'
            });
        }
        const token = await generarJWT(usuariDB.id);

        res.json({
            ok: true,
            msg: 'Login correcte',
            usuariDB,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'No es pot iniciar la sessió'
        });
    }
};

const renovaToken = async(req, res = response) => {

    const uid = req.uid;

    const token = await generarJWT(uid);
    const usuari = await Usuari.findById(uid).populate('centre');
    console.log('RENOVA TOKEN:', usuari);

    res.json({
        ok: true,
        token,
        usuari
    });

};

module.exports = {
    login,
    renovaToken
};