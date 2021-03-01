
const ProductDAO = require('../dao/product.dao');
const OrderDAO = require('../dao/order.dao');
class ProductValidator {
    // to check is valid product id or not
    static async  toCheckValidProductId(productId) {
        var result = await ProductDAO.findOne(productId);
        if (!result) {
            throw new Error('Please Check Product ID');
        }
    }
    // to check product is ordered
    static async toCheckOrderedProduct(productId) {
        try {
            return await OrderDAO.isProductOrdered(productId);
        } catch (err) {
            throw new Error('Product Already Ordered, Not able to Delete');
        }
    }
    // to check product is exist and check validation for new product 
    static validateNewProduct(product) {
        if (product.name === null || product.name.trim().length === 0) {
            throw new Error('please enter validate Product Name');
        }
        else if (
            product.brandName === null ||
            product.brandName.trim().length === 0
        ) {
            throw new Error('please enter validate BrandName ');
        }
        else if (product.ram === null || product.ram <= 0) {
            throw new Error('please enter validate Ram');
        } else if (product.price === null || product.price <= 0) {
            throw new Error('please enter validate Price');
        }
    }
    // To check given product is rating already or not
    static async isProductRated(productId, userId) {
        console.log("userId", userId);
        var result = await ProductDAO.toCheckIsRated(productId, userId);
        if (result) {
            throw new Error("Already Product Rating Given");
        }
    }
}
module.exports = {
    toCheckValidProductId: ProductValidator.toCheckValidProductId,
    toCheckOrderedProduct: ProductValidator.toCheckOrderedProduct,
    validateNewProduct: ProductValidator.validateNewProduct,
    isProductRated: ProductValidator.isProductRated
}