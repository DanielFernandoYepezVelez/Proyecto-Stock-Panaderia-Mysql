/* Al iniciarlizar passport en el
el index principal, el objeto req, se
va llenando o poblando de nuevos metodos
como es el ejemplo del logout o authenticate*/

/* Aqui estoy protegiendo las rutas, para
que no acceda a la aplicación si no esta
logiado*/
module.exports = {
    ThereisAuthentication(req, res, next) {
        if (req.isAuthenticated()) {
            return next(); //Continua con el siguiente codigo o instruccion
            // que esta en el archivo donde este metodo se esta ejecutando,
            // aquí solo se esta definiendo.
        }

        req.flash('mensajeFallido', 'El usuario NO ha iniciado Sesion');
        return res.redirect('/signin');
    },


    /* Aqui estoy protegiendo las rutas, para
    que no acceda a la aplicación si esta
    logiado*/
    ThereisNotAuthentication(req, res, next) {
        if (!req.isAuthenticated()) {
            return next(); //Continua con el siguiente codigo o instruccion
            // que esta en el archivo donde este metodo se esta ejecutando,
            // aquí solo se esta definiendo.
        }

        req.flash('mensajeFallido', 'El usuario YA ha iniciado Sesion');
        return res.redirect('/createIngredient');
    }
}