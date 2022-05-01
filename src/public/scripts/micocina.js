const closeModalIngresar = document.querySelector('#close-modal-ingresar');
const modalIngresarProducto = document.querySelector('.modal-ingresar-producto');

const updatedProductBtn = document.querySelector('.updated-product'); 

const deletePro = document.querySelector('.delete-pro');
const modalEliminar = document.querySelector('.modal-eliminar');

const addProCocinaBtn = document.querySelector('.add-pro-cocina');//Header
const addBtnNoHayPro = document.querySelector('#add-pro-cocina-first');//Abajo

closeModalIngresar.addEventListener('click',()=>{
    modalIngresarProducto.classList.remove('mostrar-agregar-pro');
    modalIngresarProducto.classList.add('ocultar-agregar-pro');
});

const options = document.querySelector('#options');
const claseDom = options.children[2].classList[0];

if(claseDom === "add-pro-cocina"){
    addProCocinaBtn.addEventListener('click',()=>{//Header
        modalIngresarProducto.classList.remove('ocultar-agregar-pro');
        modalIngresarProducto.classList.add('mostrar-agregar-pro');
    });
}
if(claseDom === "cocina-pro-container"){
    addBtnNoHayPro.addEventListener('click',()=>{//Abajo
        modalIngresarProducto.classList.remove('ocultar-agregar-pro');
        modalIngresarProducto.classList.add('mostrar-agregar-pro');
    
    });
}


updatedProductBtn.addEventListener('click',()=>{
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