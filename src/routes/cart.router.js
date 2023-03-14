import { Router } from "express";
import CartManager from "../manager/cart.manager.js";

const router = Router()
const cartManager = new CartManager('../public/cart.json')

//Ruta raíz POST
router.post('/',async (req, res)=>{
    const obj = req.body
    const newCart = await cartManager.addCart(obj)
    res.json({newCart})
})

//Ruta GET/:cid
router.get('/:cid', async (req, res) => {
    try {
        const { pid } = req.params;

        const product = await cartManager.getCartById(parseInt(pid));

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

export default router;