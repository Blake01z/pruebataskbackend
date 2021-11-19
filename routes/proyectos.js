const express = require('express');
const router = express.Router();
const {crearProyecto,obtenerProyectos,actualizarProyecto,eliminarProyecto} = require('../controllers/proyectoController');
const { authJWT } = require('../middleware/auth');
const {check} = require('express-validator');

//crea proyectos
// api/proyectos
router.post('/',
    authJWT,[
        check('nombre','El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    crearProyecto
);

//obtener todos los proyectos
router.get('/',
    authJWT,
    obtenerProyectos
);

//actualizar proyecto via id
router.put('/:id',
    authJWT,
    [
        check('nombre','El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    actualizarProyecto
);

//Eliminar un proyecto
router.delete('/:id',
    authJWT,
    eliminarProyecto
)
 

module.exports = router;