const mongoose = require('mongoose');
require('dotenv').config({path: '.env'});
require('colors');

const conectarDB = async () =>{
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology:true,
        })
        console.log('DB conectada'.bgCyan);
    } catch (error) {
        console.log(error);
        throw new Error('La conexion no se establecio');
    }
}

module.exports = conectarDB;