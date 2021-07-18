/*
    -USUARIS-
    RUTA: '/api/canvi-centre'
*/

const { Router } = require('express');
// const { check } = require('express-validator');
// const { validacioCamps } = require('../middlewares/validacio-camps');
const { actualitzarCentre } = require('../controllers/actualitza-centre');
// const { auth, adminRole, superRole } = require('../middlewares/autenticacio');
const { validacioJWT } = require('../middlewares/validacio-jwt');
// const { actualitzaCentre } = require('../helpers/actualitzar-centre');

const router = Router();

router.put('/:id', [
    validacioJWT,
    // check('nom', 'El nom és obligatori').not().isEmpty(),
    // check('cognom', 'El cognom és obligatori').not().isEmpty(),
    // check('role', 'El role és obligatori').not().isEmpty(),
    // check('email', 'El correu electrònic és obligatori').isEmail(),
    // validacioCamps
], actualitzarCentre);

module.exports = router;