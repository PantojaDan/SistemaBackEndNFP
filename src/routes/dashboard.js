const express = require('express');//Importando express para crear nuestras rutas
const router = express.Router();//Solo especificamos que queremos su modulo llamado Router()



const pool = require('../database');//Importando la conexion a la DB



router.get('/dashboard',async(req,res)=>{//Creando una ruta llamada /dashboard para mostrar la interfaz metodo get
    const inventarios = await pool.query('SELECT * FROM inventario');
    res.render('dashboard/dashboard',{inventarios});
});



router.post('/dashboard',async(req,res)=>{//Creando una ruta para el caso en el que se envie los datos
    const {nombre_inv} = req.body;//ESTO ES PARA ENVIAR LOS DATOS A LA BASE DE DATOS Y DESPUES MOSTRAR LOS INVENTARIOS
    const nuevoInventario = {
        nombre_inv
    };
    await pool.query('INSERT INTO inventario set ?',nuevoInventario);
    res.redirect('/dashboard');
});



router.get('/dashboard/eliminar/:id_inventario',async(req,res)=>{//RUTA PARA ELIMINAR LOS INVENTARIOS
    const {id_inventario} = req.params;
    await pool.query('DELETE FROM inventario WHERE id_inventario = ?',[id_inventario]);
    res.redirect('/dashboard');//AQUI ME QUEDE PARA EL DASHBOARD
})



//RUTA PARA DIRIGIRSE A LOS PRODUCTOS DE UN DETERMINADO INVENTARIO O LISTA. 
//SE HACE UNA CONSULTA Y ESOS DATOS OBTENIDOS SE ENVIAN A LISTA.HBS
router.get('/dashboard/lista/:id_inventario',async(req,res)=>{
    const {id_inventario} = req.params;
    const productos = await pool.query('SELECT * FROM producto WHERE id_inventario = ?',[id_inventario]);
    
    const invNombre = await pool.query('SELECT * FROM inventario WHERE id_inventario = ?',[id_inventario]);
    
    const idInventario = invNombre[0].id_inventario;
    const nombreInventario = invNombre[0].nombre_inv;

    res.render('dashboard/lista',{productos,idInventario,nombreInventario});
});


//INSERTANDO LOS PRODUCTOS a una determinada lista
router.post('/dashboard/lista/:id_inventario',async(req,res)=>{
    const {nombre_pro, cantidad, cantidad_min, fecha_caducidad} = req.body;
    const {id_inventario} = req.params;

    const nuevoProducto = {
        nombre_pro,
        cantidad_min,
        cantidad,
        fecha_caducidad,
        id_inventario
    };
    
    await pool.query('INSERT INTO producto set ?',nuevoProducto);
    res.redirect('/dashboard/lista/'+ id_inventario);
});



//Cuando se envia datos por el metodo post para eliminar el producto de una lista o inventario
router.get('/dashboard/lista/:id_inventario/:id_producto',async(req,res)=>{
    const {id_inventario,id_producto} = req.params;
    await pool.query('DELETE FROM producto WHERE id_producto = ?',[id_producto]);
    res.redirect('/dashboard/lista/'+ id_inventario);
});



module.exports = router;//Exportando el router