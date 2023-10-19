const { database } = require('./config/keys');
/* ---------------------- */

const express = require('express');
const morgan = require('morgan');
const exhbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session');
/* ---------------------- */

/* 2.Ya define autenticaciones de passport,
ahora tengo que ejecutar su código
principal a través de sus middlewares,
donde le digo que inicie y cree
una session para guardar los datos.
por ultimo me traigo el archivo que tiene
los metodos de autenticación para que
la aplicación sepa que estoy creando
una nueva autenticación de usuarios*/
const passport = require('passport');
/* ---------------------- */

// initializations
const app = express();
require('./lib/passport');
/* ---------------------- */

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exhbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');
/* ---------------------- */

// Middlewares
/* No voy a almacenar la sessión en el servidor, sino en
la Base de datos de MySQL */
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
/* ---------------------- */

// Global Variables
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.mensajeFallido = req.flash('mensajeFallido');
    res.locals.error = req.flash('error'); //Passport guarda el error en una variable global llamada error.
    res.locals.user = req.user || null; //Passport guarda los datos del registro del usuario
    //en una variable global llamada user.
    //Aqui estan los datos de session del usuario.
    next();
});
/* ---------------------- */

// Routes
app.use(require('./routes/views/index'));
app.use(require('./routes/views/ingredient'));
app.use(require('./routes/views/product'));
app.use(require('./routes/views/authentication'));
app.use('/api/ingredient', require('./routes/api/ingredient'));
app.use('/api/product', require('./routes/api/product'));
app.use('/api/auth', require('./routes/api/authentication'));
/* ---------------------- */

// Static Files
app.use(express.static(path.join(__dirname, 'public/')));
/* ---------------------- */

// Starting the Server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
/* ---------------------- */
