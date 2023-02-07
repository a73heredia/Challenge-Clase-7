import express from 'express';
import { Product_Manager } from './ProductManager.js'

const app = express();
const port = 8080;

app.get('/products', async(req, res) => {
    let products = await Product_Manager.getProducts();
    let limit = parseInt(req.query.limit)
    
    if(limit) {
        let productsLimit = products.slice(0, limit);
        res.send(productsLimit);
        
    } else {
        res.send(products);
    }   
});

app.get('/products/:id', async(req, res) => {
    let id = parseInt(req.params.id);
    let products = await Product_Manager.getProducts();
    let limit = products.length;

    if(id <= limit) {
        let productId = products.filter(pto => pto.id === id);
        res.send(productId);
    } else {
        res.send({error: 'El Producto No Existe'})
    }
    
});

app.listen(port, () => console.log(`Server Running on ${port}`));