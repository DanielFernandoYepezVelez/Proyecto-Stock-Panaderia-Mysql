const { Router } = require('express');
const router = Router();

/* Hace referencia a la conexion de la BD */
const poolConnection = require('../../lib/database');

/* Importo la logica del loggin, para porteger las
rutas necesarias */
const { ThereisAuthentication } = require('../../lib/auth');

router.get('/createIngredient', ThereisAuthentication, (req, res) => {
    res.render('ingredient/create');
});

router.get('/readIngredient', ThereisAuthentication, async(req, res) => {
    const ingredients = await poolConnection.query('SELECT * FROM ingredients WHERE user_id = ? ORDER BY id DESC', [req.user.id]);
    res.render('ingredient/read', { ingredients });
});

router.get('/updateIngredient', ThereisAuthentication, async(req, res) => {
    const ingredients = await poolConnection.query('SELECT * FROM ingredients WHERE user_id = ? ORDER BY id DESC', [req.user.id]);
    res.render('ingredient/update', { ingredients });
});

router.get('/updateIngredient:id', ThereisAuthentication, async(req, res) => {
    const { id } = req.params;
    const ingredients = await poolConnection.query('SELECT * FROM ingredients WHERE ID = ?', [id]);
    res.render('ingredient/updatee', { ingredients: ingredients[0] });
    /* El me devuelve un array con un único objeto,
    que es el id tomado por request, por ende debo seleccionar
    la posición de ese único objeto */
});

router.get('/deleteIngredient', ThereisAuthentication, async(req, res) => {
    const ingredients = await poolConnection.query('SELECT * FROM ingredients WHERE user_id = ? ORDER BY id DESC', [req.user.id]);
    res.render('ingredient/delete', { ingredients });
});

module.exports = router;