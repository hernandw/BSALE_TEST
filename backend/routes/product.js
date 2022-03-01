const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

//Ruta de Inicio
router.get("/", productController.home);

//Ruta del buscador
router.get("/buscador", productController.buscar);

//Ruta de los Detalles del Producto
router.get("/product/:id", productController.productDetail);

//Ruta del filtro por categorias
router.get("/:id", productController.filtro);

//Ruta de Productos ordenados por precio Ascendente
router.get("/precio/sube", productController.precioAsc);

//Ruta de Productos ordenados por precio Descendente
router.get("/precio/baja", productController.precioDesc);

module.exports = router;
