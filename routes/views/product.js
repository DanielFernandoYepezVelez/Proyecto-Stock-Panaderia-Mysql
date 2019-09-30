const { Router } = require('express');
const router = Router();

/* Hace referencia a la conexion de la BD */
const poolConnection = require('../../lib/database');

/* Importo la logica del loggin, para porteger las
rutas necesarias */
const { ThereisAuthentication } = require('../../lib/auth');

router.get('/createProduct', ThereisAuthentication, (req, res) => {
    res.render('product/create');
});

router.get('/readProduct', ThereisAuthentication, async(req, res) => {
    const products = await poolConnection.query('SELECT * FROM products WHERE user_id = ? ORDER BY id DESC', [req.user.id]);
    res.render('product/read', { products });
});

router.get('/updateProduct', ThereisAuthentication, async(req, res) => {
    const products = await poolConnection.query('SELECT * FROM products WHERE user_id = ? ORDER BY id DESC', [req.user.id]);
    res.render('product/update', { products });
});

router.get('/updateProduct:id', ThereisAuthentication, async(req, res) => {
    const { id } = req.params;
    const products = await poolConnection.query('SELECT * FROM products WHERE ID = ?', [id]);
    res.render('product/updatee', { products: products[0] });
    /* El me devuelve un array con un único objeto,
    que es el id tomado por request, por ende debo seleccionar
    la posición de ese único objeto */
});

router.get('/deleteProduct', ThereisAuthentication, async(req, res) => {
    const products = await poolConnection.query('SELECT * FROM products WHERE user_id = ? ORDER BY id DESC', [req.user.id]);
    res.render('product/delete', { products });
});

module.exports = router;