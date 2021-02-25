
const ProductDAO = require("../dao/product.dao");
const OrderDAO = require("../dao/order.dao");

class ProductValidator {
    static async  toCheckValidProductId(productId) {
        var result = await ProductDAO.findOne(productId);

        if (!result) {
            throw new Error("Please Check Product ID");
        }
    }
    static async toCheckOrderedProduct(productId) {
        var result = await OrderDAO.findProductId(productId);
        if (result) {
            throw new Error("Ordered Product Not able to Delete");
        }
    }
}

module.exports = {
    toCheckValidProductId: ProductValidator.toCheckValidProductId,
    toCheckOrderedProduct: ProductValidator.toCheckOrderedProduct

}