const { Router } = require('express');
const router = Router();

// opcional
// const { ThereisNotAuthentication } = require('../../lib/auth');

router.get('/', /*ThereisNotAuthentication,*/ (req, res) => {
    res.render('index');
});

module.exports = router;