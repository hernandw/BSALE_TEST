const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

//Ruta de Inicio
router.get("/", productController.home);

//Ruta del buscador
router.get('/buscador', productController.buscar)

module.exports = router;
