// rutas para crear usuarios
const express = require('express');
const router = express.Router();
const { crearUsuario } = require('../controllers/usuarioController');
const {check} = require('express-validator');

//Crea un usuario 
//api/usuarios
router.post('/',
    [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El email no es valido').isEmail(),
    check('password','El password debe ser minimo de 6 caracteres').isLength({min: 6}),
    ], 
    crearUsuario
);

module.exports = router;