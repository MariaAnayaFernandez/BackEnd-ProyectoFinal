

const socketClient = io();

const inputProduct = document.getElementById('inputProduct')
const inputSubmit = document.getElementById ('enviar')

const inputTitle = document.getElementById("title");
const inputDescription = document.getElementById("description");
const inputCode = document.getElementById("code");
const inputPrice = document.getElementById("price");
const inputStatus = document.getElementById("status");
const inputStock = document.getElementById("stock");
const inputThumbnail = document.getElementById("thumbnail");

inputSubmit.addEventListener("click", (e) =>{
    const newProduct={
        title: inputTitle.value,
		description: inputDescription.value,
        code: parseInt(inputCode.value),
		price: parseInt(inputPrice.value),
        status: inputStatus.value,
        stock:parseInt(inputStock.value),
        thumbnail: inputThumbnail.value
    }

    if (
        !newProduct.title ||
		!newProduct.description ||
        !newProduct.code ||
		!newProduct.price ||
		!newProduct.status ||
		!newProduct.stock ||
		!newProduct.thumbnail
    ){
        e.preventDefault()
        alert('Missing data')

    } else {
        socketClient.emit('newProduct', newProduct)

    }
    
})


const deleteProduct = document.getElementById("deleteTable");

deleteProduct.addEventListener("click", (e) => {
	e.preventDefault();
	const element = e.target;
	const productId = element.getAttribute("data-id");
	if (element.className === "classDeleteProduct") {
		socketClient.emit("deleteProduct", parseInt(productId));
		document.location.reload()
	}
});    

