//HAY QUE PROTEGER ESTA RUTA CON una funcion del archivo auth.js, estaLogeado()
require('dotenv').config();//ESTO ES PARTE DE TWILIO, IMPORTAMOS LAS CONFIGURACIONES DE DOTENV

const express = require('express');//Importando express para crear nuestras rutas
const pool = require('../database');
const router = express.Router();//Solo especificamos que queremos su modulo llamado Router()

const accountSid = process.env.ACCOUNT_SID;//IMPORTAMOS EL ACCOUNTSID OBTENIDO DE TWILIO
const authToken = process.env.AUTH_TOKEN;//IMPORTAMOS EL AUTHTOKEN OBTENIDO DE TWILIO

const client =  require('twilio')('ACf78b8c7adbc2fd05bd969a81a34859d9', '26e9e420fea488e06eda1c695c94d7a7');//NOS CONECTAMSO A TWILIO*/
//const client = require('twilio')(accountSid,authToken);

var notificar;


//DIFERENCIA ENTRE DOS FECHAS
const restaFechas = function(f1,f2){
    let aFecha1 = f1.split('/');
    let aFecha2 = f2.split('/');
    let fFecha1 = Date.UTC(aFecha1[2],aFecha1[1]-1,aFecha1[0]);
    let fFecha2 = Date.UTC(aFecha2[2],aFecha2[1]-1,aFecha2[0]);
    let dif = fFecha2 - fFecha1;
    let dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    return dias;
}


//ALGORITMO PARA HACER LAS NOTIFICACIONES DE CADUCARSE FUNCION verificarFechas()
const verificarFechas = function(productos,phone){

    let bodyMngs = '';

    let añoPro,mesPro,diaPro,fechaPro;//Variable para almacenar los datos del producto

    let date = new Date();//Obtenemos la fecha de hoy
    let año = date.getFullYear();//Obtenemos el año de hoy
    let mes = date.getMonth() + 1;//Obtenemos el mes de hoy
    let dia = date.getDate();//Obtenemos el dia de hoy
    let fechaHoy = dia + '/' + mes + '/' + año;//Primer parametro

    if(productos.length){
        productos.forEach(producto => {
            //Obteniendo el año, mes y dia de los productos
            const {fecha_caducidad, nombre_pro} = producto;
            
            añoPro = fecha_caducidad.substring(0,4);
            mesPro = fecha_caducidad.substring(5,7);
            diaPro = fecha_caducidad.substring(8,10);
            
            fechaPro = diaPro + '/' + mesPro + '/' + añoPro;
            
            if((restaFechas(fechaHoy,fechaPro)<=30) && (restaFechas(fechaHoy,fechaPro)>0)){
                let diasRestantes = restaFechas(fechaHoy,fechaPro);
                
                //AQUI VA EL CODIGO DE WHATSAPP
                bodyMngs += nombre_pro + ' caduca en ' + diasRestantes + ' dias\n';
                
            }
            
            if(restaFechas(fechaHoy,fechaPro)<=0){
                bodyMngs += nombre_pro + ' ha caducado\n ';
            }
            
        });
    
        client.messages.create({
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+521' + phone,
            body: bodyMngs
        }).then(message => console.log(message.sid))
        .catch(message => console.log(message))
    }
    
}

router.get('/micocina/:id_inventario',async(req,res)=>{
    const {id_inventario} = req.params;
    
    let productos = await pool.query('SELECT *FROM producto WHERE id_inventario = ?',[id_inventario]);
    let user = await pool.query('SELECT *FROM inventario WHERE id_inventario = ?',[id_inventario]);
    const {id_usuario} = user[0];
    let usuario = await pool.query('SELECT *FROM usuarios WHERE id_usuario = ?',[id_usuario]);
    const {telefono} = usuario[0];
    //let phone = telefonoUser[0].telefono;
    //console.log(telefono);
    //verificarFechas(productos,phone);
    
    productos.forEach(async(producto) => {
        const {id_producto,cantidad} = producto;

        if(cantidad <= 0){
            await pool.query('DELETE FROM producto WHERE id_producto = ?',[id_producto]);
        }
    });

    productos = await pool.query('SELECT *FROM producto WHERE id_inventario = ?',[id_inventario]); 

    if(notificar || !notificar){
        
        setInterval(function(){

            if(!notificar){
                notificar = undefined;
                clearInterval(this);
            }

            if(notificar){
                verificarFechas(productos,telefono);
            }

        }, 10000);//Puedo cambiar el tiempo aqui es de 5 segundos puedo ajustarlo para un dia
    
    }

    res.render('dashboard/micocina',{productos,id_inventario});
    
});

router.post('/micocina/:id_inventario',async(req,res)=>{
    const {id_inventario} = req.params;
    const {nombre_pro,cantidad_min,cantidad,medida,fecha_caducidad} = req.body;

    const nuevoPro = {
        nombre_pro,
        cantidad_min,
        cantidad,
        medida,
        fecha_caducidad,
        id_inventario
    };

    console.log(fecha_caducidad + ' tipo: ' + typeof(fecha_caducidad));

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
    if(cantidad <= 0){
        req.flash('incorrecto','Producto agotado, eliminado');
    }else{
        req.flash('success','Producto actualizado exitosamente');
    }
    res.redirect('/dashboard/micocina/'+id_inventario);
});


//ELIMINAR PRODUCTO
router.get('/micocina/:id_inventario/:id_producto',async(req,res)=>{
    notificar = false;
    const {id_inventario,id_producto} = req.params;
    await pool.query('DELETE FROM producto WHERE id_producto = ?',[id_producto]);
    req.flash('success','Producto eliminado exitosamente');
    res.redirect('/dashboard/micocina/'+ id_inventario);
});




/*RUTA PARA LISTA-COMPRA */
router.get('/micocina/:id_inventario/lista-de-compra/consultar',async(req,res)=>{
    const {id_inventario} = req.params;
    
    let productos = await pool.query('SELECT *FROM producto WHERE id_inventario = ?',[id_inventario]);

    productos = productos.filter(producto => Number(producto.cantidad) <= Number(producto.cantidad_min));


    res.render('dashboard/listaCompra',{productos,id_inventario});

});

router.post('/micocina/:id_inventario/lista-de-compra/enviar',async(req,res)=>{
    const {id_inventario} = req.params;
    let productosComprar = '';

    let user = await pool.query('SELECT *FROM inventario WHERE id_inventario = ?',[id_inventario]);
    let idUser = user[0].id_usuario;
    let telefonoUser = await pool.query('SELECT *FROM usuarios WHERE id_usuario = ?',[idUser]);
    let phone = telefonoUser[0].telefono;

    let productos = await pool.query('SELECT *FROM producto WHERE id_inventario = ?',[id_inventario]);

    productos = productos.filter(producto => Number(producto.cantidad) <= Number(producto.cantidad_min));

    productos.forEach(producto => {
        productosComprar += '-' + producto.nombre_pro + '\n';
    });

    client.messages.create({
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+521' + phone,
        body: 'Comprar los siguientes productos: ' + productosComprar
    }).then(message => console.log(message.sid))
    req.flash('whatsapp','Mensaje enviado');
    res.redirect('/dashboard/micocina/'+id_inventario);
});


//Rutas notificaciones
router.post('/micocina/:id_inventario/notificar/caducidad',(req,res)=>{
    const {id_inventario} = req.params;
    
    notificar = true;

    req.flash('activo','Notificaciones activadas');
    res.redirect('/dashboard/micocina/' + id_inventario);
})


router.post('/micocina/:id_inventario/cancelar-notificaciones/caducidad',(req,res)=>{
    const {id_inventario} = req.params;

    notificar = false;

    req.flash('desactivado','Desactivado');
    res.redirect('/dashboard/micocina/' + id_inventario);
});


module.exports = router;//Exportando el router