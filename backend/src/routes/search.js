const express = require("express");
const router = express.Router();
const searchController = require("../app/controllers/SearchController");

router.get("/search", searchController.getByName);

module.exports = router;
