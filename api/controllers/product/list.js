const ProductService = require("../../services/product.service");

module.exports =
    async function getActiveProductsList(req, res) {
        try {
            let activeProducts = await ProductService.getActiveProduct();
            const activeProductsList = activeProducts.sort((a, b) => a.price - b.price);
            res.json(activeProductsList);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    }
