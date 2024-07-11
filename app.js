//Desarrollar el servidor basado en Node.JS y express, que escuche 
//en el puerto 8080 y disponga de dos grupos de rutas: /products y /carts.
//Dichos endpoints estarán implementados con el router de express, con las
const express = require("express")
const app = express()
const port = 8080
const productsRouter = require("./routes/products.router")
const { router: cartsRouter, productos } = require("./routes/carts.router")
//ok-

//Middlewares
//No olvides app.use(express.json())
//No es necesario implementar multer
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//ok-

//Rutas
//Para el manejo de productos, el cual tendrá su router en /api/products/, configurar las siguientes rutas: 
//app.use("/", productsRouter)//reparado
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
//ok-

//Ruta para el endpoint raíz
//GET localhost:8080/
app.get('/', (req, res) => {
    res.redirect('/api/products')
});

//ok-

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
//ok-