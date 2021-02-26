const ProductService = require("../../services/product.service");

module.exports = async function addProductRating(req, res) {
    try {
        let productsRating = await ProductService.addProductRating(req.body);
        res.json(productsRating);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
}