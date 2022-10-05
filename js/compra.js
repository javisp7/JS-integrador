const compra = new Carrito();
const listaCompra = document.querySelector('#lista-compra tbody');
const carrito = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');

cargarEventos();

function cargarEventos(){

    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());

    carrito.addEventListener('click', (e)=>{compra.eliminarProducto(e)});

    compra.calcularTotal();

    procesarCompraBtn.addEventListener('click', procesarCompra);
}

function procesarCompra(e) {
    e.preventDefault();

    if(compra.obtenerProductosLocalStorage().length ===0){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay productos!, agrega algun producto.',
            timer: 2500,
            showConfirmButton: false,
    }).then(function(){
        window.location = "index.html";
    })
    

    }

else if (cliente.value === '' || correo.value === ''){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'ingrese los campos requeridos',
        timer: 2500,
        showConfirmButton: false,
})
}
else {
    const cargandoGif = document.querySelector('#cargando');
    cargandoGif.style.display = 'block';

    const enviado = document.createElement('img');
    enviado.src = 'img/mail.gif';
    enviado.style.display = ('block');
    enviado.width = '150';

    setTimeout(() => {
        cargandoGif.style.display = 'none';
        document.querySelector('#loaders').appendChild(enviado);
        setTimeout(() => {
           enviado.remove();
           compra.vaciarLocalStorage();
           window.location = "index.html"; 
        }, 1500);
    }, 2000);

}
}