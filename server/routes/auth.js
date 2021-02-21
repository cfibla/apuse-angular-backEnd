/*
    RUTA: '/api/login'
*/

const { Router } = require('express');
const { login, renovaToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validacioCamps } = require('../middlewares/validacio-camps');
const { validacioJWT } = require('../middlewares/validacio-jwt');

const router = Router();

// const { auth, adminRole, superRole } = require('../middlewares/autenticacio');

router.post('/', [ // aqui van les validacions-> [auth, superRole],
        check('email', "L'email no té el format correcte").isEmail(),
        check('password', "La contrasenya és obligatòria").not().isEmpty(),
        validacioCamps

    ],
    login);

router.get('/nouToken', validacioJWT, renovaToken);

module.exports = router;