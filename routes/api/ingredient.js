const { Router } = require('express');
const router = Router();

/* Hace referencia a la conexion de la BD */
const poolConnection = require('../../lib/database');

router.post('/create', async(req, res) => {
    let {
        ingredientName,
        typeMeasureSolidIngredient,
        valueTypeMeasureSolid,
        typeMeasureLiquidIngredient,
        valueTypeMeasureLiquid,
        ingredientQuantity
    } = req.body;

    if (!ingredientName || !ingredientQuantity || !(valueTypeMeasureSolid || valueTypeMeasureLiquid)) {
        req.flash('mensajeFallido', 'Solo Puede Estar Vacio Algún Campo De Valor De Medida O Los Tipos De Medida');
        res.redirect('/createIngredient');
    } else {
        typeMeasureSolidIngredient = 'kilogramos';
        typeMeasureLiquidIngredient = 'Litros';

        if (!valueTypeMeasureLiquid) {
            valueTypeMeasureLiquid = 0;
        }

        if (!valueTypeMeasureSolid) {
            valueTypeMeasureSolid = 0;
        }

        const newIngredient = {
            ingredientName,
            typeMeasureSolidIngredient,
            valueTypeMeasureSolid,
            typeMeasureLiquidIngredient,
            valueTypeMeasureLiquid,
            ingredientQuantity,
            user_id: req.user.id //aqui toma la session del usuario
                // que se definio de forma global.
        }

        await poolConnection.query('INSERT INTO ingredients SET ?', [newIngredient]);
        req.flash('success', 'Ingrediente Creado Correctamente');
        res.redirect('/readIngredient');
    }
});

router.put('/update/:id', async(req, res) => {
    const { id } = req.params;
    let {
        ingredientName,
        typeMeasureSolidIngredient,
        valueTypeMeasureSolid,
        typeMeasureLiquidIngredient,
        valueTypeMeasureLiquid,
        ingredientQuantity
    } = req.body;

    if (!ingredientName || !ingredientQuantity || !(valueTypeMeasureSolid || valueTypeMeasureLiquid)) {
        req.flash('mensajeFallido', '¡FALLO! Solo Puede Estar Vacio Algún Campo De Valor De Medida O Los Tipos De Medida');
        res.redirect('/updateIngredient')
    } else {
        typeMeasureSolidIngredient = 'kilogramos';
        typeMeasureLiquidIngredient = 'Litros';

        if (!valueTypeMeasureLiquid) {
            valueTypeMeasureLiquid = 0;
        }

        if (!valueTypeMeasureSolid) {
            valueTypeMeasureSolid = 0;
        }

        const newIngredient = {
            ingredientName,
            typeMeasureSolidIngredient,
            valueTypeMeasureSolid,
            typeMeasureLiquidIngredient,
            valueTypeMeasureLiquid,
            ingredientQuantity
        }

        await poolConnection.query('UPDATE ingredients set ? WHERE id = ?', [newIngredient, id]);
        req.flash('success', 'Ingrediente Actualizado Correctamente');
        res.redirect('/updateIngredient');
    }
});

router.delete('/delete/:id', async(req, res) => {
    const { id } = req.params;
    await poolConnection.query('DELETE FROM ingredients WHERE ID = ?', [id]);
    req.flash('success', 'Ingrediente Eliminado Correctamente');
    res.redirect('/deleteIngredient');
});

module.exports = router;