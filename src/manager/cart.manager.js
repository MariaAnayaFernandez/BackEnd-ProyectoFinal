import {existsSync,promises} from 'fs'

export default class CartManager {
    constructor (){
        this.path = []
    }

   //Método setId
   #setId(){
    const id =
    this.path.length === 0
        ? 1
        : this.path[this.path.length-1].id +1
        return id
    }

    //Método addCart
    addCart (idProd, quantity){
        const cart = {
        id: this.#setId(),
        product:[
            idProd,
            quantity
        ]
        }

    if (typeof cart.stock === 'undefined'){
         return 'se requieren todos los campos' //Validación de campos obligatorios
    } else{
         this.path.push(cart) 
         }

    //Cración de archivo
    fs.promises.writeFile('../public/cart.json', JSON.stringify(this.path))
    .then (()=> {
        return 'Cart created'
    })
    .catch (error =>{
        return error;
    })
}


   //Método getCartById
   getCartById(id) {
    fs.promises.readFile('../public/cart.json', 'utf-8')
    .then((cart) => {
        const CartsList = JSON.parse(cart)
        const foundCart = CartsList.find(cart => cart.id == id)
        console.log(foundCart)
       })
       .catch((error) => console.log('Not found'))
}

//   //Método addProductToCart
//   addProductToCart(id) {
//     fs.promises.readFile('../public/cart.json', 'utf-8')
//     .then((cart) => {
//         const CartsList = JSON.parse(cart)
//         const foundCart = CartsList.find(cart => cart.id == id)
        
//        })
//        .catch((error) => console.log('Not found'))
// }


}