// rutas para autenticar
const express = require('express');
const router = express.Router();
const { authJWT } = require('../middleware/auth');
const {autenticarUsuario,usuarioAutenticado} = require('../controllers/authController');

//Iniciar session
//api/auth
router.post('/',
    autenticarUsuario
);

router.get('/',
    authJWT,
    usuarioAutenticado
);

module.exports = router;