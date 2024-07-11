const express = require("express")
const router = express.Router()
const fs = require("fs").promises
//ok-

let productos = []
let currentId = 1
//ok-


//leer productos del archivo
async function readProductos() {
    try {
        const data = await fs.readFile('productos.json', 'utf8')
        productos = JSON.parse(data)
        currentId = productos.length ? Math.max(...productos.map(p => p.id)) + 1 : 1
    } catch (error) {
        if (error.code === 'ENOENT') {
            await fs.writeFile('productos.json', JSON.stringify([]))
        } else {
            console.error("Error al leer el archivo", error)
        }
    }
}
//ok-

//escribir productos al archivo
async function writeProductos() {
    try {
        await fs.writeFile('productos.json', JSON.stringify(productos, null, 2))
    } catch (error) {
        console.error("Error al escribir en el archivo", error)
    }
}
//ok-


//Inicializar productos al inicio
readProductos();
//ok-


//Listar todos los productos
//localhost:8080/
router.get('/', (req, res) => {
    res.json(productos)
});
//ok-

// Obtener producto por ID
//GET localhost:8080/api/products/1
router.get('/:pid', (req, res) => {
    const productoID = parseInt(req.params.pid)
    const producto = productos.find((producto) => producto.id === productoID)
    if (producto) {
        res.json(producto)
    } else {
        res.status(404).json({ mensaje: "Producto no encontrado" })
    }
});
//ok-

//Agregar nuevo producto
//POST localhost:8080/api/products/
//{"title": "Procesador Intel i7", "description": "Intel i7-10500", "code": "001", "price": 150000, "stock": 5, "category": "Procesadores"}
//{"title": "Memoria RAM DDR4", "description": "RAM DDR4-16GB", "code": "002", "price": 80000, "stock": 5, "category": "Memorias"}
//{"title": "Almacenamiento SSD", "description": "SSD-SATA-1TB", "code": "003", "price": 50000, "stock": 5, "category": "Almacenamientos"}
router.post('/', async (req, res) => {
    const { title, description, code, price, stock, category, thumbnails } = req.body

    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({
            mensajes: [
                "Debe ingresar todos los campos: title, description, code, price, stock, category",
                "A excepción de thumbnails y status que por defecto es true",
            ]
        });
    }

    const nuevoProducto = {
        id: currentId++,
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
        thumbnails: thumbnails || []
    };

    productos.push(nuevoProducto)
    await writeProductos()
    res.status(201).json(nuevoProducto)
})
//ok-

//Actualizar producto por ID
//{"title": "Procesador Intel i7 ACTUALIZADO", "description": "Intel i7-10500 ACTUALIZADO", "code": "001", "price": 150000, "stock": 5, "category": "Procesadores ACTUALIZADO"}
router.put('/:pid', async (req, res) => {
    const productoID = parseInt(req.params.pid)
    const producto = productos.find((producto) => producto.id === productoID)

    if (producto) {
        const { title, description, code, price, stock, category, thumbnails, status } = req.body

        if (title !== undefined) producto.title = title
        if (description !== undefined) producto.description = description
        if (code !== undefined) producto.code = code
        if (price !== undefined) producto.price = price
        if (stock !== undefined) producto.stock = stock
        if (category !== undefined) producto.category = category
        if (thumbnails !== undefined) producto.thumbnails = thumbnails
        if (status !== undefined) producto.status = status

        await writeProductos()
        res.json(producto)
    } else {
        res.status(404).json({ mensaje: "Producto no encontrado" })
    }
})
//ok-


//Eliminar producto por ID
//DELETE
//localhost:8080/api/products/1
//router.delete('/api/products/:pid', async (req, res) => {
router.delete('/:pid', async (req, res) => {
    const productoID = parseInt(req.params.pid)
    const productoIndex = productos.findIndex((producto) => producto.id === productoID)

    if (productoIndex !== -1) {
        productos.splice(productoIndex, 1)
        await writeProductos()
        res.json({ mensaje: `Producto ${productoID} eliminado` })
    } else {
        res.status(404).json({ mensaje: "Producto no encontrado" })
    }
});
//ok-

module.exports = router
//ok-