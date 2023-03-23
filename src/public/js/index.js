

const socketClient = io();

const inputProduct = document.getElementById('inputProduct')

const inputTitle = document.getElementById("title");
const inputDescription = document.getElementById("description");
const inputCode = document.getElementById("code");
const inputPrice = document.getElementById("price");
const inputStatus = document.getElementById("status");
const inputStock = document.getElementById("stock");
const inputThumbnail = document.getElementById("thumbnail");

inputProduct.onsubmit = (event) =>{
    event.preventDefault()
    const newProduct={
        title: inputTitle.value,
		description: inputDescription.value,
        code: parseInt(inputCode.value),
		price: parseInt(inputPrice.value),
        status: inputStatus.value,
        stock:parseInt(inputStock.value),
        thumbnail: inputThumbnail.value
    }
    socketClient.emit('inputNewProduct', newProduct)
}

      

