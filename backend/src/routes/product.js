const express = require("express");
const router = express.Router();
const productsController = require("../app/controllers/ProductsController");

router.post("/products/create", productsController.create);
router.get("/products/:id", productsController.getOne);
router.get("/products", productsController.getAll);

module.exports = router;
