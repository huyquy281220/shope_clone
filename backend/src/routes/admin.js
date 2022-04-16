const router = require("express").Router();
const adminController = require("../app/controllers/AdminController");
const verify = require("../app/middleware/verifyToken");

router.get("/get-users", verify.verifyAdmin, adminController.getAllUser);
router.get("/get-products", verify.verifyAdmin, adminController.getAllProduct);
router.delete("/delete-user", verify.verifyAdmin, adminController.deleteUser);

module.exports = router;
