const Notification = require("../models/Notify");

class Notify {
    createNotify(req, res, next){
        const newNotify = new Notification(req.body).save()
            .then(notify => res.status(201).json(notify))
            .catch(err => res.status(500).json(err))
    }


    // [GET] /notify
    getAll(req, res, next) {
        Notification.find({})
            .then((data) => res.json(data))
            .catch(next);
    }
}

module.exports = new Notify();
