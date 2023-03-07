const express = require("express");
const app = express();
var cors = require('cors');
app.use(cors());
app.use(express.json());
app.listen(3001, () => {
    console.log("Server running on port 3000");
});

const products = [
    {
        id: 1,
        name: 'IP12',
        description: 'Iphone 12 100%',
        price: 1000
    },   {
        id: 2,
        name: 'IP13',
        description: 'Iphone 13 100%',
        price: 1200
    },    {
        id: 3,
        name: 'IP14',
        description: 'Iphone 14 100%',
        price: 1500
    },
];

app.get("/products", (req, res, next) => {
    res.json(products);
});
app.get("/products/:id", (req, res, next) => {
    const id = +req.params.id;
    const index = findProductIndex(id);
    if(index !== -1) {
        res.json(products[index]);
    } else {
        res.status(404).json({message: 'Not found'});
    }
});
app.post("/products", (req, res, next) => {
    const product = {
        id: (new Date()).getTime(),
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    };
    products.push(product);
    res.json(product);
});
app.delete("/products/:id", (req, res, next) => {
    const id = +req.params.id;
    const index = findProductIndex(id);
    if(index !== -1) {
        products.splice(index, 1);
        res.json({message: 'Product deleted', id: id});
    } else {
        res.status(404).json({message: 'Not found'});
    }
});

app.put("/products/:id", (req, res, next) => {
    const id = +req.params.id;
    const index = findProductIndex(id);
    if(index !== -1) {
        const product = products[index];
        product.name = req.body.name;
        product.price = req.body.price;
        product.description = req.body.description;
        res.json(product);
    } else {
        res.status(404).json({message: 'Not found'});
    }
});

function findProductIndex(id) {
    for(let i = 0; i < products.length; i++) {
        if(products[i].id === id) {
            return i;
        }
    }
    return -1;
}
