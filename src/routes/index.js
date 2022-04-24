const express = require('express');//Importando express para crear nuestras rutas
const router = express.Router();//Solo especificamos que queremos su modulo llamado Router()


router.get('/',(req,res)=>{//Creando una ruta llamada /
    res.send('Hola');
});


module.exports = router;//Exportando el router