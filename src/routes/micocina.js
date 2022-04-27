//HAY QUE PROTEGER ESTA RUTA CON una funcion del archivo auth.js, estaLogeado()

const express = require('express');//Importando express para crear nuestras rutas
const pool = require('../database');
const router = express.Router();//Solo especificamos que queremos su modulo llamado Router()



router.get('/micocina/:id_inventario',async(req,res)=>{
    const {id_inventario} = req.params;
    
    const productos = await pool.query('SELECT *FROM producto WHERE id_inventario = ?',[id_inventario]);

    res.render('dashboard/micocina',{productos,id_inventario});
});



router.post('/micocina/:id_inventario',async(req,res)=>{
    const {id_inventario} = req.params;
    const {nombre_pro,cantidad_min,cantidad,fecha_caducidad} = req.body;

    const nuevoPro = {
        nombre_pro,
        cantidad_min,
        cantidad,
        fecha_caducidad,
        id_inventario
    };

    await pool.query('INSERT INTO producto SET ?',nuevoPro);
    req.flash('success','Producto agregado exitosamente');
    res.redirect('/dashboard/micocina/'+id_inventario);
});





//EDITANDO UN PRODUCTO
router.get('/micocina/:id_inventario/editar/:id_producto',async(req,res)=>{
    const {id_producto} = req.params;
    const getProducto = await pool.query('SELECT *FROM producto WHERE id_producto = ?',id_producto);
    const {nombre_pro,cantidad_min,cantidad,fecha_caducidad,id_inventario} = getProducto[0];
    res.render('dashboard/edit_producto_micocina',{nombre_pro,cantidad,cantidad_min,fecha_caducidad,id_producto,id_inventario});
});



router.post('/micocina/:id_inventario/editar/:id_producto',async(req,res)=>{
    const {id_inventario,id_producto} = req.params;
    const {nombre_pro,cantidad_min,cantidad,fecha_caducidad} = req.body;

    const updatedProducto = {
        nombre_pro,
        cantidad_min,
        cantidad,
        fecha_caducidad,
        id_inventario
    }
    await pool.query('UPDATE producto set ? WHERE id_producto = ?',[updatedProducto,id_producto]);
    req.flash('success','Producto actualizado exitosamente');
    res.redirect('/dashboard/micocina/'+id_inventario);
});


//ELIMINAR PRODUCTO
router.get('/micocina/:id_inventario/:id_producto',async(req,res)=>{
    const {id_inventario,id_producto} = req.params;
    await pool.query('DELETE FROM producto WHERE id_producto = ?',[id_producto]);
    req.flash('success','Producto eliminado exitosamente');
    res.redirect('/dashboard/micocina/'+ id_inventario);
});


module.exports = router;//Exportando el router