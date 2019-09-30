const { Router } = require('express');
const router = Router();

/* Hace referencia a la conexion de la BD */
const poolConnection = require('../../lib/database');

router.post('/create', async(req, res) => {
    const {
        breadName,
        breadFlavor,
        breadQuantity,
        saleStatus
    } = req.body;

    if (!(breadName || breadFlavor || breadQuantity || saleStatus)) {
        req.flash('mensajeFallido', 'Diligenciar El Formulario Completamente');
        res.redirect('/createProduct');
    } else {
        const newProduct = {
            breadName,
            breadFlavor,
            breadQuantity,
            saleStatus,
            user_id: req.user.id //aqui toma la session del usuario
                //que se definio de forma global.
        }

        await poolConnection.query('INSERT INTO products SET ?', [newProduct]);
        req.flash('success', 'Producto Creado Correctamente');
        res.redirect('/readProduct');
    }
});

router.put('/update/:id', async(req, res) => {
    const { id } = req.params;
    const {
        breadName,
        breadFlavor,
        breadQuantity,
        saleStatus
    } = req.body;

    if (!breadName || !breadFlavor || !breadQuantity || !saleStatus) {
        req.flash('mensajeFallido', '¡FALLO! Diligenciar El Formulario Completamente');
        res.redirect('/updateProduct');
    } else {
        const newProduct = {
            breadName,
            breadFlavor,
            breadQuantity,
            saleStatus
        }

        await poolConnection.query('UPDATE products set ? WHERE id = ?', [newProduct, id]);
        req.flash('success', 'Producto Actualizado Correctamente');
        res.redirect('/updateProduct');
    }
});

router.delete('/delete/:id', async(req, res) => {
    const { id } = req.params;
    await poolConnection.query('DELETE FROM products WHERE ID = ?', [id]);
    req.flash('success', 'Producto Eliminado Correctamente');
    res.redirect('/deleteProduct');
});

module.exports = router;