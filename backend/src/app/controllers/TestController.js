const Items = require("../models/Items");
const Categories = require("../models/Category");
const { multipleMongooseToObject } = require("../../util/mongoose");

class TestController {
    test(req, res, next) {
        Items.find({})
            .then((products) => {
                res.json(products);
            })
            .catch(next);
    }
    category(req, res, next) {
        Categories.find({})
            .then((category) => {
                res.json(category);
            })
            .catch(next);
    }
}

module.exports = new TestController();
