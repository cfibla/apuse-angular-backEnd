/*
    -ALUMNES-
    RUTA: '/api/alumnes'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validacioCamps } = require('../middlewares/validacio-camps');
const { validacioJWT } = require('../middlewares/validacio-jwt');

const { getAlumnes, crearAlumne, editarAlumne, eliminarAlumne } = require('../controllers/alumne');

const router = Router();

// CAL CREAR CONTROLLERS OK
router.get('/',
    // aqui van les validacions-> [auth, superRole],
    [
        validacioJWT,
    ],
    getAlumnes);

router.post('/',
    // aqui van les validacions-> [auth, superRole],
    [
        validacioJWT,
        check('nom', 'El nom és obligatori').not().isEmpty(),
        check('cognom1', 'El cognom és obligatori').not().isEmpty(),
        check('nivell', 'El curs és obligatori').not().isEmpty(),
        check('classe', 'El grup és obligatori').not().isEmpty(),
        // check('tutor', 'La ID del tutor no és correcta').isMongoId(),
        // check('tutor', 'El tutor és obligatori').not().isEmpty(),
        validacioCamps
    ],
    crearAlumne);

router.put('/:id',
    // aqui van les validacions-> [auth, superRole],
    [
        validacioJWT,
        check('nom', 'El nom és obligatori').not().isEmpty(),
        check('cognom1', 'El cognom és obligatori').not().isEmpty(),
        validacioCamps
    ],
    editarAlumne);

router.delete('/:id',
    validacioJWT,
    // aqui van les validacions-> [auth, superRole],
    eliminarAlumne);

module.exports = router;