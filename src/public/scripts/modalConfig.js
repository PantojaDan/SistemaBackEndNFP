const modalConfig = document.querySelector('#modal-config');
const optionConfiguracion =  document.querySelector('#configuracion');
const formSetNumber = document.querySelector('.form-set-number');
const formDeleteNumber =  document.querySelector('.form-delete-account');
const buttonsConfig =  document.querySelector('#buttons-config');
const actualizarNumConfig =  document.querySelector('#actualizar-num');
const eliminarAccount =  document.querySelector('#eliminar-cuenta');
//const menuDashh = document.querySelector('.menu-dashboard');

/*Cuando se da click al boton de configiracion del menu hamburguesa */
optionConfiguracion.addEventListener('click',()=>{
    menuDashboard.classList.remove('show-menu');
    menuDashboard.classList.add('hide-menu');
    modalConfig.classList.remove('ocultar-conf');
});

/*Desaparecer el modal */
modalConfig.addEventListener('click',e=>{
    if(e.target.id == 'modal-config'){
        modalConfig.classList.add('ocultar-conf');
        formSetNumber.classList.add('ocultar-set');
        formDeleteNumber.classList.add('ocultar-set');
        buttonsConfig.classList.remove('ocultar-buttons-conf');
    }
});

actualizarNumConfig.addEventListener('click',()=>{
    buttonsConfig.classList.add('ocultar-buttons-conf');
    formSetNumber.classList.remove('ocultar-set');
});

eliminarAccount.addEventListener('click',()=>{
    buttonsConfig.classList.add('ocultar-buttons-conf');
    formDeleteNumber.classList.remove('ocultar-set');
});