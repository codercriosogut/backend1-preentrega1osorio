const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const { productos, readProductos } = require('../utils/dataManager');


//new
//const { productos } = require("./products.router")
//ok-

let carritos = [];
let currentCartId = 1;

//ok-

//leer carritos del archivo
async function readCarritos() {
    try {
        const data = await fs.readFile('carritos.json', 'utf8');
        carritos = JSON.parse(data);
        currentCartId = carritos.length ? Math.max(...carritos.map(c => c.id)) + 1 : 1;
    } catch (error) {
        if (error.code === 'ENOENT') {
            await fs.writeFile('carritos.json', JSON.stringify([]));
        } else {
            console.error("Error al leer el archivo", error);
        }
    }
}
//ok-

//escribir carritos al archivo
async function writeCarritos() {
    try {
        await fs.writeFile('carritos.json', JSON.stringify(carritos, null, 2));
    } catch (error) {
        console.error("Error al escribir en el archivo", error);
    }
}
//ok-

//Inicializar carritos al inicio
readCarritos();

//Rutas para carritos
//Crear nuevo carrito
router.post('/', async (req, res) => {
    const nuevoCarrito = {
        id: currentCartId++,
        products: []
    };

    carritos.push(nuevoCarrito);
    await writeCarritos();
    res.status(201).json(nuevoCarrito);
});
//ok-

//Obtener todos los carritos
//GET localhost:8080/api/carts
router.get('/', (req, res) => {
    const carritosConDetalles = carritos.map(carrito => {
        const productosDetallados = carrito.products.map(item => {
            const producto = productos.find(p => p.id === item.product);
            return { ...producto, quantity: item.quantity };
        });
        return { ...carrito, products: productosDetallados };
    });
    res.json(carritosConDetalles);
});
//ok-

//Obtener productos de un carrito por ID
router.get('/:cid', (req, res) => {
    const carritoID = parseInt(req.params.cid);
    const carrito = carritos.find((carrito) => carrito.id === carritoID);
    if (carrito) {
        const productosDetallados = carrito.products.map(item => {
            const producto = productos.find(p => p.id === item.product);
            return { ...producto, quantity: item.quantity };
        });
        res.json(productosDetallados);
    } else {
        res.status(404).json({ mensaje: "Carrito no encontrado" });
    }
});
//ok-


//Agregar producto a un carrito
//POST localhost:8080/api/carts/1/product/1
//POST localhost:8080/api/carts/1/product/2
//POST localhost:8080/api/carts/1/product/3
//router.post('/api/carts/:cid/product/:pid', async (req, res) => {
//router.post('/:cid/product/:pid', async (req, res) => {
//router.post('/api/carts/:cid/product/:pid', async (req, res) => {

    router.post('/:cid/product/:pid', async (req, res) => {
        const carritoID = parseInt(req.params.cid);
        const productoID = parseInt(req.params.pid);
    
        const carrito = carritos.find((carrito) => carrito.id === carritoID);
        if (!carrito) {
            return res.status(404).json({ mensaje: "Carrito no encontrado" });
        }
    
        const producto = productos.find((producto) => producto.id === productoID);
        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }
    
        const item = carrito.products.find(p => p.product === productoID);
        if (item) {
            item.quantity += 1;
        } else {
            carrito.products.push({ product: productoID, quantity: 1 });
        }
    
        await writeCarritos();
        res.status(201).json(carrito);
    });
//ok-

//module.exports = { router, productos, carritos, currentCartId }

//module.exports = { router, carritos, currentCartId };
//module.exports = { router, productos, carritos, currentCartId }
module.exports = router;
//ok-
//update 12/07/24-12.00