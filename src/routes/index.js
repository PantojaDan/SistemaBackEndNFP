const express = require('express');//Importando express para crear nuestras rutas
const router = express.Router();//Solo especificamos que queremos su modulo llamado Router()

const passport = require('passport');
const {estaLogeado} = require('../lib/auth');//Importamos la funcion del archivo auth.js para proteger rutas
const {noEstaLogeado} = require('../lib/auth');
//RUTAS PARA LOS FORMULARIOS SIGNUP Y SIGNIN

router.get('/signup',noEstaLogeado,(req,res)=>{//Creando una ruta llamada /
    res.render('auth/signup');
});


router.post('/signup',noEstaLogeado,
    passport.authenticate('local.signup',{
        successRedirect: '/signin',
        failureRedirect: '/signup',
        failureFlash: true
    })
);



router.get('/signin',noEstaLogeado,(req,res)=>{
    res.render('auth/signin');
});



router.post('/signin',noEstaLogeado,(req,res,next)=>{//Creando la ruta para cuando se envie dato en el formualrio de signin del archivo signin.hbs
    console.log('hola');
    passport.authenticate('local.signin',{//Utilizando la autenticacion definida en el archivo passport.js en el paso 169
        successRedirect: '/dashboard', //Si todo marcha bien... entonces redirecciona a esta página
        failureRedirect: '/signin',//Redireccionamos a la misma pagina es decir, signin para que intente de nuevo a logearse
        failureFlash: true //Permite enviar mensajes flash
    })(req,res,next);//Ir a definir el metodo de autenticacion para el signin en el archivo paspsort.js
});



router.get('/logout',estaLogeado,(req,res)=>{
    req.logOut();
    res.redirect('/signin');
});



module.exports = router;//Exportando el router