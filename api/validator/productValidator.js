
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
        var result = await OrderDAO.isProductOrdered(productId);
        //if (result) {
        //  throw new Error("Ordered Product Not able to Delete");
        //}
        return result;
    }
    static validateNewProduct(product) {
        if (product.name == null || product.name.trim().length == 0) {
            throw new Error("please enter validate Product Name");
        }
        else if (
            product.brandName == null ||
            product.brandName.trim().length == 0
        ) {
            throw new Error("please enter validate BrandName ");
        }
        else if (product.ram == null || product.ram <= 0) {
            throw new Error("please enter validate Ram");
        } else if (product.price == null || product.price <= 0) {
            throw new Error("please enter validate Price");
        }
    }
}

module.exports = {
    toCheckValidProductId: ProductValidator.toCheckValidProductId,
    toCheckOrderedProduct: ProductValidator.toCheckOrderedProduct,
    validateNewProduct: ProductValidator.validateNewProduct

}