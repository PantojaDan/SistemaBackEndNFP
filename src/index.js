/*Importando modulos*/
const express = require('express');//Se importa el modulo express
const morgan = require('morgan');//Se importa el modulo morgan. Es para mostrar en consola las peticiones que se realizan por parte del cliente
const {engine} = require('express-handlebars');//Se inicializa el modulo handlebars para las plantillas html
const path  = require('path');//Se inicializa un modulo para especificar la carpeta de main
const flash =  require('connect-flash');//Se importa el modulo connect-flash
const session = require('express-session');//Se importa el modulo para sessiones
const MySQLStore = require('express-mysql-session');
const { database } = require('./keys');



/*Inicializaciones*/
const app = express(); //Se ejecuta express y devuelve un objeto y lo almacenamos en app



/*Setting. Configuraciones que necesita el servidor de express*/
app.set('port',process.env.PORT || 4000);//En que puerto va a funcionar el servidor express, si existe uno en el sistema operativo, entonces tomalo, caso contrario se toma el 4000
app.set('views',path.join(__dirname,'views'));//Especificando donde esta la carpeta views, es decir las vistas o interfaces
app.engine('.hbs',engine({//Configurando el motor de plantillas 
    defaultLayout: 'main.hbs',//Nombre de la plantilla principal
    layoutsDir: path.join(app.get('views'),'layouts'),//Especificamos en que carpeta se encuentra ese archivo
    partialsDir: path.join(app.get('views'),'partials'),//Espeficamos la ubicacion de la carpeta partials
    extname: '.hbs',//Especificando la extension de los archivos
    helpers: require('./lib/handlebars')//Especificamos donde esta el archivo handlebars.js
}));
app.set('view engine','.hbs');//Paso 40. Utilizando el motor de plantillas



/*Middleware. Funciones que se ejecutan cada vez que el usuario realiza una peticion al servidor*/
app.use(morgan('dev'));//Inicializamos morgan, y le pasamos el parametro 'dev' que es el tipo de mensaje que va a mostrar
app.use(express.urlencoded({extended: false}));//Es para acpetar los datos sencillos y no imagenes que me envien los usuarios desde formularios
app.use(express.json());//Es para envuar json por parte de los clientes
app.use(session({
    secret: 'sessiondaniel',
    resave: false,//Para que no se renueve la sesion
    saveUninitialized: false,//Para que no vuelva a restablecer la sesion
    store: new MySQLStore(database)//Donde se va a guardar las sesiones
}));
app.use(flash());



/*Variable Globales*/
app.use((req,res,next)=>{//Dejamos listo un middleware que toma un request,un response y next, al ejecutarlo voy a seguir en esta funcion
    //Esta funcion, toma la informacion del usuario, toma lo que el servidor va a responder y tambien toma una funcion para continuar con el resto del codigo
    
    app.locals.success = req.flash('success');
    next();
})



//Routes. Se define las rutas o urls del servidor
app.use(require('./routes'));//Le decimos que necesitamos el index.js dentro de la carpeta routes. Basicamente estamos importando ese archivo
app.use(require('./routes/dashboard'));
app.use('/dashboard',require('./routes/micocina'));



//Public. Una carpeta donde se va colocar todo el codigo que el navegdor puede acceder, mis css, html etc.
app.use(express.static(path.join(__dirname,'public')));//Especificando la ubicacion de la carpeta public
                                                    //Ir a las rutas de la carpeta routes para el paso 48



//Comenzando el servidor
app.listen(app.get('port'),()=>{//Inicializando el servidor en el puerto que corresponda y una vez conectado, hacer lo siguiente
    console.log("Server on port", app.get('port'));
});