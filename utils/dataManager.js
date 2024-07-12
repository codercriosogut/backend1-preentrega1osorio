const fs = require('fs').promises

let productos = [];

async function readProductos() {
    try {
        const data = await fs.readFile('productos.json', 'utf8')
        productos = JSON.parse(data)
    } catch (error) {
        if (error.code === 'ENOENT') {
            await fs.writeFile('productos.json', JSON.stringify([]))
        } else {
            console.error("Error al leer el archivo", error)
        }
    }
}

async function writeProductos() {
    try {
        await fs.writeFile('productos.json', JSON.stringify(productos, null, 2))
    } catch (error) {
        console.error("Error al escribir en el archivo", error)
    }
}

module.exports = {
    productos,
    readProductos,
    writeProductos
};
//update 12/07/24-12.00