const axios = require('axios');
const DB_URL = 'https://6a5a0e85-6282-465b-b46d-364a80e1b15d-bluemix.cloudantnosqldb.appdomain.cloud';
const DAOUtil = require('./dao.util');
class ProductRepository {
    /**
     * 
     * @param {*get one order based on id} id 
     */
    static async findOne(id) {
        return DAOUtil.findOne('/products/' + id);
    }
    /**
     * get all products
     */
    static async getAllProducts() {
        return DAOUtil.getView('/products/_design/products/_view/product-list-view');
    }
    /**
     * 
     * @param {*to search the products based on user product filter brandName} brandNames 
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
     * 
     * @param {*search product based on product id} productId 
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
     * 
     * @param {*find one product and update product details} productValues 
     */
    static async findOneAndUpdate(productValues) {
        return DAOUtil.findAndUpdate('/products/' + productValues._id + "?rev=" + productValues._rev, productValues);
    }
    /**
     * 
     * @param {*update product status Active and Inactive} productDetails 
     */
    static async updateProductStatus(productDetails) {
        return DAOUtil.findAndUpdate('/products/' + productDetails._id + "?rev=" + productDetails._rev, productDetails);
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
