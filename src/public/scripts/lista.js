const modalLista =  document.querySelector('.modal-lista');
//const alertModalEliminar = document.querySelector('.modal-eliminar-lista');

const btnAddProLista = document.querySelector('.add-pro-lista');
//const btnUpdatePro = document.querySelector('.updated-pro');
//const btnDeletePro = document.querySelector('.delete-pro');

//const btnCloseCocina = document.querySelector('#close-modal-cocina');


function toggle(){
    if(modalLista.classList.contains('ocultar-lista')){
        modalLista.classList.remove('ocultar-lista');
        modalLista.classList.add('mostrar-lista');
    }else{
        modalLista.classList.remove('mostrar-lista');
        modalLista.classList.add('ocultar-lista');
    }
}


/*btnCloseCocina.addEventListener('click',()=>{//Arreglando este boton ya que no desaparece en totalidad el modal
    modalLista.classList.remove('mostrar-lista');
    modalLista.classList.add('ocultar-lista');
});*/

btnAddProLista.addEventListener('click',()=>{
    toggle();
});


/*btnUpdatePro.addEventListener('click',e=>{
    toggle();
});*/

/*btnDeletePro.addEventListener('click',()=>{
    if(alertModalEliminar.classList.contains('ocultar-modal-lista')){
        alertModalEliminar.classList.remove('ocultar-modal-lista');
        alertModalEliminar.classList.add('mostrar-modal-lista');
    }
});*/

/*alertModalEliminar.addEventListener('click',e=>{
    e.preventDefault();
    if(e.target.classList.contains('modal-eliminar-lista')){
        alertModalEliminar.classList.remove('mostrar-modal-lista');
        alertModalEliminar.classList.add('ocultar-modal-lista');
    }
});*/