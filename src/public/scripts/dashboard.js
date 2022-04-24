const menuDashboard = document.querySelector('.menu-dashboard');
const menuHamburguer = document.querySelector('.menu-hamburguer-dash');

const agregarLista = document.querySelector('#agregar-lista');
const containerAgregar = document.querySelector('.container-agregar-inv');
const closeModalInv = document.querySelector('#close-modal-inv');

menuHamburguer.addEventListener('click',()=>{
    if(menuDashboard.classList.contains('hide-menu')){
        menuDashboard.classList.remove('hide-menu');
        menuDashboard.classList.add('show-menu');
    }else{
        menuDashboard.classList.remove('show-menu');
        menuDashboard.classList.add('hide-menu');
    }
});


agregarLista.addEventListener('click',()=>{
    menuDashboard.classList.remove('show-menu');
    menuDashboard.classList.add('hide-menu');
    containerAgregar.classList.remove('ocultar-agregar-inv');
    containerAgregar.classList.add('mostrar-agregar-inv');
});

closeModalInv.addEventListener('click',()=>{
    containerAgregar.classList.remove('mostrar-agregar-inv');
    containerAgregar.classList.add('ocultar-agregar-inv');  
});