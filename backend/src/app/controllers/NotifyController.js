const Notification = require("../models/Notify");

class Notify {
    // [GET] /notify
    getAll(req, res, next) {
        Notification.find({})
            .then((data) => res.json(data))
            .catch(next);
    }
}

module.exports = new Notify();
