const SOCKET = io();

const FORM = document.getElementById('id-form');
const BOTON_PRODS = document.getElementById('botonProductos');


FORM.addEventListener('submit', (e) => {
    e.preventDefault();
    const DATA_FORM = new FormData(e.target);
    console.log(DATA_FORM)
    const PROD = Object.fromEntries(DATA_FORM);
    SOCKET.emit('newProduct', PROD);
    e.target.reset();
})


document.addEventListener('click', (e) => {
    console.log("gola 1")
    if(e.target.classList.contains('delete-button')){
        const PRODUCT_ID = e.target.getAttribute('data-id');
        SOCKET.emit('deleteProduct', PRODUCT_ID)
    }
})


SOCKET.on('prods', (prods) => {
    const productsList = document.getElementById('product-list');
    const newProductItem = document.createElement('li');
    newProductItem.textContent = `Nombre: ${prods[prods.length - 1].title}`
    newProductItem.innerHTML += ' <button class="delete-button" data-id="' + prods[prods.length - 1].id + '">DELETE</button>';
    productsList.appendChild(newProductItem)
})

SOCKET.on('prodDeleted', (prodID) => {
    console.log("hola")
    const productItem = document.querySelector(`[data-id="${prodID}"]`).parentNode;
    productItem.parentNode.removeChild(productItem)
})