const express = require('express');//Importando express para crear nuestras rutas
const router = express.Router();//Solo especificamos que queremos su modulo llamado Router()



const pool = require('../database');//Importando la conexion a la DB
const {estaLogeado} = require('../lib/auth');//Importamos la funcion del archivo auth.js para proteger rutas



router.get('/dashboard',estaLogeado,async(req,res)=>{//Creando una ruta llamada /dashboard para mostrar la interfaz metodo get
    const inventarios = await pool.query('SELECT * FROM inventario WHERE id_usuario = ?',[req.user.id_usuario]);
    const miCocina = await pool.query('SELECT * FROM inventario WHERE nombre_inv = ? and id_usuario = ?',['Mi Cocina',req.user.id_usuario]);//Seleccionamos el invenatrio comun Mi Cocina
    const id_usuario = req.user.id_usuario;

    listas = inventarios.filter(inventario => inventario.nombre_inv != "Mi Cocina");

    console.log(listas);

    res.render('dashboard/dashboard',{listas, miCocina,id_usuario});
});



router.post('/dashboard',estaLogeado,async(req,res)=>{//Creando una ruta para el caso en el que se envie los datos
    const {nombre_inv} = req.body;//ESTO ES PARA ENVIAR LOS DATOS A LA BASE DE DATOS Y DESPUES MOSTRAR LOS INVENTARIOS
    const nuevoInventario = {
        nombre_inv,
        id_usuario: req.user.id_usuario
    };
    await pool.query('INSERT INTO inventario set ?',nuevoInventario);
    req.flash('success','Inventario creado exitosamente');
    res.redirect('/dashboard');
});



router.get('/dashboard/eliminar/:id_inventario',estaLogeado,async(req,res)=>{//RUTA PARA ELIMINAR LOS INVENTARIOS
    const {id_inventario} = req.params;
    await pool.query('DELETE FROM inventario WHERE id_inventario = ?',[id_inventario]);
    req.flash('success','Inventario eliminado exitosamente');
    res.redirect('/dashboard');//AQUI ME QUEDE PARA EL DASHBOARD
})



//RUTA PARA DIRIGIRSE A LOS PRODUCTOS DE UN DETERMINADO INVENTARIO O LISTA. 
//SE HACE UNA CONSULTA Y ESOS DATOS OBTENIDOS SE ENVIAN A LISTA.HBS
router.get('/dashboard/lista/:id_inventario',estaLogeado,async(req,res)=>{
    const {id_inventario} = req.params;
    
    let productos = await pool.query('SELECT * FROM producto WHERE id_inventario = ?',[id_inventario]);
    console.log(id_inventario + 'linea 52');
    const nombre_inv = await pool.query('SELECT * FROM inventario WHERE id_inventario = ?',[id_inventario]);
    console.log(id_inventario + 'linea 54');
    //const {nombre_inv} = inventario;
    console.log(nombre_inv);
    //const idInventario = invNombre[0].id_inventario;
    //const nombreInventario = invNombre[0].nombre_inv;
    console.log(id_inventario + 'linea 59');
    console.log(nombre_inv);

    productos.forEach(async(producto) => {
        const {id_producto,cantidad} = producto;

        if(cantidad <= 0){
            await pool.query('DELETE FROM producto WHERE id_producto = ?',[id_producto]);
        }
    });
    productos = await pool.query('SELECT *FROM producto WHERE id_inventario = ?',[id_inventario]); 


    res.render('dashboard/lista',{productos,id_inventario,nombre_inv: nombre_inv[0].nombre_inv});
});


//INSERTANDO LOS PRODUCTOS a una determinada lista
router.post('/dashboard/lista/:id_inventario',estaLogeado,async(req,res)=>{
    const {nombre_pro, cantidad, medida, categoria, fecha_caducidad} = req.body;
    const {id_inventario} = req.params;

    const nuevoProducto = {
        nombre_pro,
        cantidad_min: '',
        cantidad,
        medida,
        categoria,
        fecha_caducidad,
        id_inventario
    };
    
    await pool.query('INSERT INTO producto set ?',nuevoProducto);
    req.flash('success','Producto agregado exitosamente');
    res.redirect('/dashboard/lista/'+ id_inventario);
});



//Cuando se envia datos por el metodo post para eliminar el producto de una lista o inventario
router.get('/dashboard/lista/:id_inventario/:id_producto',estaLogeado,async(req,res)=>{
    const {id_inventario,id_producto} = req.params;
    await pool.query('DELETE FROM producto WHERE id_producto = ?',[id_producto]);
    req.flash('success','Producto eliminado exitosamente');
    res.redirect('/dashboard/lista/'+ id_inventario);
});


//AQUI ME QUEDE, CREO ES CONVENIENTE CREAR UNA INTERFAZ ESPECIALMENTE PARA EDITAR
router.get('/dashboard/lista/:id_inventario/editar/:id_producto',estaLogeado,async(req,res)=>{
    const {id_producto} = req.params;
    const getProductoEdit = await pool.query('SELECT *FROM producto WHERE id_producto = ?',id_producto);
    console.log(getProductoEdit[0]);
    const {nombre_pro,cantidad,fecha_caducidad,categoria,id_inventario} = getProductoEdit[0];
    res.render('dashboard/edit_producto',{nombre_pro,cantidad,fecha_caducidad,categoria,id_producto,id_inventario});
});


//ACTUALIZANDO LOS DATOS, SE ENVIAN LOS DATOS
router.post('/dashboard/lista/:id_inventario/editar/:id_producto',estaLogeado,async(req,res)=>{
    const {id_inventario,id_producto} = req.params;
    const {nombre_pro,categoria,cantidad,fecha_caducidad} = req.body;

    const updatedProducto = {
        nombre_pro,
        cantidad_min:'',
        cantidad,
        categoria,
        fecha_caducidad,
        id_inventario
    }
    await pool.query('UPDATE producto set ? WHERE id_producto = ?',[updatedProducto,id_producto]);
    
    if(cantidad <= 0){
        req.flash('incorrecto','Producto agotado, eliminado');
    }else{
        req.flash('success','Producto actualizado exitosamente');
    }
    
    res.redirect('/dashboard/lista/'+id_inventario);
});



//CUANDO REMOVEMOS
router.get('/dashboard/lista/remover/productos/:id_inventario',async(req,res)=>{
    let {id_inventario} = req.params;

    const miCocina = await pool.query('SELECT *FROM inventario WHERE nombre_inv = ? and id_usuario = ?',['Mi Cocina',req.user.id_usuario]);
    const idCocina = miCocina[0].id_inventario; 
    
    await pool.query('UPDATE producto set id_inventario = ? WHERE id_inventario = ?',[idCocina,id_inventario]);
    req.flash('success','Productos removidos a Mi Cocina');
    res.redirect('/dashboard/lista/'+id_inventario);
})



/*Cuando actualizamos el numero */
router.post('/dashboard/actualizar/numero/:id_usuario',async(req,res)=>{
    let {id_usuario} = req.params;
    const {numeroActualizado} = req.body;

    await pool.query('UPDATE usuarios set telefono = ? WHERE id_usuario = ?',[numeroActualizado,id_usuario]);
    req.flash('success','Numero actualizado');
    res.redirect('/dashboard');
});

router.post('/dashboard/eliminar/cuenta/:id_usuario',async(req, res)=>{
    let {id_usuario} = req.params;

    req.flash('incorrecto','Cuenta eliminada');

    req.logOut();
    res.redirect('/signin');

    await pool.query('DELETE FROM usuarios WHERE id_usuario = ?',[id_usuario]);
});

module.exports = router;//Exportando el router