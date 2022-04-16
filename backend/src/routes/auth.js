const express = require("express");
const router = express.Router();
const verify = require("../app/middleware/verifyToken");
const userController = require("../app/controllers/UserController");

router.post("/validate-email", userController.validateEmail)
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/register", userController.register);
router.put("/:id", userController.update);
router.post("/refresh", userController.requestRefreshToken);

module.exports = router;
