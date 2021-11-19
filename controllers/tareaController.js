const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const {validationResult} = require('express-validator');


//crea una nueva tarea
const crearTarea = async (req,res) =>{
    //revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()});
    }

    
    try {
        //Extraer el proyecto y comprobar si existe
        const {proyecto} = req.body

        const exiteProyecto = await Proyecto.findById(proyecto);
        if(!exiteProyecto){
            return res.status(404).json({msg:'Proyecto no encontrado'});
        }

        //revisar si el proyecto actual pertenece al usuario autenticado
        //verificar el creador del proyecto
        if(exiteProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg:'No autorizado'});
        }

        //Creamos la tare
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({tarea});


    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Hubo un error'})
    }

}

//Obtiene las tareas por proeycto
const obtenerTareas = async (req,res) => {
    
    try {
        
        //Extraemos el proyecto
        //Extraer el proyecto y comprobar si existe
        const {proyecto} = req.query

        const exiteProyecto = await Proyecto.findById(proyecto);
        if(!exiteProyecto){
            return res.status(404).json({msg:'Proyecto no encontrado'});
        }

        //revisar si el proyecto actual pertenece al usuario autenticado
        //verificar el creador del proyecto
        if(exiteProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg:'No autorizado'});
        }   

        //Obtener las tareas por proyecto
        const tareas = await Tarea.find({proyecto});
        res.json({tareas});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

const actualizarTarea = async (req,res) =>{
    try {

        //Extraemos el proyecto
        //Extraer el proyecto y comprobar si existe
        const {proyecto,nombre,estado} = req.body

        //si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);

        if(!tarea){
            return res.status(404).json({msg: 'No existe esa tarea'});
        }


        //extraer proyecto
        const exiteProyecto = await Proyecto.findById(proyecto);

        //revisar si el proyecto actual pertenece al usuario autenticado
        //verificar el creador del proyecto
        if(exiteProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg:'No autorizado'});
        }
        
        //crear un objeto con la nueva informacion
        const nuevaTarea = {};
        nuevaTarea.nombre = nombre;
        nuevaTarea.estado = estado;
        

        //Guardar la tarea
        tarea = await Tarea.findByIdAndUpdate({_id: req.params.id}, nuevaTarea, {new:true});
        res.json({tarea})


    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error');

    }
}

// eliminar un tarea por id
const eliminarTarea = async (req, res) =>{

    try {

        //Extraemos el proyecto
        //Extraer el proyecto y comprobar si existe
        const {proyecto} = req.query;

        //si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);

        if(!tarea){
            return res.status(404).json({msg: 'No existe esa tarea'});
        }


        //extraer proyecto
        const exiteProyecto = await Proyecto.findById(proyecto);

        //revisar si el proyecto actual pertenece al usuario autenticado
        //verificar el creador del proyecto
        if(exiteProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg:'No autorizado'});
        }
        
        //Eliminar 
        await Tarea.findByIdAndRemove({_id: req.params.id});
        res.json({msg:'Tarea eliminada'});

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error');

    }

}


module.exports = {
    crearTarea,
    obtenerTareas,
    actualizarTarea,
    eliminarTarea
}