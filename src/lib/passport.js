const passport = require('passport');//Importando el modulo de passport
const LocalStrategy = require('passport-local').Strategy;



const pool =  require('../database');//Importando conexion a base de datos
const helpers = require('../lib/helpers');//Importando las funciones para cifrar las contraseñas



passport.use('local.signin', new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'password',
    passReqToCallback: true
}, async(req,usuario,password,done) => {
    const rows = await pool.query('SELECT * FROM usuarios WHERE nombre_us = ?',[usuario]);

    if(rows.length > 0){//Significa que si encontro un usuario
        const user = rows[0];//Guardamos ese usuario
        const validPassword = await helpers.matchPassword(password,user.contraseña);//Comparamos la contraseña que envia el formulario password, y la contraseña almacenada cifrada en la base de datos user.password
        if(validPassword){//Si las contraseñas coinciden. entonces.....
            done(null,user,req.flash('bienvenida','Bienvenido ' + user.nombre_us));
            //console.log('Bienvenido');
        }else{//Si no coinciden
            done(null,false,req.flash('incorrecto','Contraseña incorrecta'));//Terminamos con el proceso tambien
            console.log('Contraseña incorrecta');
        }
    }else{//Si no encuentra nada, entonces......
        console.log('El usuario no existe');
        return done(null,false,req.flash('incorrecto','El usuario no existe'));
    }

}));



passport.use('local.signup', new LocalStrategy({
    usernameField: 'nombre_us',
    passwordField: 'contraseña',
    passReqToCallback: true
},async(req,nombre_us,contraseña,done)=>{
    const {nombre,ap_usuario, am_usuario, telefono} = req.body;

    const nuevoUsuario = {
        nombre_us,
        nombre,
        ap_usuario,
        am_usuario,
        contraseña,
        telefono
    }

    nuevoUsuario.contraseña = await helpers.encryptPassword(contraseña);

    const result = await pool.query('INSERT INTO usuarios SET ?',[nuevoUsuario]);

    nuevoUsuario.id_usuario = result.insertId;

    //Ingresamos el invenatario por default llamdo Mi Cocina. Creamos el objeto
    const inventarioMiCocina = {
        nombre_inv: 'Mi Cocina',
        id_usuario: nuevoUsuario.id_usuario
    }

    //Insertamos ese objeto en la tabla inventario
    await pool.query('INSERT INTO inventario SET ?',[inventarioMiCocina]);

    return done(null,nuevoUsuario);//Es para terminar el proceso de autenticacion a traves del callback done(), este recibe como parametro un error lo cual no hay 'null'..... y los datos del suaurio para almacenarlo en una session 'newUser'
}));



passport.serializeUser((user,done)=>{
    done(null,user.id_usuario);
});

passport.deserializeUser(async(id_usuario,done)=>{//Se deserializa el usuario. Se necesita el id del usuario y continuar con el resto dle codigo
    const rows = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?',[id_usuario]);
    done(null,rows[0]);
});