const ProductService = require("../../services/product.service");

module.exports =
    async function getActiveProductsList(req, res) {
        console.log("loggedInUser", req.me);
        let activeProducts = await ProductService.getActiveProduct();
        res.json(activeProducts);
    }
