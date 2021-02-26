
const ProductService = require("../../services/product.service");
module.exports = async function getProducts(req, res) {
    let products = await ProductService.getAllProducts();
    res.json(products);
}