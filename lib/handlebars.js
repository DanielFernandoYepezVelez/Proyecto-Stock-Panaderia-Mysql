const { format } = require('timeago.js');

/* Objeto Vacio */
const helpers = {};

/* Voy a ejecutar un método de ese objeto
Convirtiendo el formato de la fecha */
helpers.timeago = (timestamp) => {
    return format(timestamp);
};

module.exports = helpers;