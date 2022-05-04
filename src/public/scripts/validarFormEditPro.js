const btnListaEditValidar = document.querySelector('#button-lista-validar');
const btnListaActualizarEdit = document.querySelector('#button-lista-edit');

let liListaEdit = document.createElement('li');

const nombreProEdit = document.querySelector('#nombre_pro_edit');
const cantidadEdit = document.querySelector('#cantidad_edit');
const cantidadMinEdit = document.querySelector('#cantidad_min_edit');
const fechaEditList =  document.querySelector('#fecha-lista-edit');

const erroresListEdit = document.querySelector('#errores-ul');

const modalErrorListaEdit = document.querySelector('.container-error-signup');

btnListaEditValidar.addEventListener('click',()=>{
    liListaEdit.innerHTML = '';
    let isOk = true;

    let nombre = nombreProEdit.value;
    let cantidad = cantidadEdit.value;
    let cantidadMin = cantidadMinEdit.value;
    let fechaCaducidad = fechaEditList.value;

    if((nombre=='')||(cantidad=='')||(cantidadMin=='')||(fechaCaducidad=='')){
        liListaEdit.innerHTML += '<li>Algunos campos estan vacios</li>';
        isOk = false;
    }

    if(cantidad == 0){
        liListaEdit.innerHTML += '<li>La cantidad no puede ser de 0</li>';
        isOk = false;
    }

    if(!isOk){
        erroresListEdit.appendChild(liListaEdit);
        modalErrorListaEdit.classList.remove('ocultar-signup');
    }

    if(isOk){
        btnListaEditValidar.classList.add('quitar-btn');
        btnListaActualizarEdit.classList.remove('quitar-btn');
    }
});


window.addEventListener('click',e=>{
    if(e.target.classList[0]==='container-error-signup'){
        containerErrorSignup.classList.add('ocultar-signup');
    }
});