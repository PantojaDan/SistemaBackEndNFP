//HAY QUE PROTEGER ESTA RUTA CON una funcion del archivo auth.js, estaLogeado()
require('dotenv').config();//ESTO ES PARTE DE TWILIO, IMPORTAMOS LAS CONFIGURACIONES DE DOTENV

const express = require('express');//Importando express para crear nuestras rutas
const pool = require('../database');
const router = express.Router();//Solo especificamos que queremos su modulo llamado Router()

//const accountSid = process.env.ACCOUNT_SID;//IMPORTAMOS EL ACCOUNTSID OBTENIDO DE TWILIO
//const authToken = process.env.AUTH_TOKEN;//IMPORTAMOS EL AUTHTOKEN OBTENIDO DE TWILIO

const client =  require('twilio')('ACf78b8c7adbc2fd05bd969a81a34859d9', 'b1cb27bacc8c4773546a566621abcad8');//NOS CONECTAMSO A TWILIO*/

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




/*RUTA PARA LISTA-COMPRA */
router.get('/micocina/:id_inventario/lista-de-compra/consultar',async(req,res)=>{
    const {id_inventario} = req.params;
    
    let productos = await pool.query('SELECT *FROM producto WHERE id_inventario = ?',[id_inventario]);

    productos = productos.filter(producto => producto.cantidad >= producto.cantidad_min);

    res.render('dashboard/listaCompra',{productos,id_inventario});
});

router.post('/micocina/:id_inventario/lista-de-compra/enviar',async(req,res)=>{
    const {id_inventario} = req.params;
    
    let user = await pool.query('SELECT *FROM inventario WHERE id_inventario = ?',[id_inventario]);
    let idUser = user[0].id_usuario;
    let telefonoUser = await pool.query('SELECT *FROM usuarios WHERE id_usuario = ?',[idUser]);
    let phone = telefonoUser[0].telefono;


    client.messages.create({
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+521' + phone,
        body: 'Esto es una prueba para daniel'
    }).then(message => console.log(message.sid))

    console.log('ha sido enviado a whatsapp: +52 1' + phone);///AQUI ME QUEDE YA CONSEGUI EL NUMERO DESDE LADB

    res.redirect('/dashboard/micocina/'+id_inventario);
});

module.exports = router;//Exportando el router