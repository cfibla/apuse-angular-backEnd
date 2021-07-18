const Usuari = require('../models/usuari');


const actualitzaCentre = async(id, centre) => {

    const usuari = await Usuari.findById(id);
    if (!usuari) {
        return false;
    }

    console.log('actualitzar Centre');
    usuari.centre = centre;
    await usuari.save();
    return true;

};

module.exports = {
    actualitzaCentre
};