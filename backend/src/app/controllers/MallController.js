const Products = require("../models/Product");

class MallController {
    //[GET] /mall/
    getAll(req, res, next) {
        try {
            const limit = Number(req.query.limit);
            const page = Number(req.query.page);
            const skip = (page - 1) * limit;
            Products.find({})
                .skip(skip)
                .limit(limit)
                .then((products) => res.json(products))
                .catch(next);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    sortProduct(req, res, next) {
        try {
            const limit = Number(req.query.limit);
            const page = Number(req.query.page);
            const skip = (page - 1) * limit;
            const sortCondition = Number(req.query.type);
            switch (sortCondition) {
                case 1:
                    Products.find({})
                        .sort({ price: 1 })
                        .skip(skip)
                        .limit(limit)
                        .then((products) => res.json(products))
                        .catch(next);
                    break;
                case -1:
                    Products.find({})
                        .sort({ price: -1 })
                        .limit(10)
                        .then((products) => res.json(products))
                        .catch(next);
                    break;
                default:
                    console.log("1 or -1");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new MallController();
