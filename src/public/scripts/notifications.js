
const btnNotificar = document.querySelector('#btn-notificar');//Boton de notificar
const modalNotification =  document.querySelector('.modal-notification');//Modal notificar


btnNotificar.addEventListener('click',()=>{
    modalNotification.classList.remove('ocultar-notification');
    modalNotification.classList.add('mostrar-notification');
});

window.addEventListener('click',e=>{
    if(e.target.classList[0] === 'modal-notification'){
        modalNotification.classList.remove('mostrar-notification');
        modalNotification.classList.add('ocultar-notification');
    }
});
