const validarBtn = document.querySelector('#validar-form-cocina');//Boton para validar
const btnAddProCocinaForm = document.querySelector('#button-agregar-pro-cocina');

let liCocina = document.createElement('li');

const nombreProCocina = document.querySelector('#nombre_pro_cocina');
const cantidadCocina = document.querySelector('#cantidad_cocina');
const cantidadMinimaCocina = document.querySelector('#cantidad_minima_cocina');
const fechaCaducidadCocina = document.querySelector('#fecha_caducidad_cocina');
const medidas = document.querySelector('#medidas');

const erroresUlCocina = document.querySelector('#errores-ul');

const modalErrorFormCocina =  document.querySelector('.container-error-signup');

validarBtn.addEventListener('click',()=>{
    liCocina.innerHTML = '';
    console.log('ok');
    let isOk = true;

    let nombre =  nombreProCocina.value;
    let cantidad = cantidadCocina.value;
    let medida = medidas.value;
    let cantidadMin = cantidadMinimaCocina.value;
    let fechaCaducidad = fechaCaducidadCocina.value;

    if((nombre=='')||(cantidad=='')||(cantidadMin=='')||(fechaCaducidad=='') || (medida=='')){
        liCocina.innerHTML += '<li>Algunos campos estan vacios</li>';
        isOk = false;
    }

    if(cantidad == 0){
        liCocina.innerHTML += '<li>La cantidad no puede ser de 0</li>';
        isOk = false;
    }

    if(!isOk){
        erroresUlCocina.appendChild(liCocina);
        containerErrorSignup.classList.remove('ocultar-signup');
    }

    if(isOk){
        validarBtn.classList.add('quitar-btn');
        btnAddProCocinaForm.classList.remove('quitar-btn');
    }
});


window.addEventListener('click',e=>{
    if(e.target.classList[0]==='container-error-signup'){
        containerErrorSignup.classList.add('ocultar-signup');
    }
});