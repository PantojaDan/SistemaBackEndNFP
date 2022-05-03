const nombreUsSignup = document.querySelector('#nombreUsSignup'); 
const nombreSignup = document.querySelector('#nombreSignup');
const apSignup = document.querySelector('#apSignup');
const amSignup = document.querySelector('#apSignup');
const passwordSignup = document.querySelector('#passwordSignup');
const passwordConfirmSignup = document.querySelector('#passwordConfirmSignup');
const telefono =  document.querySelector('#telefonoSignup');

const containerErrorSignup = document.querySelector('.container-error-signup');
const btnVerificarForm = document.querySelector('#verificar-form-signup');
const btnRegistrar =  document.querySelector('.btn-registrar');
let erroresUl = document.querySelector('#errores-ul');

let li = document.createElement('li');
btnVerificarForm.addEventListener('click',()=>{
    
    li.innerHTML = '';

    let isOk = true;

    let nombreUs = nombreUsSignup.value; 
    let nombre = nombreSignup.value;
    let ap = apSignup.value;
    let am = amSignup.value;
    let password = passwordSignup.value;
    let passwordConfirm = passwordConfirmSignup.value;
    let telefonoSignup = telefono.value;

    if((nombreUs=='')||(nombre=='')||(ap=='')||(am=='')||(password=='')||(passwordConfirm=='')||(telefonoSignup=='')){
        li.innerHTML += '<li>Algunos campos estan vacios</li>';
        isOk = false;
    }

    if(password != passwordConfirm){
        li.innerHTML += '<li>Las contraseñas no coinciden</li>';
        isOk = false;
    }

    if(nombreUs == nombre){
        li.innerHTML += '<li>Nombre de usuario no debe ser igual al nombre</li>';
        isOk = false;
    }

    if(!isOk){
        erroresUl.appendChild(li);
        containerErrorSignup.classList.remove('ocultar-signup');
    }

    if(isOk){
        btnVerificarForm.classList.add('ocultar-btn-verificar');
        btnRegistrar.classList.remove('ocultar-btn-signup');
    }
});


window.addEventListener('click',e=>{
    if(e.target.classList[0]==='container-error-signup'){
        containerErrorSignup.classList.add('ocultar-signup');
    }
});