const ProductService = require("../../services/product.service");
module.exports = async function addNewProducts(req, res) {
    try {
        let newProducts = await ProductService.addProducts(req.body);
        res.json(newProducts);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}