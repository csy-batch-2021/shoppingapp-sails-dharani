const ProductService = require('../../services/product.service');
module.exports = async function productReport(req, res) {
    try {
        let products = await ProductService.productReport();
        res.json(products);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
}