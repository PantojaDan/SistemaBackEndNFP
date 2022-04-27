const bcrypt  = require('bcryptjs');
const helpers = {};//Creamos un objetp helper


//Defiendo funcion para encriptar contraseña
helpers.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);//Cuantas veces se va a ejecutar este algoritmo
    const hash = await bcrypt.hash(password,salt);//Cifrar la contraseña
    return hash;
}



//Esto es cuando se hace un logeo y se desea comparar las contraseñas
helpers.matchPassword = async(password,savedPassword)=>{//Se define la funcion para comparara las contraseñas
    try{
        return await bcrypt.compare(password,savedPassword);//Se pide dos parametros, la contraseña que se tipeo, la constraseña cifrada
    }catch(e){
        console.log(e);
    }
}//Ir a passport.js para cifrar la contraseña



module.exports = helpers;//Exportamos dicho objeto