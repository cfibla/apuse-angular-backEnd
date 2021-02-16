/*
    -CENTRES-
    RUTA: '/api/centres'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validacioCamps } = require('../middlewares/validacio-camps');

const { getCentres, crearCentre, editarCentre, eliminarCentre } = require('../controllers/centre');

const { validacioJWT } = require('../middlewares/validacio-jwt');

const router = Router();

router.get('/',
    // aqui van les validacions-> [auth, superRole],
    [
        validacioJWT
    ],
    getCentres);

router.post('/',
    // aqui van les validacions-> [auth, superRole],
    [
        check('codi', 'El codi és obligatori').not().isEmpty(),
        check('nom', 'El nom és obligatori').not().isEmpty(),
        check('email', 'El correu electrònic és obligatori').isEmail(),
        validacioCamps
    ],
    crearCentre);

router.put('/:id',
    // aqui van les validacions-> [auth, superRole],
    [

    ],
    editarCentre);

router.delete('/:id',
    // aqui van les validacions-> [auth, superRole],
    eliminarCentre);

module.exports = router;