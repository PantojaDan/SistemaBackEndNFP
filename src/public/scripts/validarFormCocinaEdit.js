const btnValidarEditCocina = document.querySelector('#btn-edit-cocina-validar');
const btnActualizarEditCocina = document.querySelector('#btn-edit-cocina-actualizar');

let liProEditCocina = document.createElement('li');

const nombreProCocinaEdit = document.querySelector('#nombre_pro-edit-cocina');
const cantidadEditCocina = document.querySelector('#cantidad-edit-cocina');
const cantidadMinEditCocina =  document.querySelector('#cantidad_min-edit-cocina');
const fechaEditCocina = document.querySelector('#fecha-lista-edit-cocina');

const erroresCocinaEdit = document.querySelector('#errores-ul');

const modalErrorCocinaEdit = document.querySelector('.container-error-signup');

btnValidarEditCocina.addEventListener('click',()=>{
    liProEditCocina.innerHTML = '';
    let isOk = true;

    let nombre = nombreProCocinaEdit.value;
    let cantidad = cantidadEditCocina.value;
    let cantidadMin = cantidadMinEditCocina.value;
    let fechaCaducidad = fechaEditCocina.value;

    if((nombre=='')||(cantidad=='')||(cantidadMin=='')/*||(fechaCaducidad=='')*/){
        liProEditCocina.innerHTML += '<li>Algunos campos estan vacios</li>';
        isOk = false;
    }

    /*if(cantidad == 0){
        liProEditCocina.innerHTML += '<li>La cantidad no puede ser de 0</li>';
        isOk = false;
    }*/

    if(!isOk){
        erroresCocinaEdit.appendChild(liProEditCocina);
        modalErrorCocinaEdit.classList.remove('ocultar-signup');
    }

    if(isOk){
        btnValidarEditCocina.classList.add('quitar-btn');
        btnActualizarEditCocina.classList.remove('quitar-btn');
    }
});


window.addEventListener('click',e=>{
    if(e.target.classList[0]==='container-error-signup'){
        containerErrorSignup.classList.add('ocultar-signup');
    }
});