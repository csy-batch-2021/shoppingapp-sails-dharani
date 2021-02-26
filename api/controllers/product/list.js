const ProductService = require("../../services/product.service");

module.exports =
    async function getActiveProductsList(req, res) {
        try {
            let activeProducts = await ProductService.getActiveProduct();
            res.json(activeProducts);
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: err.message });
        }
    }
