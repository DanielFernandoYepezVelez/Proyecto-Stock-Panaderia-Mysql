const { Router } = require('express');
const router = Router();

// opcional
// const { ThereisNotAuthentication } = require('../../lib/auth');

router.get('/signup', /*ThereisNotAuthentication,*/ (req, res) => {
    res.render('auth/signup');
});

router.get('/signin', /*ThereisNotAuthentication,*/ (req, res) => {
    res.render('auth/signin');
});

module.exports = router;