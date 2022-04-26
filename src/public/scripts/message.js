const mensageOperacion = document.querySelector('.mensage-operacion');

mensageOperacion.addEventListener('click',e=>{
    e.preventDefault();
    if(e.target.classList.contains('mensage-operacion')){
        mensageOperacion.classList.add('ocultar-mensage-operacion');
    }
});