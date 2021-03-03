
const ProductService = require('../../services/product.service');
module.exports = async function getProducts(req, res) {
    try {
        let products = await ProductService.getAllProducts();
        const allProductList = products.sort((a, b) => a.price - b.price);
        res.json(allProductList);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}