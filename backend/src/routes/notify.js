const router = require("express").Router();
const notifyController = require("../app/controllers/NotifyController");

router.post("/notify/create", notifyController.createNotify);
router.get("/notify", notifyController.getAll);

module.exports = router;
