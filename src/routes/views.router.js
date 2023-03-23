import { Router } from "express";
import { createRequire } from "module"

const require = createRequire(import.meta.url)
const products = require("../public/products.json")

const router = Router()

router.get('/', (req, res)=>{
    const product = products
    res.render('home',{product})
})

router.get('/realTimeProducts', (req, res)=>{
    res.render('realTimeProducts')
})

export default router;