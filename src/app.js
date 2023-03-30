import express from 'express';
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io';
import ProductManager from './manager/product.manager.js';

const app = express()

const productManager = new ProductManager(__dirname+'/public/products.json')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))

//HANDELBARS

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')


//ROUTERS
app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)
app.use('/', viewsRouter)

const httpServer = app.listen(8080,()=>{
    console.log('escuchando al puerto 8080')
})

//SOCKET


const socketServer = new Server(httpServer)

socketServer.on('connection', (socket) =>{
    console.log('Client conected')

    socket.on('disconnect', () => {
        console.log('Client disconnected')
    })

    socket.on('newProduct', (newProduct) =>{
        productManager.addProducts({ ...newProduct })
        console.log('Product added', newProduct)
    })

    socket.on('deleteProduct', (productId) => {
		productManager.deleteProduct(productId)
        console.log('Product deleted')
	})

})
