const Products = require("../models/Product");
const User = require("../models/User");

class ProductsController {
    async create(req, res, next) {
        const product = new Products(req.body);
        try {
            const newProduct = await product.save();
            res.status(201).json(newProduct);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
    // [GET] /products
    getAll(req, res, next) {
        const limitProduct = req.query?.limit ? req.query.limit : null;
        const skipProduct = req.query?.skip ? req.query.skip : null;
        Products.find({})
            .skip(Number(skipProduct))
            .limit(Number(limitProduct))
            .then((products) => res.json(products))
            .catch(next);
    }
    // [get] /products/:id
    getOne(req, res, next) {
        const qty = req.query?.qty;
        Products.findOne({ _id: req.params?.id })
            .then((product) => {
                const newProduct = { ...product._doc, qtySelected: qty };
                res.json(newProduct);
            })
            .catch(next);
    }
}

module.exports = new ProductsController();
