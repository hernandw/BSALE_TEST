const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

//Ruta de Inicio
router.get("/", productController.home);

//Ruta del JSON
router.get("/product/api", productController.api);

//Ruta de Resultado de Productos por ficha
router.get("/product/:id", productController.busqueda);

module.exports = router;
