const ProductService = require('../../services/product.service');
module.exports = async function deleteProduct(req, res) {
    console.log(req.params);
    let productId = req.params.productId;
    try {
        let result = await ProductService.deleteProduct(productId);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
}