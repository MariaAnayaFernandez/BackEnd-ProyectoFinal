import { Router } from "express";
import ProductManager from "../manager/product.manager.js";


const router = Router()
const productManager = new ProductManager('../public/products.json')

// Ruta Raíz GET
router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit;

        const products = await productManager.getProducts();

        if (limit) {
            const productsLimit = products.slice(0, limit);
            res.json(productsLimit);
        } else {
            res.json(products);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error' });
    }
});


// Ruta raíz GET/:pid
router.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;

        const product = await productManager.getProductById(parseInt(pid));

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Not Found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error' });
    }
});

//Ruta raíz POST
router.post('/',async (req, res)=>{
    const obj = req.body
    const newProduct = await productManager.addProducts(obj)
    res.json({message:'Product added', product: newProduct})
})

//Ruta raíz PUT/:pid
router.put('/:pid', async (req,res)=>{
    const {pid} = req.params
    const obj = req.body
    const product = await productManager.updateProduct(+pid,obj)
    res.json({product})
})


//Ruta raíz DELETE/:pid
router.delete('/:pid', async (req,res)=>{
    const {pid} = req.params
    const message = await productManager.deleteProduct(+pid)
    res.json({message})
})


export default router;