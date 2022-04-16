const express = require("express");
const router = express.Router();
const productsController = require("../app/controllers/ProductsController");

router.get("/products/:id", productsController.getOne);
router.get("/products", productsController.getAll);
router.post("/create", productsController.create);

module.exports = router;
