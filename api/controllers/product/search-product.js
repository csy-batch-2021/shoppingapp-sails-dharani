const ProductService = require('../../services/product.service');

module.exports = async function searchProducts(req, res) {
    try {
        console.log(req.query);
        let brandNameValues = req.query.brandName.split(',');
        let products = await ProductService.searchProducts(brandNameValues);
        res.json(products);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
}