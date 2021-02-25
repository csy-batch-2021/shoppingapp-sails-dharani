const ProductService = require("../../services/product.service")
module.exports = async function changeProductStatus(req, res) {
    let productId = req.body.productId;
    let status = req.body.status;
    console.log("ProductId", productId);
    console.log("status", status);
    try {
        let changedProduct = await ProductService.changeStatus(productId, status);
        res.json(changedProduct);
    } catch (err) {
        res.setStatus(400).json({ message: err.message });
    }
}