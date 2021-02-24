const  ProductService  = require("../../services/product.service");

module.exports = 
    async function(req, res) {
        try {
            let products = await ProductService.getAllProducts();
           //let products = [];
            res.json(products);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }

    
}