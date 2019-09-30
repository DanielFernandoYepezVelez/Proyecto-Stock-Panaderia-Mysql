const bcrypt = require('bcryptjs');
const helpers = {};

/* Aqui estamos Cifrando la password */

/* Recibimos el password en texto plano */
helpers.encryptPassword = async(password) => {

    /* patron necesario para que el cifrado de
    la password funcione */
    const salt = await bcrypt.genSalt(10);

    /* Me cifra ese texto plano que es la
    password */
    const hash = await bcrypt.hash(password, salt);

    /* Retorna password cifrada */
    return hash;
}

/* Aqui estamos comprobando que sean iguales
(passwords) cifradas */
helpers.matchPassword = async(password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch (e) {
        console.log(e);
    }
};

module.exports = helpers;