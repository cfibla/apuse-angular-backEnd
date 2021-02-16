/*
    -ALUMNES-
    RUTA: '/api/todo/:busqueda'
*/

const { Router } = require('express');
const { validacioJWT } = require('../middlewares/validacio-jwt');

const { getGlobal, getColeccio } = require('../controllers/cerca');

const router = Router();

// Cerca global
router.get('/:cerca',
    // aqui van les validacions-> [auth, superRole],
    [
        validacioJWT,
    ],
    getGlobal);

// Cerca per col·lecció
router.get('/coleccio/:taula/:cerca',
    // aqui van les validacions-> [auth, superRole],
    [
        validacioJWT,
    ],
    getColeccio);

module.exports = router;