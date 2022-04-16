const express = require("express");
const router = express.Router();
const mallController = require("../app/controllers/MallController");

router.get("/mall/sort",mallController.sortProduct)
router.get("/mall", mallController.getAll);

module.exports = router;
