const ProductService = require("../../services/product.service");

module.exports =
    async function getActiveProductsList(req, res) {
        let activeProducts = await ProductService.getActiveProduct();
        res.json(activeProducts);
    }
