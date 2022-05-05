const btnAgregarProListaForm = document.querySelector('#button-lista');//Boton para agregar
const btnValidarProListaForm = document.querySelector('#validar-form-lista');//Boton para validar

let liLista = document.createElement('li');

//Seleccionamos los campos
const nombreProLista = document.querySelector('#nombreProLista');
const cantidadProLista = document.querySelector('#cantidadLista');
//const cantidadMinProLista = document.querySelector('#cantidadMinLista');
const fechaCaducidadProLista = document.querySelector('#fecha-lista');
const medidaLista =  document.querySelector('#medidasLista');

const erroresUlLista = document.querySelector('#errores-ul');

const modalErrorFormLista =  document.querySelector('.container-error-signup');


btnValidarProListaForm.addEventListener('click',()=>{
    liLista.innerHTML = '';
    let isOk = true;

    let nombre = nombreProLista.value;
    let cantidad = cantidadProLista.value;
    //let cantidadMin = cantidadMinProLista.value;
    let fechaCaducidad = fechaCaducidadProLista.value;
    let medida = medidaLista.value;

    if((nombre=='')||(cantidad=='')||/*(cantidadMin=='')||*/(fechaCaducidad=='')||(medida=='')){
        liLista.innerHTML += '<li>Algunos campos estan vacios</li>';
        isOk = false;
    }

    if(cantidad == 0){
        liLista.innerHTML += '<li>La cantidad no puede ser de 0</li>';
        isOk = false;
    }

    if(!isOk){
        erroresUlLista.appendChild(liLista);
        modalErrorFormCocina.classList.remove('ocultar-signup');
    }

    if(isOk){
        btnValidarProListaForm.classList.add('quitar-btn');
        btnAgregarProListaForm.classList.remove('quitar-btn');
    }
});


window.addEventListener('click',e=>{
    if(e.target.classList[0]==='container-error-signup'){
        containerErrorSignup.classList.add('ocultar-signup');
    }
});