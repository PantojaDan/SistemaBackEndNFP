const loader = document.querySelector('.loader');

function quitarVentanaLoader(){
    loader.classList.add('ocultar-loader');
}

window.setTimeout(quitarVentanaLoader,3000);