const SOCKET = io();

const FORM = document.getElementById('id-form');
const BOTON_PRODS = document.getElementById('botonProductos');


FORM.addEventListener('submit', (e) => {
    e.preventDefault();
    const DATA_FORM = new FormData(e.target);
    const PROD = Object.fromEntries(DATA_FORM);
    SOCKET.emit('newProduct', PROD);
    e.target.reset();
})