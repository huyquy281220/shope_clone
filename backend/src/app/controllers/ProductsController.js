const Products = require("../models/Product");
const User = require("../models/User");

class ProductsController {
    async create(req, res, next) {
        const product = new Products(req.body);
        try {
            const newProduct = await product.save();
            res.status(201).json(newProduct);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [GET] /products
    getAll(req, res, next) {
        Products.find({})
            .limit(5)
            .then((products) => res.json(products))
            .catch(next);
    }
    // [get] /products/:id
    getOne(req, res, next) {
        const qty = req.params.qty;
        Products.findById({ _id: req.params.id })
            .then((product) => {
                const newProduct = { ...product, qtySelected: qty };
                res.json(newProduct);
            })
            .catch(next);
    }
}

module.exports = new ProductsController();
