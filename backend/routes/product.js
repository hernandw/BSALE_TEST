const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

//Ruta de Inicio
router.get("/", productController.home);

//Ruta del buscador
router.get("/buscador", productController.buscar);

//Ruta de la Api
router.get("/product/api", productController.api);

//Ruta de los Detalles del Producto
router.get("/product/:id", productController.productDetail);

//Ruta del filtro por categorias
router.get("/busqueda/:id", productController.filtro);

//Ruta de Productos ordenados por precio Ascendente
router.get("/precio/asc", productController.precioAsc);

//Ruta de Productos ordenados por precio Descendente
router.get("/precio/desc", productController.precioDesc);

module.exports = router;
