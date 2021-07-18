const cloudinary = require('cloudinary').v2;

const Usuari = require('../models/usuari');
const Alumne = require('../models/alumne');



const actualitzarImatge = async(tipus, id, nomArxiu) => {


    switch (tipus) {
        case 'usuaris':

            const usuari = await Usuari.findById(id);
            if (!usuari) {
                return false;
            }

            if (usuari.img) {
                cloudinary.uploader.destroy(usuari.img, (err, res) => {
                    console.log("S'ha borrat?", res);
                });
            }
            usuari.img = nomArxiu;
            await usuari.save();
            return true;

        case 'alumnes':
            const alumne = await Alumne.findById(id);
            if (!alumne) {
                return false;
            }

            if (alumne.img) {
                cloudinary.uploader.destroy(alumne.img, (err, res) => {
                    console.log("S'ha borrat?", res);
                });
            }
            alumne.img = nomArxiu;
            await alumne.save();
            return true;


        default:
            break;
    }


    console.log('actualitzar Imatge');
};

module.exports = {
    actualitzarImatge
};