const ProductService = require('../../services/product.service');
module.exports = async function changeProductStatus(req, res) {
    console.log(req.body);
    let productId = req.body.productId;
    let status = req.body.status;
    try {
        let changedProduct = await ProductService.changeStatus(productId, status);
        res.json(changedProduct);
    } catch (err) {
        console.log(err);
        res.setStatus(400).json({ message: err.message });
    }
}