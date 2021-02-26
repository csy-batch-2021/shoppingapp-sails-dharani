const ProductService = require("../../services/product.service");


module.exports = async function updateProducts(req, res) {
    try {
        let product = await ProductService.updateProduct(req.body);
        res.json({ message: "Product Updated Successfully" });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
}