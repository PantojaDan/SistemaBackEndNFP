const express = require('express');//Importando express para crear nuestras rutas
const router = express.Router();//Solo especificamos que queremos su modulo llamado Router()



const pool = require('../database');//Importando la conexion a la DB



router.get('/dashboard',async(req,res)=>{//Creando una ruta llamada /dashboard para mostrar la interfaz metodo get
    const inventarios = await pool.query('SELECT * FROM inventario');
    res.render('dashboard/dashboard',{inventarios});
});



router.post('/dashboard',async(req,res)=>{//Creando una ruta para el caso en el que se envie los datos
    const {nombre_inv} = req.body;
    const nuevoInventario = {
        nombre_inv
    };
    await pool.query('INSERT INTO inventario set ?',nuevoInventario);
    res.redirect('/dashboard');
});



module.exports = router;//Exportando el router