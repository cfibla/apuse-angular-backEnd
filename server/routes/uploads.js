/*
    PUJA IMGs
    RUTA: '/api/uploads'
*/

const { Router } = require('express');
const fileUpload = require('express-fileupload');

const { validacioJWT } = require('../middlewares/validacio-jwt');
const { pujaArxiu, getArxiu } = require('../controllers/uploads');

const router = Router();

router.use(fileUpload());

router.put('/:tipus/:id', validacioJWT, pujaArxiu);
router.get('/:tipus/:imatge', validacioJWT, getArxiu);

module.exports = router;