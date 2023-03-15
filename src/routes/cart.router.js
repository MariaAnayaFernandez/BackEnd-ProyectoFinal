import { Router } from "express";
import CartManager from "../manager/cart.manager.js";
import { __dirname } from "../utils.js";

const router = Router()
const cartManager = new CartManager(__dirname+'/public/carts.json')

//Ruta raíz POST
router.post('/',async (req, res)=>{
    const obj = req.body
    const newCart = await cartManager.addCart(obj)
    res.json({message:'Product added to Cart', product: newCart})
})

//Ruta GET/:cid
router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;

        const cart = await cartManager.getCartById(parseInt(cid));

        if (cart) {
            res.json(cart);
        } else {
            res.status(404).json({ error: 'Not Found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error' });
    }
});

//Ruta POST/:cid

router.post('/:cid/product/:pid', async(req,res)=>{
    const {cid, pid} = req.params
    const addProduct = await cartManager.addProductToCart(parseInt(cid), parseInt(pid))
    res.json({message:addProduct})
})

export default router;