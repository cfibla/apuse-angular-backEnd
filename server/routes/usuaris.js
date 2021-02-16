/*
    -USUARIS-
    RUTA: '/api/usuaris'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validacioCamps } = require('../middlewares/validacio-camps');

const { getUsuaris, crearUsuari, editarUsuari, eliminarUsuari } = require('../controllers/usuari');
const { auth, adminRole, superRole } = require('../middlewares/autenticacio');
const { validacioJWT } = require('../middlewares/validacio-jwt');

const router = Router();

router.get('/', validacioJWT,
    // aqui van les validacions-> [auth, superRole],
    getUsuaris);

router.post('/',
    // aqui van les validacions-> [auth, superRole],
    [
        check('nom', 'El nom és obligatori').not().isEmpty(),
        check('cognom', 'El cognom és obligatori').not().isEmpty(),
        check('password', 'La contrasenya és obligatoria').not().isEmpty(),
        check('email', 'El correu electrònic és obligatori').isEmail(),
        validacioCamps
    ],
    crearUsuari);

router.put('/:id',
    // aqui van les validacions-> [auth, superRole],
    [
        validacioJWT,
        check('nom', 'El nom és obligatori').not().isEmpty(),
        check('cognom', 'El cognom és obligatori').not().isEmpty(),
        check('role', 'El role és obligatori').not().isEmpty(),
        check('email', 'El correu electrònic és obligatori').isEmail(),
        validacioCamps
    ],
    editarUsuari);

router.delete('/:id', validacioJWT,
    // aqui van les validacions-> [auth, superRole],
    eliminarUsuari);

module.exports = router;