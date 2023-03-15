import fs from 'fs'

export default class CartManager {
    constructor (path){
        this.path = path
        }


    //Método getCart
    getCart = async () => {
    if (fs.existsSync(this.path)) {
      const cartsFile = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(cartsFile);
    } else {
      return [];
    }
    };

    //Método getCartById
    getCartById = async (cid) => {
    const cartsById = await this.getCart()
    const findCart = cartsById.find((c) => c.id === cid);
    if (findCart) {
      return findCart;
    } else {
      return null;
    }
  };


   //Método setId
   #setId(carts){
    const id =
    carts.length === 0
        ? 1
        : carts[carts.length-1].id +1
        return id
    }

    //Método addCart
    addCart = async () => {
        const cartsList = await this.getCart();
        const id = this.#setId(cartsList);
        const newCart = { id: id, products: [] };
        cartsList.push(newCart);
        await fs.promises.writeFile(this.path, JSON.stringify(cartsList));
        return newCart;
      };

  //Método addProductToCart
  addProductToCart = async (cid, pid) => {
    const cartsList = await this.getCart();
    const cart = cartsList.find((c) => c.id === cid);
    let q = 1;
    const obj = { product: pid, quantity: q };
    if (!cart) {
      return "Cart does not exist";
    } else {
      const product = cart.products.find((p) => p.product === pid);
      if (!product) {
        cart.products.push(obj);
        const cartIndex = cartsList.findIndex((p) => p.id === cid);
        cartsList.splice(cartIndex, 1, cart);
        await fs.promises.writeFile(this.path, JSON.stringify(cartsList));
        return "Product added to cart";
      } else {
        product.quantity++;
        const cartIndex = cartsList.findIndex((c) => c.id === cid);
        cartsList.splice(cartIndex, 1, cart);
        await fs.promises.writeFile(this.path, JSON.stringify(cartsList));
        return "Product added to cart";
      }
    }
  };

}