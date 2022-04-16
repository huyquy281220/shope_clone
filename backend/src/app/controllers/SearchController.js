const Products = require("../models/Product");
const nonAccentVietnamese = require("../../util/removeAscent");

var searchArr = [];
class SearchController {
    // [GET] /search
    getByName(req, res, next) {
        const searchString = req?.query?.s;
        const indexSearchTerm = searchArr.findIndex((item) => item === searchString);
        console.log(indexSearchTerm);

        if (indexSearchTerm < 0) {
            searchArr.unshift(searchString);
        } else {
            // const updateArr = [...searchArr];
            searchArr = [...searchArr];
        }
        console.log(searchArr);
        Products.find({ $text: { $search: searchString } })
            .then((products) => res.json({ products }))
            .catch(next);
    }
}

module.exports = new SearchController();
