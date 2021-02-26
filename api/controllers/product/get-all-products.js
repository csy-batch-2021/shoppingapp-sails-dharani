
const ProductService = require('../../services/product.service');
module.exports = async function getProducts(req, res) {
    try {
        let products = await ProductService.getAllProducts();
        res.json(products);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
}