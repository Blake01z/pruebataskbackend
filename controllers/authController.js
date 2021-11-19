const Usuario = require("../models/Usuario");
const bcryptjs = require ('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

const autenticarUsuario = async (req,res) =>{

    // revisar si hay errores
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errores: errors.array()})
    }

    //extraer email y password
    const {email, password} = req.body;

    try {
        //revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({msg:'El usuario no existe'});
        }

        //Revisar el password
        const passCorrecto = await bcryptjs.compare(password,usuario.password);
        if(!passCorrecto){
            return res.status(400).json({msg:'El password es incorrecto'});
        }
        
        //Si todo es correcto crear JWT
        //Crear y firmar eñ JWT
        const payload = {
            usuario:{
                id: usuario.id
            }
        };
        //firmar el token JWT
        jwt.sign(payload,process.env.SECRETA,{
            expiresIn: 3600 // 1hora
        }, (error,token)=>{
            if(error) throw error;

            //Mensaje de confirmacion
            res.json({token})
        });

    } catch (error) {
        console.log(error)
    }

}

//obtine que usuario esta autenticada
const usuarioAutenticado = async (req, res) =>{
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({usuario})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Hubo un error'});
    }
}


module.exports = {
    autenticarUsuario,
    usuarioAutenticado
}