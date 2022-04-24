const mysql =  require('mysql');//Importando el modulo de mysql



const {promisify} = require('util');//Importamos un modulo para tratar con las promesas



const {database} = require('./keys');//Importando el objeto de configuracionn de MySQL



const pool = mysql.createPool(database);//Generando la conexion a la base de datos



pool.getConnection((err,connection)=>{//Validando si hay conexion, si hay error o esta correcto
    if(err){//Hay varios tipos de error
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('LA CONEXION DE BASE DE DATOS SE CERRO');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('LA BASE DE DATOS TIENE MUCHAS CONEXIONES');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('CONEXION RECHAZADA');
        }
    }

    if(connection) connection.release(); //Lanzamos la conexion si todo esta bien
    console.log('DB esta conectado');
    return;
})



pool.query = promisify(pool.query);//Convirtiendo a Async Await las consultas. Cada que yo quiera hacer consultas, puedo hacer uso de promesas. Ir a links.js



module.exports = pool; //Comenzamos a exportar la conexion pool