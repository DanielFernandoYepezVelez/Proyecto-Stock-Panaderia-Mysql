/*1. Aqui voy a tener los metodos de autenticación */
const passport = require('passport');

/* Que tipo de autenticación quiero si con
redes sociales o solo con user y password
de forma local */
const localStrategy = require('passport-local').Strategy;

/* Solicitando La conexion a la BD MySQL */
const poolConnection = require('./database');
const { encryptPassword, matchPassword } = require('../lib/helpers');

passport.use('local.signin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {
    const registros = await poolConnection.query('SELECT * FROM users WHERE email = ?', [email]);
    if (registros.length > 0) {
        const user = registros[0];
        const validPassword = await matchPassword(password, user.password);

        if (validPassword) {
            done(null, user, req.flash('success', 'Bienvenido ' + user.fullName));
        } else {
            done(null, false, req.flash('mensajeFallido', 'Contraseña Incorrecta'));
        }
    } else {
        return done(null, false, req.flash('mensajeFallido', 'El Usuario No Existe'));
    }
}));

/* Mi estrategia de autenticación se va a
llamar 'local.signup' y va a ser local */
passport.use('local.signup', new localStrategy({

    /* Los campos de donde voy a recibir los
    valores que ingresa el usuario. */
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true //lo utilizo para recibir
        //todos los campos, aparte
        //de los dos anteriores, en
        //caso de que exista más.

}, async(req, email, password, done) => {

    /* req, tiene toda la data del
    formulario. */
    const { fullName } = req.body;

    /* Solo me deja validar el dato directo del req.body */
    if (!fullName) {
        return done(null, false, req.flash('mensajeFallido', 'Ingresa Un Nombre De Usuario'));
    }

    /* Datos Necesarios Para Crear Un Nuevo
    Usuario, que estan en el formulario del
    registro */
    const newUser = {
        email,
        password,
        fullName
    }

    /* Antes de guardar el usuario
    cifro la contraseña */
    newUser.password = await encryptPassword(password);

    /* Darle a la BD el objeto para que lo
    almacene, pero para eso debo traerme
    la conexion a la BD, a través de pool*/
    const respuesta = await poolConnection.query('INSERT INTO users SET ?', [newUser]);

    /* Agregando el id al nuevo usuario desde
    respuesta propiedad insertId */
    newUser.id = respuesta.insertId;

    /* Cuando Ya tiene todos lo datos y
    el error no existe, etonces el DONE
    continua con la aplicación */
    return done(null, newUser, req.flash('success', 'El Registro Fue Exitoso'));
}));

/* Middlewares, para Serializar un usuario */
passport.serializeUser((user, done) => {

    /* Por su id lo guardo en la sessión */
    done(null, user.id);
});

/* Middlewares, para Deserializar un usuario */
/* Gracias al id puedo volver a tener los datos
 que anteriormente guarde en la serialización*/
passport.deserializeUser(async(id, done) => {
    const rows = await poolConnection.query('SELECT * FROM users WHERE id = ?', [id]);

    /* Al obtener el query me da un arreglo, entonces tomo el objeto con indice
     0 de ese arreglo y además es el único objeto que existe */
    done(null, rows[0]);
});