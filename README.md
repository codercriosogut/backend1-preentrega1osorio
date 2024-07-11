# Proyecto de Gestión de Productos y Carritos
Se implementa un servidor en Node.js con Express para gestionar productos y carritos de compra. Incluye operaciones CRUD para manejar la creación, lectura, actualización y eliminación de productos y carritos.

## Tecnologías
- Node.js
- Express

### Productos

- **GET localhost:8080/**: Obtener todos los productos.
- **GET localhost:8080/api/products/1**: Obtener un producto por ID.
- **POST localhost:8080/api/products/**: Crear un nuevo producto.
- **PUT /api/products/:pid**: Actualizar un producto por ID.
- **DELETE /api/products/:pid**: Eliminar un producto por ID.

### Carritos
- **GET /api/carts**: Obtener todos los carritos con detalles de productos.
- **GET /api/carts/:cid**: Obtener un carrito por ID.
- **POST /api/carts**: Crear un nuevo carrito.
- **POST /api/carts/:cid/product/:pid**: Añadir un producto a un carrito por ID de carrito y producto.


### La persistencia de la información
- FileSystem
-- “productos.json” y “carrito.json”
