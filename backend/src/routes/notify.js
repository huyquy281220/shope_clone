const router = require("express").Router();
const notifyController = require("../app/controllers/NotifyController");

router.get("/notify", notifyController.getAll);

module.exports = router;
