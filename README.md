
# Proyecto de Gestión de Productos y Carritos
Se implementa un servidor en Node.js con Express para gestionar productos y carritos de compra. Se incluye creación, lectura, actualización y eliminación de productos y carritos.

## Tecnologías
- Node.js
- Express

## Productos /routes/products.router.js
- **GET localhost:8080/**: Obtener todos los productos.
- **GET localhost:8080/api/products/1**: Obtener un producto por ID.
- **POST localhost:8080/api/products/**: Crear un nuevo producto.
  - **Body/raw/JSON** - {"title": "Procesador Intel i7", "description": "Intel i7-10500", "code": "001", "price": 150000, "stock": 5, "category": "Procesadores"}
- **DELETE /api/products/:pid**: Eliminar un producto por ID.
- **PUT /api/products/:pid**: Actualizar un producto por ID.
  - **Body/raw/JSON** - {"title": "TituloActualizado", "description": "descripcionActualizado", "code": "001Actualizado", "price": 10, "stock": 100, "category": "categoriaActualizado"}


## Carritos /routes/carts.router.js
- **GET /api/carts**: Obtener todos los carritos con detalles de productos.
- **GET /api/carts/:cid**: Obtener un carrito por ID.
- **POST /api/carts**: Crear un nuevo carrito.
- **POST /api/carts/:cid/product/:pid**: Añadir un producto a un carrito por ID de carrito y producto.


## La persistencia de la información
- **FileSystem**
  - **productos.json**
  - **carritos.json**


## Estructura del proyecto
- **Proyecto:**
  - **/routes/carts.router.js**
  - **/routes/products.router.js**
  - **/utils/dataManager.js**
  - **productos.json**
  - **carritos.json**
  - **app.js**
  - **package.json**

## Guía de Instalación y Configuración del Proyecto


   ```bash
   npm init -y
   npm install express
   - “start”: “node –watch app.js”
   npm start
   git init
    -.gitignore 
      -- node_modules

   