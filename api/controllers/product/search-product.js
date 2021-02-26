const ProductService = require("../../services/product.service");

module.exports = async function searchProducts(req, res) {
    let brandNameValues = req.query.brandName.split(',');
    let products = await ProductService.searchProducts(brandNameValues);
    res.json(products);
}