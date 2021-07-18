const { response } = require('express');
const cloudinary = require('cloudinary').v2;
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const { actualitzarImatge } = require('../helpers/actualitzar-imatge');


const pujaArxiu = (req, res = response) => {

    const tipus = req.params.tipus;
    const id = req.params.id;

    const tipusValids = ['usuaris', 'alumnes'];

    // Validar tipus (usuaris - alumnes)
    if (!tipusValids.includes(tipus)) {
        return res.status(400).json({
            ok: false,
            msg: "La imatge ha de ser d'usuaris o d'alumnes"
        });
    }

    // Validar si hi ha arxiu
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: true,
            msg: "No s'ha pujat cap arxiu"
        });
    }

    // Processar la imatge
    const file = req.files.imatge;

    const nomTallat = file.name.split('.'); // imatge.meva.3.jpg
    const extensioArxiu = nomTallat[nomTallat.length - 1]; // Selecciona la darrera posició (l'extensió)

    // És una extensió vàlida?
    const extensionsValides = ['jpg', 'jpeg', 'gif', 'png'];

    if (!extensionsValides.includes(extensioArxiu)) {
        return res.status(400).json({
            ok: true,
            msg: "Si us plau, assegureu-vos que l'extensió de l'arxiu és .jpg, .jpeg, .png o .gif"
        });
    }

    // Generar el nom de l'arxiu
    const nomArxiu = `${uuidv4()}.${extensioArxiu}`;
    // Path per guardar la imatge

    const pathImatge = path.resolve(__dirname, `../uploads/${nomArxiu}`);

    // Use the mv() method to place the file somewhere on your server
    file.mv(pathImatge, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: "Error en moure la imatge"
            });
        } else {

            cloudinary.uploader.upload(pathImatge, { folder: tipus }, (err, dataImatge) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        ok: false,
                        msg: "Error en pujar la imatge",
                        err
                    });
                }

                actualitzarImatge(tipus, id, dataImatge.public_id);
                fs.unlinkSync(pathImatge);

                res.json({
                    ok: true,
                    msg: "La imatge s'ha pujat correctament",
                    dataImatge
                });
            });
        }

    });


};

const getArxiu = (req, res = response) => {

    // Provisional -- POTSER NO ÉS NECESSARI

    console.log('getArxiu');

    const tipus = req.params.tipus;
    const imatge = req.params.imatge;

    const pathImatge = cloudinary_URL + `${tipus}/${imatge}`;

    // console.log('GET ARXIU:', pathImatge);

    res.json({
        ok: true,
        msg: "URL de la imatge",
        pathImatge
    });

    // URL No-imatge
    // https://res.cloudinary.com/appescola-img/image/upload/v1617550969/no-imatge_nwdrzz.jpg
};

module.exports = {
    pujaArxiu,
    getArxiu
};