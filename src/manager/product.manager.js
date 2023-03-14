import { existsSync, promises } from 'fs';


export default class ProductManager {

    //Método constructor
    constructor (path){
    this.path = './src/public/products.json'
    }

   //Método getProducts  
   getProducts = async () =>{
    if (existsSync(this.path)){
        const productsList= await promises.readFile(this.path,'utf-8')
        const productos = JSON.parse(productsList)
        return (productos)
     } else{
    console.log('Archivo creado')
    return []
    }
   }


   //Método addProductos
   addProducts = async (product) => {
    const productos = await this.getProducts()
    let id
    if (productos.length === 0 ){
        id = 1
    } else {
        id = productos[productos.length - 1].id + 1
    }
    const newProducts = {id, ... product}
    productos.push(newProducts)
    await promises.writeFile(this.path, JSON.stringify(productos))
    return newProducts
   }


      //Método getProductoById
      getProductById= async (id) => {
        const productos = await this.getProducts()
        const foundProduct = productos.find(p => p.id === id)
        if (foundProduct){
            return foundProduct
        } else {
            return 'Not found'
        }
  
      }

       //Método updateProduct
   
       updateProduct = async (id, obj) => {
        const products = await this.getProducts()
        const foundProduct = products.find(p => p.id === id)
        if (!foundProduct){
            return 'Not found'
        } else {
          const update = {...foundProduct, ... obj}
          const productIndex = products.findIndex((p)=> p.id === id)
          products.splice(productIndex, 1, update)
          await promises.writeFile(this.path, JSON.stringify(products)) 
          return 'Product updated'
        }
       }
   
   
       //Método deleteProductbyId

      deleteProduct = async (pid) => {
        const products = await this.getProducts()
        const productIndex  = products.findIndex((p) => p.id === pid)
        if (productIndex  === -1){
          return 'Product does not exist'
        } else{
          products.splice(productIndex,1)
          await promises.writeFile(this.path, JSON.stringify(products))
          return 'Product deleted'
        }
        }

}

    const producto1 = {
        title: 'Producto Pureba',
        description: 'Este es un producto prueba',
        code: 'abc123',
        price: 200,
        status: true,
        stock: 25,
        thumbnail: 'Sin Imagen'
      }

      const producto2 = {
        title: 'Producto Pureba 2',
        description: 'Este es un producto prueba 2',
        code: 'xyz987',
        price: 400,
        status: true,
        stock: 25,
        thumbnail: 'Sin Imagen'
      }

      const producto3 = {
        title: 'Producto Pureba 3',
        description: 'Este es un producto prueba 3',
        code: 'jlm567',
        price: 750,
        status: true,
        stock: 30,
        thumbnail: 'Sin Imagen'
      }

      const producto4 = {
        title: 'Calculadora',
        description: 'Este es un producto prueba 4',
        code: 'jdh567',
        price: 900,
        status: true,
        stock: 50,
        thumbnail: 'Sin Imagen'
      }
    
      const producto5 = {
        title: 'Grapas',
        description: 'Este es un producto prueba 5',
        code: 'pls567',
        price: 800,
        status: true,
        stock: 24,
        thumbnail: 'Sin Imagen'
      }
    
      const producto6 = {
        title: 'Tijeras',
        description: 'Este es un producto prueba 6',
        code: 'uys567',
        price: 900,
        status: true,
        stock: 46,
        thumbnail: 'Sin Imagen'
      }
    
      const producto7 = {
        title: 'Colores',
        description: 'Este es un producto prueba 7',
        code: 'wts567',
        price: 300,
        status: true,
        stock: 45,
        thumbnail: 'Sin Imagen'
      }
    
      const producto8 = {
        title: 'Cartulina',
        description: 'Este es un producto prueba 8',
        code: 'tyc567',
        price: 900,
        status: true,
        stock: 90,
        thumbnail: 'Sin Imagen'
      }
    
      const producto9 = {
        title: 'Marcador',
        description: 'Este es un producto prueba 9',
        code: 'qaj567',
        price: 600,
        status: true,
        stock: 45,
        thumbnail: 'Sin Imagen'
      }
    
      const producto10 = {
        title: 'Clips',
        description: 'Este es un producto prueba 10',
        code: 'xod567',
        price: 400,
        status: true,
        stock: 20,
        thumbnail: 'Sin Imagen'
      }
    


     async function test() {
       const shop = new ProductManager('./src/public/products.json')
      //   await shop.addProducts(producto1)
      //   await shop.addProducts(producto2)
      //   await shop.addProducts(producto3)
      //   await shop.addProducts(producto4)
      //   await shop.addProducts(producto5)
      //   await shop.addProducts(producto6)
      //   await shop.addProducts(producto7)
      //   await shop.addProducts(producto8)
      //   await shop.addProducts(producto9)
      //   await shop.addProducts(producto10)
      //  console.log(await shop.getProducts())
        //console.log(await shop.getProductById(1))
    //     await shop.updateProduct(1, {title:'Tijeras'})
    //     await shop.deleteProduct(1)

    }

     test();
