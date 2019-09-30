const { Router } = require('express');
const router = Router();

/* 3. Metodo responsable de utilizar o ejecutar
los metodos de autenticación de passport del
archivo passport.js, debo obviamente impor-
tar el modulo*/
const passport = require('passport');

/* router.post('/signup', (req, res) => {

    /* Lo que va luego del nombre de la
    autenticación, es donde quiero ir cuando
    la autenticación falle o sea exitosa.
    passport.authenticate('local.signup', {
        successRedirect: '/createIngredient',
        failureRedirect: '/signup',
        failureFlash: true
    });
}); */

/* OTRA FORMA DE ESCRIBIR LO DE ARRIBA
UN POCO MAS LEGIBLE */
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/signin',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.post('/signin', (req, res, next) => {
    console.log(req.body);
    passport.authenticate('local.signin', {
        successRedirect: '/createIngredient',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next)
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});

module.exports = router;