const closeModalIngresar = document.querySelector('#close-modal-ingresar');
const modalIngresarProducto = document.querySelector('.modal-ingresar-producto');

const updatedProductBtn = document.querySelector('.updated-product'); 
const addProCocinaBtn = document.querySelector('.add-pro-cocina');

const deletePro = document.querySelector('.delete-pro');
const modalEliminar = document.querySelector('.modal-eliminar');

closeModalIngresar.addEventListener('click',()=>{
    modalIngresarProducto.classList.remove('mostrar-agregar-pro');
    modalIngresarProducto.classList.add('ocultar-agregar-pro');
});

updatedProductBtn.addEventListener('click',()=>{
    modalIngresarProducto.classList.remove('ocultar-agregar-pro');
    modalIngresarProducto.classList.add('mostrar-agregar-pro');
});

addProCocinaBtn.addEventListener('click',()=>{
    modalIngresarProducto.classList.remove('ocultar-agregar-pro');
    modalIngresarProducto.classList.add('mostrar-agregar-pro');
});

modalEliminar.addEventListener('click',e=>{
    if(e.target.classList.contains('modal-eliminar')){
        modalEliminar.classList.remove('mostrar-modal-eliminar');
        modalEliminar.classList.add('ocultar-modal-eliminar');
    }
});

deletePro.addEventListener('click',()=>{
    modalEliminar.classList.remove('ocultar-modal-eliminar');
    modalEliminar.classList.add('mostrar-modal-eliminar');
});