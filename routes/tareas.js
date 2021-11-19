const express = require('express');
const router = express.Router();
const {crearTarea,obtenerTareas,actualizarTarea,eliminarTarea} = require('../controllers/tareaController');
const { authJWT } = require('../middleware/auth');
const {check} = require('express-validator');

//crear un nueva tarea
// api/ tareas
router.post('/',
    authJWT,
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('proyecto','El proyecto es obligatorio').not().isEmpty(), 
    ],  
    crearTarea
);

//Obtener tareas por proyecto
router.get('/',
    authJWT,
    obtenerTareas
);

//actualizar una tarea
router.put('/:id',
    authJWT,
    actualizarTarea
)

//Eliminar una tarea
router.delete('/:id',
    authJWT,
    eliminarTarea
)

module.exports = router;
