//HAY QUE PROTEGER ESTA RUTA CON una funcion del archivo auth.js, estaLogeado()

const express = require('express');//Importando express para crear nuestras rutas
const router = express.Router();//Solo especificamos que queremos su modulo llamado Router()

router.get('/micocina',(req,res)=>{//Creando una ruta llamada /
    res.send('micocina');
});

module.exports = router;//Exportando el router