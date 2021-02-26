const ProductService = require('../../services/product.service');

module.exports = async function addNewProducts(req, res) {
    try {
        console.log(req.body);
        let newProducts = await ProductService.addProducts(req.body);
        res.json(newProducts);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
}