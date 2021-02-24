
const ProductDAO = require("../dao/product.dao");

class ProductValidator {
    static async  toCheckValidProductId(productId) {
        var result = await ProductDAO.findOne(productId);

        if (!result) {
            throw new Error("Please Check Product ID");
        }
    }
}

module.exports = {
    toCheckValidProductId: ProductValidator.toCheckValidProductId

}