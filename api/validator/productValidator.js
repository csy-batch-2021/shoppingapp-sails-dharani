
const ProductDAO = require('../dao/product.dao');
const OrderDAO = require('../dao/order.dao');
const ProductRepository = require('../repository/product.dao');
class ProductValidator {
    /**
     * to check productId based isValidProduct Id or not 
     * @param {string} productId
     */
    static async toCheckValidProductIdOld(productId) {
        // var result = await ProductDAO.findOne(productId);
        var result = await ProductRepository.findOne(productId);
        if (!result) {
            throw new Error('Please Check Product ID');
        }
        return result;
    }
    /**
    * to check productId based isValidProduct Id or not 
    * @param {string} productId
    */
    static async toCheckValidProductId(productId) {
        // var result = await ProductDAO.findOne(productId);
        let promiseObj = new Promise((resolve, reject) => {
            var result = ProductRepository.findOne(productId).then(result => {
                console.log('ProductRepository', result);
                return result;
            });
            if (!result) {
                reject('Please Check Product ID');
            }
            console.log('toCheckValidProductId', result);
            resolve(result);
        })
        return promiseObj;
    }
    /**
     * to check is the product already ordered or not 
     * @param {string} productId
     */
    static async toCheckOrderedProduct(productId) {
        try {
            return await OrderDAO.isProductOrdered(productId);
        } catch (err) {
            throw new Error('Product Already Ordered, Not able to Delete');
        }
    }
    /**
     * to check entered product details is valid or not 
     * @param {object} product 
     */
    static validateNewProduct(product) {
        if (product.name === null || product.name.trim().length === 0) {
            throw new Error('please enter validate Product Name');
        } else if (
            product.brandName === null ||
            product.brandName.trim().length === 0
        ) {
            throw new Error('please enter validate BrandName ');
        } else if (product.ram === null || product.ram <= 0) {
            throw new Error('please enter validate Ram');
        } else if (product.price === null || product.price <= 0) {
            throw new Error('please enter validate Price');
        }
    }
    /**
     * to check is product already rated or not 
     * @param {string} productId 
     * @param {string} userId 
     */
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