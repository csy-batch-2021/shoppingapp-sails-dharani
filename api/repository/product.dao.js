const axios = require('axios');
const DB_URL = 'https://6a5a0e85-6282-465b-b46d-364a80e1b15d-bluemix.cloudantnosqldb.appdomain.cloud';
class ProductRepository {

    //find one product by id
    static async findOne(id) {

    }
    // get all products
    static async getAllProducts() {
        let response = await axios.request({
            url: '/products/_all_docs?include_docs=true',
            method: 'get',
            baseURL: DB_URL,
            auth: {
                username: 'apikey-v2-1zry8ajgypo2q14hzjvdwuemmaiixcz9dhmtedvr14ck',
                password: '53fcbf5faa893817605b85afaf7af46f',
            },
            data: null,
        });
        let data = response.data.rows;
        let productList = data.map(obj => obj.doc);
        return productList;
    }
    // to search the products based on user product filter
    static async searchProducts(brandNames) {
        console.log("brandNames", brandNames);
        let requestedData = {
            selector: { brand_name: { $in: brandNames } },
            sort: [{ 'price': 'desc' }],
            // 'limit': 5,
            // skip: 5
        }
        console.log("requestedData", requestedData);
        let response = await axios.request({
            url: '/products/_find',
            method: 'post',
            baseURL: DB_URL,
            auth: {
                username: 'apikey-v2-1zry8ajgypo2q14hzjvdwuemmaiixcz9dhmtedvr14ck',
                password: '53fcbf5faa893817605b85afaf7af46f',
            },
            data: requestedData
        });
        let productList = response.data.docs;
        return productList;

    }
    // get all active products
    static async findActive() {
        let products = await this.getAllProducts();
        return products.filter(obj => obj.active);

    }
    // to fine ond and update product
    static async findOneAndUpdate(productValues) {

    }
    // update product status active and inactive
    static async updateProductStatus(productId, status) {

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
    // get product report
    static async productReport() {

    }
    // to check given product is already in rated or not
    static async toCheckIsRated(productId, userId) {

    }
}
module.exports = {
    getAllProducts: ProductRepository.getAllProducts,
    // findOne: ProductDAO.findOne,
    searchProducts: ProductRepository.searchProducts,
    findActive: ProductRepository.findActive,
    // findOneAndUpdate: ProductDAO.findOneAndUpdate,
    // deleteProduct: ProductDAO.deleteProduct,
    // updateProductStatus: ProductDAO.updateProductStatus,
    // findOneUsingName: ProductDAO.findOneUsingName,
    save: ProductRepository.save,
    // productReport: ProductDAO.productReport,
    // toCheckIsRated: ProductDAO.toCheckIsRated

}
