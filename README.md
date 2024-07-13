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

### Resultados entregados
- **Productos**



### Estructura del proyecto

project-root/
│
├── routes/
│ ├── carts.router.js
│ ├── products.router.js
│
├── utils/
│ └── dataManager.js
│
├── productos.json
├── carritos.json
├── app.js
└── package.json


## Descripción de Archivos y Directorios

- **routes/**: Contiene los archivos de rutas para gestionar las solicitudes relacionadas con productos y carritos.
  - **carts.router.js**: Define las rutas para las operaciones CRUD relacionadas con los carritos de compra.
  - **products.router.js**: Define las rutas para las operaciones CRUD relacionadas con los productos.

- **utils/**: Contiene archivos utilitarios para el proyecto.
  - **dataManager.js**: Archivo utilitario para la gestión de datos, como la lectura y escritura de archivos JSON.

- **productos.json**: Archivo JSON que almacena los datos de los productos.

- **carritos.json**: Archivo JSON que almacena los datos de los carritos de compra.

- **app.js**: Archivo principal del servidor. Configura y arranca el servidor Express, incluyendo las rutas para productos y carritos.

- **package.json**: Archivo que contiene la configuración del proyecto y las dependencias necesarias.

## Instrucciones de Uso

1. **Instalar dependencias**:
   ```bash
   npm install
   