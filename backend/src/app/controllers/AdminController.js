const Product = require("../models/Product");
const User = require("../models/User");
const ObjectId = require("mongodb").ObjectID;

class AdminController {
    // [GET] /admin/get-users
    getAllUser(req, res, next) {
        User.find({})
            .then((users) => res.json(users))
            .catch((err) => console.log(err));
    }

    //[GET] /admin/get-products
    getAllProduct(req, res, next) {
        Product.find({})
            .then((products) => res.json(products))
            .catch((err) => console.log(err));
    }

    //[DELETE] /admin/delete?id
    deleteUser(req, res, next) {
        User.deleteOne({ _id: ObjectId(req.body._id) })
            .then(res.status(200).json("delete successfully"))
            .catch((err) => console.log(err));
    }
}

module.exports = new AdminController();
