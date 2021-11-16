/*
    -CENTRES-
    RUTA: '/api/centres'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validacioCamps } = require('../middlewares/validacio-camps');

const { getCentres, crearCentre, editarCentre, eliminarCentre } = require('../controllers/centre');

const { validacioJWT } = require('../middlewares/validacio-jwt');
const { validacioADMIN, validacioSUPER } = require('../middlewares/validacio-role');

const router = Router();

router.get('/',
    // aqui van les validacions-> [auth, superRole],
    [
        validacioJWT,
        validacioSUPER
    ],
    getCentres);

router.post('/',
    // aqui van les validacions-> [auth, superRole],
    [
        // validacioJWT,
        check('codi', 'El codi és obligatori').not().isEmpty(),
        check('nom', 'El nom és obligatori').not().isEmpty(),
        check('email', 'El correu electrònic és obligatori').isEmail(),
        validacioCamps
    ],
    crearCentre);

router.put('/:id',
    // aqui van les validacions-> [auth, superRole],
    [
        validacioJWT,
        validacioSUPER
    ],
    editarCentre);

router.delete('/:id',
    // aqui van les validacions-> [auth, superRole],
    [
        validacioJWT,
        validacioSUPER
    ],
    eliminarCentre);

module.exports = router;