module.exports = {
    estaLogeado(req,res,next){
        if(req.isAuthenticated()){//Si el usuario esta autenticado
            return next();//Continua con el siguiente codigo
        }else{
            return res.redirect('/signin');
        }
    },
    noEstaLogeado(req,res,next){//Esta funcion es para aquellas rutas que quiero evitar cuando el usuario ya est logeado
        if(!req.isAuthenticated()){//Si no esta autenticado
            return next();//Retornar al siguiente codigo
        }
        return res.redirect('/dashboard');//Si esta autenticado, retorna a la vista profile
    }
}