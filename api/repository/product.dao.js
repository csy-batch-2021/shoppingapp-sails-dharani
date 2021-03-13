const axios = require('axios');
const DB_URL = 'https://6a5a0e85-6282-465b-b46d-364a80e1b15d-bluemix.cloudantnosqldb.appdomain.cloud';
const DAOUtil = require('./dao.util');
class ProductRepository {
    /**
     * to find one product value bases on product IdF
     * @param {string} id 
     */
    static async findOneOld(id) {
        return DAOUtil.findOne('/products/' + id);
    }
    /**
       * to find one product value bases on product IdF
       * @param {string} id 
       */
    static async findOne(id) {
        let promiseObj = new Promise((resolve, reject) => {
            DAOUtil.findOne('/products/' + id).then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
        })
        return promiseObj;
    }
    /**
     * get all products
     */
    static async getAllProducts() {
        return DAOUtil.getView('/products/_design/products/_view/product-list-view');
    }
    /**
     * to search products based on brandName
     * @param {array} brandNames
     */
    static async searchProducts(brandNames) {
        console.log("brandNames", brandNames);
        let requestedData = {
            selector: { brand_name: { $in: brandNames } },
            sort: [{ 'price': 'desc' }],
            // 'limit': 5,
            // skip: 5
        }
        return DAOUtil.search('/products/_find', requestedData);
    }
    /**
     * to search product based on product id
     * @param {string} productId
     */
    static async searchProductsById(productId) {
        let requestedData = {
            selector: { _id: { $in: productId } },
        };
        return DAOUtil.search('/products/_find', requestedData);
    }
    /**
     * get all active products
     */
    static async findActive() {
        let products = await this.getAllProducts();
        return products.filter(obj => obj.active);
    }
    /**
     * find one product and update product price
     * @param {object} productValues  
     */
    static async findOneAndUpdateOld(productValues) {
        return DAOUtil.findAndUpdate('/products/' + productValues._id + "?rev=" + productValues._rev, productValues);
    }

    /**
    * find one product and update product price
    * @param {object} productValues  
    */
    static async findOneAndUpdate(productValues) {
        let promiseObj = new Promise((resolve, reject) => {
            DAOUtil.findAndUpdate('/products/' + productValues._id + "?rev=" + productValues._rev, productValues).then(response => {
                if (response) {
                    resolve(response);
                } else {
                    reject(err);
                }
            });
        })
        return promiseObj;
    }
    /**
     * to change product status to be active or inactive
     * @param {Object} productDetails 
     */
    static async updateProductStatusOld(productDetails) {
        return DAOUtil.findAndUpdate('/products/' + productDetails._id + "?rev=" + productDetails._rev, productDetails);
    }
    /**
     * to change product status to be active or inactive
     * @param {Object} productDetails 
     */
    static async updateProductStatus(productDetails) {
        let promiseObj = new Promise((resolve, reject) => {
            DAOUtil.findAndUpdate('/products/' + productDetails._id + "?rev=" + productDetails._rev, productDetails).then(response => {
                resolve(response);
            }, err => {
                reject(err);
            });
        });
        return promiseObj;
    }
    // to delete products
    static async deleteProduct(productId) {

    }
    // get one product based on brandName
    static async findOneUsingName(product) {

    }
    // add new products
    static async save(product) {
        console.log("add new product", product);


    }
    /**
     * get pruduct based ordered count
     */
    static async productReport() {
        return DAOUtil.report('/orders/_design/product-count/_view/product-count-view?group_level=1');

    }
    // to check given product is already in rated or not
    static async toCheckIsRated(productId, userId) {

    }
}
module.exports = {
    getAllProducts: ProductRepository.getAllProducts,
    findOne: ProductRepository.findOne,
    searchProducts: ProductRepository.searchProducts,
    findActive: ProductRepository.findActive,
    findOneAndUpdate: ProductRepository.findOneAndUpdate,
    // deleteProduct: ProductDAO.deleteProduct,
    updateProductStatus: ProductRepository.updateProductStatus,
    // findOneUsingName: ProductDAO.findOneUsingName,
    save: ProductRepository.save,
    productReport: ProductRepository.productReport,
    // toCheckIsRated: ProductDAO.toCheckIsRated,
    searchProductsById: ProductRepository.searchProductsById

}
