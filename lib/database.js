const mysql = require('mysql');
/* Mysql no permite promesas sino callbacks, pero con 
este paquete de node, las puedo utilizar y además
async-await también */
const { promisify } = require('util');
const { database } = require('../config/keys'); //Conexion

const mysqlPool = mysql.createPool(database);

mysqlPool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('La conexión fue Cerrada');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('La DB tiene muchas conexiones');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('La conexion de la BD fue rechazada');
        }
    }

    if (connection) {
        connection.release();
        console.log('BD is Connected');
        return;
    }
});

/* Todo lo que comience con querys puedo aplicarle
el async-await o promesas, gracias al metodo promisify
del modulo util */
mysqlPool.query = promisify(mysqlPool.query);

module.exports = mysqlPool;