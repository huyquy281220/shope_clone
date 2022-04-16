const express = require("express");
const router = express.Router();
const cors = require("cors");
const testController = require("../app/controllers/TestController");

router.get("/test", testController.test);
router.get("/category", testController.category);

module.exports = router;
